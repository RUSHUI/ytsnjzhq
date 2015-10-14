/*!
 * @packet brooder.suger.observer;
 */
var autocommand = function (option) {
    this.type = option.type;
    this.parent = option.parent;
    this.dataType = option.dataType;
    this.original = option.original;
    this.data = option.data;
    this.command = option.command;
    this.from = option.from;
    this.size = option.size;
};
var observer = function (obj, fn) {
    observer.setunwrite(obj, "____+", {
        change: fn,
        create: "",
        remove: "",
        update: "",
        fetch: ""
    });
    return observer.observer(obj, null, fn);
};
observer.setwrite = function (obj, key, value) {
    if (!obj.hasOwnProperty(key)) {
        Object.defineProperty(obj, key, {
            enumerable: false,
            configurable: false,
            writable: true,
            value: value
        });
    } else {
        obj[key] = value;
    }
};
observer.setunwrite = function (obj, key, value) {
    if (!obj.hasOwnProperty(key)) {
        Object.defineProperty(obj, key, {
            enumerable: false,
            configurable: false,
            writable: false,
            value: value
        });
    } else {
        obj[key] = value;
    }
};
observer.observer = function (data, parent) {
    if ($.is.isArray(data)) {
        return observer.array(data, parent);
    } else if ($.is.isObject(data)) {
        return observer.object(data, parent);
    } else {
        return data;
    }
};
observer.setter = function (t, a) {
    var o = this["____" + t], dot = t, b = null;
    if ($.is.isArray(a)) {
        observer.setunwrite(a, "____#", t + "*");
        observer.setunwrite(a, "____+", this["____+"]);
        b = observer.observer(a, this);
    } else if ($.is.isObject(a)) {
        observer.setunwrite(a, "____#", t);
        observer.setunwrite(a, "____+", this["____+"]);
        b = observer.observer(a, this);
    } else {
        b = a;
    }
    var type = $.is.isArray(o) ? "array" : ($.is.isObject(o) ? "object" : "string");
    if (o !== b) {
        this["____" + t] = b;
        var r = this["____+"].change.call(this, new autocommand({
            type: "edit",
            original: o,
            parent: this,
            data: b,
            dataType: type,
            command: observer.getCommandLine.call(this, dot),
            form: t,
            size: 0
        }));
        if (r === false) {
            this["____" + t] = o;
        }
    }
};
observer.object = function (obj, parent) {
    observer.setunwrite(obj, "____*", parent);
    observer.setunwrite(obj, "____@", {});
    observer.setunwrite(obj, "____+", parent ? parent["____+"] : null);
    for (var i in obj) {
        if ($.is.isArray(obj[i])) {
            observer.setunwrite(obj[i], "____#", i + "*");
            observer.setunwrite(obj[i], "____+", obj["____+"]);
            observer.setwrite(obj, "____" + i, observer.array(obj[i], obj));
        } else if ($.is.isObject(obj[i])) {
            observer.setunwrite(obj[i], "____#", i);
            observer.setunwrite(obj[i], "____+", obj["____+"]);
            observer.setwrite(obj, "____" + i, observer.object(obj[i], obj));
        } else {
            obj["____@"][i] = obj[i];
            observer.setwrite(obj, "____" + i, obj[i]);
        }
        (function (t) {
            obj.__defineSetter__(t, function (a) {
                observer.setter.call(this, t, a);
            });
            obj.__defineGetter__(t, function () {
                return this["____" + t];
            });
        })(i);
    }
    observer.setunwrite(obj, "set", function (t, value) {
        if (!this["____" + t]) {
            var b = observer.observer(value, this);
            if ($.is.isArray(value)) {
                observer.setunwrite(b, "____#", t + "*");
                observer.setunwrite(b, "____+", this["____+"]);
            } else if ($.is.isObject(value)) {
            } else {
                this["____@"][t] = value;
            }
            observer.setwrite(this, "____" + t, b);
            this.__defineGetter__(t, function () {
                return this["____" + t];
            });
            this.__defineSetter__(t, function (a) {
                observer.setter.call(this, t, a);
            });
        } else {
            observer.setter.call(this, t, value);
        }
    });
    observer.setunwrite(obj, "has", function (key) {
        var a = this["____" + key];
        if (a !== undefined && a !== null) {
            return true;
        } else {
            return false;
        }
    });
    observer.setunwrite(obj, "save", function (option) {
        var a = this["____@"], data = {};
        for (var i in a) {
            if (this[i] !== a[i]) {
                data[i] = this[i];
            }
        }
        option["data"] = data;
        $.ajax(option);
    });
    observer.setunwrite(obj, "update", function (option) {
        var ths = this;
        $.ajax({
            url: option.url,
            dataType: "json",
            data: option.data,
            success: function (data) {
                for (var i in data) {
                    ths.set(i, data[i]);
                }
                option.success && option.success(ths);
            },
            error: function () {
                option.error && option.error();
            }
        });
    });
    observer.setunwrite(obj, "fetch", function (option) {
        var ths = this;
        $.ajax({
            url: option.url,
            dataType: "json",
            data: option.data,
            success: function (data) {
                for (var t in data) {
                    var value = data[t];
                    if (!ths.hasOwnProperty("____" + t)) {
                        var b = observer.observer(value, ths);
                        if ($.is.isArray(value)) {
                            observer.setunwrite(b, "____#", t + "*");
                            observer.setunwrite(b, "____+", ths["____+"]);
                        } else if ($.is.isObject(value)) {
                        } else {
                            ths["____@"][t] = value;
                        }
                        (function (t) {
                            observer.setwrite(ths, "____" + t, b);
                            ths.__defineGetter__(t, function () {
                                return this["____" + t];
                            });
                            ths.__defineSetter__(t, function (a) {
                                observer.setter.call(ths, t, a);
                            });
                        })(t);
                    } else {
                        var b = null;
                        if ($.is.isArray(value)) {
                            b = observer.observer(value, this);
                            observer.setunwrite(b, "____#", t + "*");
                            observer.setunwrite(b, "____+", ths["____+"]);
                        } else if ($.is.isObject(value)) {
                            b = observer.observer(value, this);
                            observer.setunwrite(b, "____#", t);
                        } else {
                            b = a;
                        }
                        ths["____" + t] = b;
                    }
                }
                ths["____+"].change.call(ths, new autocommand({
                    type: "reset",
                    original: null,
                    parent: null,
                    data: null,
                    dataType: null,
                    command: null,
                    form: null,
                    size: null
                }));
                option.success && option.success(ths);
            },
            error: function () {
                option.error && option.error();
            }
        });
    });
    observer.setunwrite(obj, "clean", function () {
        this["____+"].change = null;
        var c = Object.getOwnPropertyNames(this);
        for (var i in c) {
            if (c[i].indexOf("____") !== -1) {
                if ($.is.isArray(this[c[i]])) {
                    this[c[i]].clean();
                } else {
                    this[c[i]] = null;
                }
            }
        }
    });
    return obj;
};
observer.array = function (array, parent) {
    observer.setunwrite(array, "____@", {
        add: [],
        remove: []
    });
    for (var i in array) {
        var b = observer.observer(array[i], array);
        array[i] = b;
    }
    observer.setunwrite(array, "____*", parent);
    observer.setunwrite(array, "splice", function (a, b) {
        var k = Array.prototype.splice.call(this, a, b);
        this["____+"].change(new autocommand({
            type: 'remove',
            parent: this["____*"],
            dataType: "array",
            original: this,
            data: k,
            command: observer.getCommandLine.call(this),
            from: a,
            size: b
        }));
    });
    observer.setunwrite(array, "push", function (a) {
        Array.prototype.push.call(this, observer.observer(a, this));
        this["____+"].change(new autocommand({
            type: "add",
            parent: this["____*"],
            dataType: "array",
            original: this,
            data: a,
            command: observer.getCommandLine.call(this),
            from: this.length - 1,
            size: 1
        }));
    });
    observer.setunwrite(array, "pop", function (option) {
        if (arguments.length === 1) {
            var ths = this;
            $.ajax({
                url: option.url,
                dataType: "json",
                data: this[0],
                success: function (e) {
                    if (e.code === "1") {
                        var k = Array.prototype.pop.call(ths);
                        ths["____+"].change(new autocommand({
                            type: 'remove',
                            parent: ths["____*"],
                            dataType: "array",
                            original: ths,
                            data: k,
                            command: observer.getCommandLine.call(ths),
                            from: ths.length,
                            size: 1
                        }));
                    } else {
                        option.error && option.error();
                    }
                },
                error: option.error
            });
        } else if (arguments.length === 0) {
            var k = Array.prototype.pop.call(this);
            this["____+"].change(new autocommand({
                type: 'remove',
                parent: this["____*"],
                dataType: "array",
                original: this,
                data: k,
                command: observer.getCommandLine.call(this),
                from: this.length,
                size: 1
            }));
            this["____@"].remove.push(k);
        }
    });
    observer.setunwrite(array, "shift", function (a) {
        Array.prototype.shift.call(this, observer.observer(a, this));
        this["____+"].change(new autocommand({
            type: "add",
            parent: this["____*"],
            dataType: "array",
            original: this,
            data: a,
            command: observer.getCommandLine.call(this),
            from: 0,
            size: 1
        }));
    });
    observer.setunwrite(array, "unshift", function () {
        var k = Array.prototype.unshift.call(this);
        this["____+"].change(new autocommand({
            type: 'remove',
            parent: this["____*"],
            dataType: "array",
            original: this,
            data: k,
            from: 0,
            command: observer.getCommandLine.call(this),
            size: 1
        }));
    });
    observer.setunwrite(array, "concat", function () {
        var k = Array.prototype.concat.call(this, observer.observer(a, this));
        this["____+"].change(new autocommand({
            type: "add",
            parent: this["____*"],
            dataType: "array",
            original: this,
            data: k,
            command: observer.getCommandLine.call(this),
            from: this.length - 1,
            size: a.length
        }));
    });
    observer.setunwrite(array, "removeAll", function () {
        var k = Array.prototype.splice.call(this, 0, this.length - 1);
        this["____+"].change(new autocommand({
            type: 'remove',
            parent: this["____*"],
            dataType: "array",
            original: this,
            data: k,
            from: 0,
            command: observer.getCommandLine.call(this),
            size: this.length
        }));
    });
    observer.setunwrite(array, "remove", function (a) {
        var k = Array.prototype.splice.call(this, this.indexOf(a), 1);
        this["____+"].change(new autocommand({
            type: 'remove',
            parent: this["____*"],
            dataType: "array",
            original: this,
            data: k,
            command: observer.getCommandLine.call(this),
            from: this.indexOf(a),
            size: 1
        }));
    });
    observer.setunwrite(array, "set", function (index, obj) {
        if (index >= 0 && index < this.length) {
            this[index] = observer.observer(obj, this);
            this["____+"].change(new autocommand({
                type: "replace",
                parent: this["____*"],
                dataType: "array",
                original: this,
                data: obj,
                command: observer.getCommandLine.call(this),
                from: index,
                size: 1
            }));
        }
    });
    observer.setunwrite(array, "clean", function () {
        this["____+"].change = null;
        this.length = 0;
    });
    return array;
};
observer.getCommandLine = function (t) {
    var a = this["____*"], b = [this["____#"] || t];
    if ($.is.isArray(a)) {
        b.push(a.indexOf(this));
    }
    while (a) {
        if (a["____#"]) {
            b.push(a["____#"]);
        }
        if ($.is.isArray(a["____*"])) {
            b.push(a["____*"].indexOf(a));
        }
        a = a["____*"];
    }
    var c = b.reverse(), d = "", f = [];
    for (var i in c) {
        var e = c[i];
        if ($.is.isString(e)) {
            if (i / 1 === 0) {
                d += e;
            } else {
                d += "." + e;
            }
            f.push(d);
        } else {
            f.push(e);
        }
    }
    return f;
};

$.fn.findClass = function (className) {
    var b = $(), r = [];
    if (!this.isEmpty()) {
        for (var i = 0; i < this.nodes.length; i++) {
            var c = Array.prototype.slice.call(this.nodes[i].getElementsByClassName(className));
            r = r.concat(c);
        }
        b.nodes = r;
        b.length = r.length;
        return b;
    }
    return b;
};
$.fn.childrens = function (num) {
    var b = $(), r = [];
    if (!this.isEmpty()) {
        for (var i = 0; i < this.nodes.length; i++) {
            var c = this.nodes[i].children[num];
            if (c) {
                r.push(c);
            }
        }
        b.nodes = r;
        b.length = r.length;
        return b;
    }
    return b;
};
$.fn.filterClass = function () {
    var b = $(), r = [], classNames = Array.prototype.slice.call(arguments);
    if (!this.isEmpty()) {
        for (var i = 0; i < this.nodes.length; i++) {
            var p = false, list = this.nodes[i].classList;
            for (var t = 0; t < classNames.length; t++) {
                p = list.contains(classNames[t]);
                if (p) {
                    break;
                }
            }
            if (p) {
                r.push(this.nodes[i]);
            }
        }
        b.nodes = r;
        b.length = r.length;
        return b;
    }
    return b;
};
var autobind = function (dom, template, data, validate, setter, events) {
    var ths = this;
    this.dom = dom;
    this.template = $.template(template).fn();
    this.observer = observer(data, function (e) {
        if (autobind[e.type]) {
            return autobind[e.type].call(ths, e);
        }
    });
    this.events = events;
    this.setter = setter;
    this.validate = validate;
    this.dom.html(this.template(this.observer));
    autobind.setEvent.call(this, this.dom);
    autobind.setArrayNum.call(this);
};
autobind.remove = function (e) {
//    console.log(e);
    var cc = autobind.docommand.call(this, this.dom, e.command);
    cc.each(function (a) {
        for (var i = 0; i < e.size; i++) {
            $(this).children().eq(e.from - i).remove();
        }
        $(this).children().each(function (k) {
            $(this).attr("_num_", k);
        });
    });
};
autobind.add = function (e) {
    console.log(e);
    var ths = this;
    var cc = autobind.docommand.call(this, this.dom, e.command);
    var p = $().create("div").append(this.template(this.observer));
    var dd = autobind.docommand.call(this, p, e.command);
    dd.each(function (n) {
        for (var j = 0; j < e.size; j++) {
            var np = $(this).children(e.from + j).appendTo(cc.eq(n));
            autobind.setEvent.call(ths, np);
            np.attr("_num_", cc.eq(n).children().length - 1);
        }
    });
};
autobind.edit = function (e) {
//    console.log(e);
    var ths = this;
    if (e.dataType === "array") {
        if ($.is.isArray(e.data)) {
            e.command[e.command.length - 1] = e.command[e.command.length - 1] + "*";
            var cc = autobind.docommand.call(this, this.dom, e.command);
            var p = $().create("div").append(this.template(this.observer));
            var dd = autobind.docommand.call(this, p, e.command);
            dd.each(function (n) {
                cc.eq(n).html($(this).html()).children().each(function (i) {
                    $(this).attr("_num_", i);
                });
                autobind.setEvent.call(ths, cc.eq(n));
            });
        } else {
            console.info("[brooder] Illegal assignment need Array.");
            return false;
        }
    } else if (e.dataType === "object") {
        if ($.is.isObject(e.data)) {
            for (var i in e.data) {
                if (i.indexOf("____") !== 0) {
                    var dot = e.command[e.command.length - 1] + "." + i;
                    var o = e.original[i];
                    autobind.edit.call(this, new autocommand({
                        type: "edit",
                        command: [].concat(e.command, [dot]),
                        parent: e.data,
                        original: e.original[i],
                        dataType: $.is.isArray(o) ? "array" : ($.is.isObject(o) ? "object" : "string"),
                        data: e.data[i],
                        form: i,
                        size: 0
                    }));
                }
            }
        } else {
            console.info("[brooder] Illegal assignment need Json.");
            return false;
        }
    } else {
        if ($.is.isString(e.data)) {
            var cc = autobind.docommand.call(ths, ths.dom, e.command);
            cc.each(function () {
                autobind.valueset.call(ths, $(this), e.data, e.parent);
            });
        } else {
            console.info("[brooder] Illegal assignment need String.");
            return false;
        }
    }
};
autobind.replace = function (e) {
    console.log(e);
    var ths = this;
    var cc = autobind.docommand.call(this, this.dom, e.command);
    var p = $().create("div").append(this.template(this.observer));
    var dd = autobind.docommand.call(this, p, e.command);
    dd.each(function (n) {
        for (var j = 0; j < e.size; j++) {
            var np = $(this).children(e.from + j).insertAfter(cc.eq(n).children(e.from));
            cc.eq(n).children(e.from).remove();
            autobind.setEvent.call(ths, np);
            np.attr("_num_", e.from);
        }
    });
};
autobind.reset = function (e) {
    console.log(e);
    this.dom.html(this.template(this.observer));
    autobind.setEvent.call(this, this.dom);
    autobind.setArrayNum.call(this);
};
autobind.docommand = function (dom, command) {
    var current = dom;
//    console.log(dom);
    for (var i = 0; i < command.length; i++) {
        var a = command[i];
        if (a[a.length - 1] === "*") {
            current = current.findClass("a:" + a);
        } else if ($.is.isNumber(a)) {
            current = current.childrens(a);
        } else {
            var b = a.split("\."), cp = "";
            if (b.length > 1) {
                b.pop();
                if (b.length > 1) {
                    cp = b.join(".");
                } else {
                    cp = b[0];
                }
            }
            var c = $();
            c.add(current.filterClass("k:" + a, "o:" + a, "k:" + cp, "o:" + cp));
            c.add(current.findClass("k:" + a).add(current.findClass("o:" + cp)));
            current = c;
        }
    }
    return current;
};
autobind.setter = function (dom) {
    if (!dom.data("_setter_")) {
        var set = dom.dataset("setter");
        if (set) {
            var cd = set.split("|"), mapping = {};
            cd.forEach(function (a) {
                var n = a.split(":");
                mapping[n[0]] = n[1] ? n[1].split(",") : [];
            });
            dom.data("_setter_", mapping);
        } else {
            dom.data("_setter_", {html: []});
        }
    }
    return dom.data("_setter_");
};
autobind.valueset = function (dom, value, values) {
    var ths = this;
    var mapping = autobind.setter(dom);
    if (mapping) {
        var validate = mapping["validate"], isvalidate = true;
        if (validate) {
            if (ths.validate[validate]) {
                isvalidate = ths.validate[validate](value, values);
            }
            if (isvalidate) {
                for (var i in mapping) {
                    if (i === "html") {
                        dom.html(value);
                    } else if (i === "text") {
                        dom.text(value);
                    } else if (i === "attr") {
                        for (var t in mapping[i]) {
                            dom.attr(mapping[i][t], value);
                        }
                    } else if (i === "css") {
                        for (var t in mapping[i]) {
                            dom.css(mapping[i][t], value);
                        }
                    } else if (i === "fn") {
                        if (ths.setter[mapping[i]]) {
                            ths.setter[mapping[i]].call(dom, value, values);
                        }
                    }
                }
            }
        } else {
            dom.html(value);
        }
    }
};
autobind.setEvent = function (dom) {
    var ths = this;
    dom.find("[data-event]").add(dom).each(function () {
        var thss = $(this);
        var set = thss.dataset("event");
        if (set) {
            var cd = set.split("|"), mapping = {};
            cd.forEach(function (a) {
                var n = a.split(":");
                if (n[1]) {
                    mapping[n[0]] = n[1].split(",");
                }
            });
            for (var i in mapping) {
                thss.data("_eventmapping", mapping).bind(i, function (e) {
                    var a = $(this).data("_eventmapping"), t = $(this);
                    var calls = a[e.type];
                    calls.forEach(function (event) {
                        if (ths.events[event]) {
                            var getter = t.dataset("getter");
                            var pd = autobind.getModelDataCommand(ths.dom, t, getter);
                            var r = ths.observer;
                            for (var i in pd) {
                                r = r[pd[i]];
                            }
                            ths.events[event].call(t, r, ths.observer, e);
                        }
                    });
                });
            }
        }
    });
};
autobind.getModelDataCommand = function (all, dom, keys) {
    if (keys) {
        if (keys.indexOf("*") !== -1) {
            var b = dom, m = [];
            while (b.get(0) !== all.get(0)) {
                if (b.attr) {
                    var c = b.attr("_num_");
                    if (c) {
                        m.push(c);
                    }
                }
                b = b.parent();
            }
            keys = keys.replace(/\*/g, function (a, b, c) {
                return "." + m.pop();
            });
            return keys.split(".");
        } else {
            return keys.split(".");
        }
    } else {
        return [];
    }
};
autobind.setArrayNum = function () {
    this.dom.find("[class*='a:']").each(function () {
        $(this).children().each(function (i) {
            $(this).attr("_num_", i);
        });
    });
};
autobind.prototype.getData = function () {
    return this.observer;
};
autobind.prototype.getModelView = function () {
    return this.observer;
};
$.fn.autobind = function (option) {
    if (!this.data("autobind")) {
        var ops = {
            template: "",
            data: null,
            validate: {},
            setter: {},
            events: {}
        };
        $.extend(ops, option);
        return new autobind(this, ops.template, ops.data, ops.validate, ops.setter, ops.events);
    } else {
        return this.data("autobind");
    }
};

module.exports = {
    observer: function (obj, fn) {
        return observer(obj, fn);
    }
};