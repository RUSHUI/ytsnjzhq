(function ($) {
    var brooder = $;
    var about = {
        info: {
            name: "brooder",
            version: "0.9",
            type: "Site",
            desc: "brooder the fastest web fontend framework.",
            topic: "simply unusual."
        },
        print: function () {
            console.log("[brooder for " + about.info.type + "] " + about.info.topic + "\r\n" + about.info.desc + "version " +
                    about.info.version + "\r\n" + browser.name() + " " + browser.version()
                    + (browser.isSupport() ? " supported." : " unsupported.") + "\r\n");
        }
    };
    var browser = {
        info: (function () {
            var info = {
                name: "",
                version: "",
                kernel: ""
            };
            var ua = navigator.userAgent.toLowerCase(), s;
            info.kernel = ua.match("applewebkit") ? "webkit" : (ua.match("trident") ? "trident" : (ua.match("gecko") ? "gecko" : "unknow"));
            (s = ua.match(/msie ([\d.]+)/)) ? info.version = s[1] :
                    (s = ua.match(/firefox\/([\d.]+)/)) ? info.version = s[1] :
                    (s = ua.match(/chrome\/([\d.]+)/)) ? info.version = s[1] :
                    (s = ua.match(/opera.([\d.]+)/)) ? info.version = s[1] :
                    (s = ua.match(/safari.([\d.]+)/)) ? info.version = s[1] :
                    (s = ua.match(/mozilla.([\d.]+)/)) ? info.version = s[1] :
                    (s = ua.match(/version\/([\d.]+).*safari/)) ? info.version = s[1] : 0;
            info.name = s[0].split("/")[0];
            if (s[0].split("/")[0] === "mozilla") {
                if (ua.indexOf("trident") !== -1) {
                    info.name = "msie";
                    info.version = "11.0";
                }
            }
            return info;
        })(),
        version: function () {
            return this.info.version;
        },
        name: function () {
            return this.info.name;
        },
        isSupport: function () {
            var s = {
                msie: 10,
                chrome: 27,
                firefox: 29,
                mozilla: 5,
                safari: 3
            }, result = false;
            for (var i in s) {
                if (i.indexOf(this.name()) !== -1) {
                    if (s[i] <= parseInt(this.version())) {
                        result = true;
                    }
                }
            }
            return result;
        }
    };
    var is = {
        isFunction: function (obj) {
            return (typeof obj === 'function') && obj.constructor === Function;
        },
        isEmptyObject: function (obj) {
            for (var a in obj) {
                return false;
            }
            return true;
        },
        isWindow: function (obj) {
            return obj !== undefined && obj !== null && obj === obj.window;
        },
        isDocument: function (obj) {
            return obj !== null && obj.nodeType === obj.DOCUMENT_NODE;
        },
        isObject: function (obj) {
            return  typeof (obj) === "object" && Object.prototype.toString.call(obj).toLowerCase() === "[object object]" && !obj.length;
        },
        isString: function (obj) {
            return (typeof obj === 'string') && obj.constructor === String;
        },
        isNumber: function (obj) {
            return typeof obj === "number";
        },
        isNumeric: function (obj) {
            return !isNaN(parseFloat(obj)) && isFinite(obj);
        },
        isAvalid: function (obj) {
            return obj !== null && obj !== undefined;
        },
        isArray: function (obj) {
            return Object.prototype.toString.call(obj) === '[object Array]';
        },
        isQueryString: function (str) {
            return is.isString(str) && /(^|&).*=([^&]*)(&|$)/.test(str);
        },
        isElement: function (e) {
            return e && e.nodeType === 1 && e.nodeName;
        }
    };
    var serialize = {
        parse: function (str) {
            return window.JSON.parse(str);
        },
        stringify: function (obj) {
            return window.JSON.stringify(obj);
        },
        postData: function (obj) {
            if (obj) {
                if (obj instanceof FormData || obj instanceof Blob || obj instanceof ArrayBuffer) {
                    return obj;
                } else if (is.isObject(obj)) {
                    var has = false;
                    for (var i in obj) {
                        if (obj[i] instanceof Blob || obj[i] instanceof ArrayBuffer || obj[i] instanceof File) {
                            has = true;
                            break;
                        }
                    }
                    if (has) {
                        var fd = new FormData();
                        for (var i in obj) {
                            if (obj[i] instanceof Blob) {
                                fd.append(i, obj[i]);
                            } else if (obj[i] instanceof File) {
                                fd.append(i, obj[i]);
                            } else if (is.isArray(obj[i]) || is.isObject(obj[i])) {
                                fd.append(i, window.encodeURIComponent(serialize.stringify(obj[i])));
                            } else if (obj[i] instanceof FormData) {
                            } else {
                                fd.append(i, window.encodeURIComponent(obj[i].toString()));
                            }
                        }
                        return fd;
                    } else {
                        return serialize.queryString(obj);
                    }
                } else if (is.isArray(obj)) {
                    return window.encodeURIComponent(serialize.stringify(obj));
                } else {
                    return obj;
                }
            } else {
                return null;
            }
        },
        queryString: function (obj) {
            var result = "";
            if (obj) {
                for (var i in obj) {
                    var val = obj[i];
                    if (is.isString(val)) {
                        result += i + "=" + window.encodeURIComponent(val) + "&";
                    } else if (is.isObject(val) || is.isArray(val)) {
                        result += i + "=" + window.encodeURIComponent(serialize.stringify(val)) + "&";
                    } else if (val instanceof FormData || val instanceof Blob || val instanceof File || val instanceof ArrayBuffer) {
                    } else {
                        result += i + "=" + (val ? window.encodeURIComponent(val.toString()) : "") + "&";
                    }
                }
                return result.length > 0 ? result.substring(0, result.length - 1) : "";
            } else {
                return "";
            }
        },
        queryObject: function (str) {
            var n = str.split("?"), result = {};
            if (n.length > 1) {
                n[1].split("&").forEach(function (a) {
                    var c = a.split("=");
                    result[c[0]] = c.length > 1 ? c[1] : "";
                });
                return result;
            } else {
                return null;
            }
        }
    };
    var json = {
        each: function (object, fn) {
            var name, i = 0, length = object.length, isObj = length === undefined || is.isFunction(object);
            if (isObj) {
                for (name in object) {
                    if (fn.call(object[ name ], name, object[ name ]) === false) {
                        break;
                    }
                }
            } else {
                while (i < length) {
                    if (fn.call(object[ i ], i, object[ i++ ]) === false) {
                        break;
                    }
                }
            }
            return object;
        },
        clone: function (obj) {
            var a;
            if (is.isArray(obj)) {
                a = [];
                for (var i = 0; i < obj.length; i++) {
                    a[i] = arguments.callee(obj[i]);
                }
                return a;
            } else if (is.isObject(obj)) {
                a = {};
                for (var i in obj) {
                    a[i] = arguments.callee(obj[i]);
                }
                return a;
            } else {
                return obj;
            }
        },
        cover: function () {
            var obj, key, val, vals, arrayis, clone, result = arguments[0] || {}, i = 1, length = arguments.length, isdeep = false;
            if (typeof result === "boolean") {
                isdeep = result;
                result = arguments[1] || {};
                i = 2;
            }
            if (typeof result !== "object" && !is.isFunction(result)) {
                result = {};
            }
            if (length === i) {
                result = this;
                i = i - 1;
            }
            while (i < length) {
                obj = arguments[i];
                if (obj !== null) {
                    for (key in obj) {
                        val = result[key];
                        vals = obj[key];
                        if (result === vals) {
                            continue;
                        }
                        arrayis = is.isArray(vals);
                        if (isdeep && vals && (is.isObject(vals) || arrayis)) {
                            if (arrayis) {
                                arrayis = false;
                                clone = val && is.isArray(val) ? val : [];
                            } else {
                                clone = val && is.isObject(val) ? val : {};
                            }
                            result[key] = arguments.callee(isdeep, clone, vals);
                        } else if (vals !== undefined) {
                            result[key] = vals;
                        }
                    }
                }
                i++;
            }
            return result;
        }
    };
    brooder.json = json;
    brooder.is = is;
    brooder.about = about;
    brooder.browser = browser;
    brooder.serialize = serialize;
    brooder.extend = brooder.json.cover;
    brooder.nfn = function () {
    };

    var util = {
        getDatasetName: function (a) {
            var n = "";
            for (var i = 0; i < a.length; i++) {
                if (/^[A-Z]+$/.test(a.charAt(i))) {
                    n += "-" + a.charAt(i).toLowerCase();
                } else {
                    n += a.charAt(i);
                }
            }
            return "data-" + n;
        }
    };

    String.prototype.trim = function (a) {
        return this.replace(/^\/s + | \/s+$/g, "");
    };
    Array.prototype.indexOf = function (a) {
        for (var i = 0, n = this.length; i < n; i++) {
            if (this[i] === a) {
                return i;
            }
        }
        return -1;
    };
    brooder.fn.dataset = function (a, b) {
        a = util.getDatasetName(a);
        if (arguments.length === 1) {
            return this.attr(a);
        } else {
            return this.attr(a, b);
        }
    };

    var queue = function () {
        this.list = [];
        this.length = null;
        this.current = null;
        this.state = "init";//running,end,stop.
        this._start = null;
        this._progress = null;
        this._complete = null;
        this.result = null;
    };
    queue.prototype.add = function (fn, error, parameter) {
        if (this.state === "init") {
            this.list.push({
                fn: fn,
                parameter: parameter,
                error: error || null
            });
        } else {
            throw Error("[brooder]-this queue can not add task when it is not in state of init.");
        }
        return this;
    };
    queue.prototype.next = function (data) {
        this._progress && this._progress.call(this, {
            total: this.length,
            runed: this.length - this.list.length,
            data: data
        });
        queue._fire.call(this, data);
        return this;
    };
    queue.prototype.error = function (e) {
        if (this.current) {
            this.current.error && this.current.error.call(this, result, e, this.current.parameter);
        }
    };
    queue.prototype.left = function () {
        return this.list.length;
    };
    queue.prototype.total = function () {
        return this.length;
    };
    queue.prototype.run = function (data) {
        if (this.length === null) {
            this._start && this._start.call(this);
            this.length = this.list.length;
        }
        this.state = 'running';
        queue._fire.call(this, data);
    };
    queue.prototype.stop = function () {
        if (this.state === "running") {
            this.state = "stop";
        }
        return this;
    };
    queue.prototype.reset = function () {
        this.length === null;
        this.state = "init";
        this.result = null;
        return this;
    };
    queue.prototype.clean = function () {
        this.list.length = 0;
        this.state = "end";
        this.length = 0;
        this.reuslt = null;
        return this;
    };
    queue.prototype.isRunning = function () {
        return this.state === "running";
    };
    queue.prototype.isEnd = function () {
        return this.state === "end";
    };
    queue.prototype.isStop = function () {
        return this.state === "stop";
    };
    queue.prototype.start = function (fn) {
        fn && (this._start = fn);
        return this;
    };
    queue.prototype.progress = function (fn) {
        fn && (this._progress = fn);
        return this;
    };
    queue.prototype.complete = function (fn) {
        fn && (this._complete = fn);
        if (this.state === "end") {
            this._complete.call(this, this.result);
        }
        return this;
    };
    queue._fire = function (result) {
        if (this.list.length > 0) {
            var a = this.list.shift(), ths = this;
            this.current = a;
            try {
                a.fn && a.fn.call(ths, result, a.parameter);
            } catch (e) {
                console.error(e.message);
                this.next();
//                a.error && a.error.call(ths, result, e, a.parameter);
            }
        } else {
            this.state = 'end';
            this.result = result;
            this._complete && this._complete.call(this, result);
        }
        return this;
    };
    brooder.queue = function () {
        return new queue();
    };

    var dynamicQueue = function () {
        this.state = "waiting";//waiting,running
        this.list = [];
        this.result = null;
        this.current = null;
        this._complete = null;
        this._notify = null;
        this.waits = 1;
        this._completeTimes = 0;
        this._handleTimes = 0;
    };
    dynamicQueue.prototype.add = function (fn, error) {
        this.list.push({
            fn: fn,
            error: error
        });
        if (this.state === "waiting") {
            if (this.list.length === this.waits) {
                dynamicQueue._fire.call(this, this.result);
            }
        }
        return this;
    };
    dynamicQueue.prototype.size = function () {
        return this.list.length;
    };
    dynamicQueue.prototype.wait = function (num) {
        if (arguments.length === 0 || num === 0) {
            num = 10000000;
        }
        this.waits = num;
        return this;
    };
    dynamicQueue.prototype.work = function (data) {
        if (this.state === "waiting") {
            this.waits = 1;
            dynamicQueue.next.call(this, data);
        }
        return this;
    };
    dynamicQueue.prototype.delay = function (time) {
        this.add(function (data) {
            var ths = this;
            setTimeout(function () {
                ths.next(data);
            }, time);
        });
        return this;
    };
    dynamicQueue.prototype.notify = function (fn) {
        fn && (this._notify = fn);
        return this;
    };
    dynamicQueue.prototype.complete = function (fn) {
        fn && (this._complete = fn);
        return this;
    };
    dynamicQueue.prototype.isRunning = function () {
        return this.state === "running";
    };
    dynamicQueue.prototype.isWaiting = function () {
        return this.state === "waiting";
    };
    dynamicQueue.prototype.isHandleAtOnce = function () {
        if (this.state === "running" && this.list.length > 0) {
            return false;
        } else {
            return true;
        }
    };
    dynamicQueue.prototype.completeTimes = function () {
        return this._completeTimes;
    };
    dynamicQueue.prototype.handleTimes = function () {
        return this._handleTimes;
    };
    dynamicQueue.prototype.clean = function () {
        this.list.length = 0;
        this.state = "waiting";
        for (var i in this) {
            this[i] = null;
        }
    };
    dynamicQueue.getQueueLite = function (queue) {
        return {
            isRunning: function () {
                return queue.isRunning();
            },
            isWaiting: function () {
                return queue.isWaiting();
            },
            isHandleAtOnce: function () {
                return queue.isHandleAtOnce();
            },
            completeTimes: function () {
                return queue.completeTimes();
            },
            handleTimes: function () {
                return queue.handleTimes();
            },
            next: function (data) {
                dynamicQueue.next.call(queue, data);
                return queue;
            },
            delay: function (time) {
                queue.delay(time);
                return queue;
            },
            error: function (e) {
                return dynamicQueue.error.call(queue, e);
            },
            clean: function () {
                queue.clean();
                return queue;
            }
        };
    };
    dynamicQueue.next = function (data) {
        this._notify && this._notify.call(this, data);
        dynamicQueue._fire.call(this, data);
        return this;
    };
    dynamicQueue.error = function (data) {
        if (this.current) {
            this.current.error && this.current.error(this, data);
        }
        return this;
    };
    dynamicQueue._fire = function (result) {
        if (this.list.length > 0) {
            this.state = 'running';
            this._handleTimes = this._handleTimes + 1;
            var a = this.list.shift(), ths = dynamicQueue.getQueueLite(this);
            this.current = a;
            try {
                a.fn && a.fn.call(ths, result);
            } catch (e) {
                console.error(e.message);
                dynamicQueue.next.call(ths, result);
//                a.error && a.error.call(ths, result, e);
            }
        } else {
            if (this.state === 'running') {
                this.result = result;
                this.state = 'waiting';
                this._completeTimes = this._completeTimes + 1;
                this.current = null;
                this._complete && this._complete.call(this, result);
            }
        }
        return this;
    };
    brooder.dynamicQueue = function () {
        return new dynamicQueue();
    };

    var promise = function (task) {
        this.state = 0;//0,1,2
        this.queue = new dynamicQueue();
        this._finally = null;
        this._notify = null;
        this._complete = null;
        this._result = null;
        this._scope = null;
        var ths = this;
        this.queue.complete(function (data) {
            ths._result = data;
            var a = ths._finally && ths._finally.call(ths, data);
            if (a instanceof promise) {
                a.complete(function (b) {
                    ths._result = b;
                    ths._complete && ths._complete.call(ths, b);
                });
            } else {
                ths._complete && ths._complete.call(ths, data);
            }
        }).notify(function (e) {
            ths._notify && ths._notify(e);
        });
        if (is.isFunction(task)) {
            this.queue.wait();
            this.done(function (a) {
                return a;
            });
            task(function (a) {
                ths.resolve(a);
            }, function (a) {
                ths.reject(a);
            });
        } else if (task) {
            this._result = task;
            this.state = 1;
            this.queue.add(function () {
                this.next(task);
            });
        } else {
            this.queue.wait();
            this.done(function (a) {
                return a;
            });
        }
    };
    promise.prototype.scope = function (scope) {
        if (arguments.length === 1) {
            this._scope = scope;
            return this;
        } else {
            return this.scope;
        }
    };
    promise.prototype.then = function (resolver, rejecter) {
        promise.add.call(this, resolver, 1);
        promise.add.call(this, rejecter, 2);
        return this;
    };
    promise.prototype.wait = function (fn) {
        this.queue.add(function (data) {
            var ths = this;
            fn.call(ths, function (a) {
                ths.next(a);
            }, data);
        });
        return this;
    };
    promise.prototype.done = function (fn) {
        promise.add.call(this, fn, 1);
        return this;
    };
    promise.prototype.fail = function (fn) {
        promise.add.call(this, fn, 2);
        return this;
    };
    promise.prototype.always = function (fn) {
        is.isFunction(fn) && (this._finally = fn);
        return this;
    };
    promise.prototype.reject = function (data) {
        this.state = 2;
        this.queue.work(data);
        return this;
    };
    promise.prototype.resolve = function (data) {
        this.state = 1;
        this.queue.work(data);
        return this;
    };
    promise.prototype.notify = function (fn) {
        is.isFunction(fn) && (this._notify = fn);
        return this;
    };
    promise.prototype.complete = function (fn) {
        is.isFunction(fn) && (this._complete = fn);
        return this;
    };
    promise.prototype.delay = function (time) {
        this.queue.delay(time);
        return this;
    };
    promise.prototype.clean = function () {
        this.queue.clean();
        for (var i in this) {
            this[i] = null;
        }
    };
    promise.add = function (fn, state) {
        var ps = this;
        if (fn && is.isFunction(fn)) {
            this.queue.add(function (data) {
                var ths = this;
                setTimeout(function () {
                    if (ps.state === state) {
                        var a;
                        if (ps._scope) {
                            a = fn && fn.call(ps._scope, data);
                        } else {
                            a = fn && fn(data);
                        }
                        if (a instanceof promise) {
                            a.complete(function (b) {
                                ths.next(b);
                            });
                        } else {
                            ths.next(a);
                        }
                    } else {
                        ths.next(data);
                    }
                }, 0);
            });
        }
    };
    brooder.promise = function (fn) {
        return new promise(fn);
    };
    brooder.all = function () {
        var ps = $.promise();
        if (arguments.length > 0) {
            var a = Array.prototype.slice.call(arguments);
            var total = a.length;
            a.forEach(function (pros) {
                pros.complete(function () {
                    if (this.isResolve) {
                        total = total - 1;
                        if (total === 0) {
                            ps.resolve();
                        }
                    }
                });
            });
        }
        return ps;
    };
    brooder.any = function () {
        var ps = $.promise();
        if (arguments.length > 0) {
            var a = Array.prototype.slice.call(arguments);
            var total = a.length, resolved = false;
            a.forEach(function (pros) {
                pros.complete(function () {
                    total = total - 1;
                    if (this.isResolve) {
                        resolved = true;
                    }
                    if (total === 0 && resolved) {
                        ps.resolve();
                    }
                });
            });
        }
        return ps;
    };

    var packetmapping = [];
    var packetDone = [];
    var requireMapping = {};
    var packet = function (option) {
        var ops = {
            basepath: "",
            packetName: "",
            back: null
        }, ths = this;
        brooder.extend(ops, option);
        if (ops.packetName !== "") {
            var path = ops.basepath + ops.packetName.replace(/\./g, "/") + ".js";
            this.option = ops;
            this.info = [];
            if (packetmapping.indexOf(path) === -1) {
                this.load(path, function () {
                    var re = ths.dependsSort(ths.info);
                    if (re.length === ths.info.length) {
                        ths.info = re;
                        for (var i = 0; i < ths.info.length; i++) {
                            var d = ths.info[i].info;
                            var xcode = ths.info[i].code + "\r\n//@ sourceURL=" + d.path;
                            try {
                                brooder.___info = d;
                                if (!requireMapping[d.packet]) {
                                    requireMapping[d.packet] = {};
                                }
                                (new Function("info", "$", "Module", "Option", "module", "require", xcode))(d, brooder, brooder.Module, brooder.Option, requireMapping[d.packet],
                                        function (packetName) {
                                            if (requireMapping[packetName]) {
                                                return requireMapping[packetName].exports ? requireMapping[packetName].exports : requireMapping[packetName];
                                            } else {
                                                throw Error("[brooder] method require() called error,packet of " + packetName + " is not required in packet of " + d.packet);
                                            }
                                        });
                                brooder.___info = null;
                            } catch (e) {
                                brooder.___info = null;
                                console.log(e);
                                console.error("[brooder] packet import error name of " + d.packet + " path of " + d.path + " Message:" + e.stack);
                            }
                        }
                        packetmapping.push(path);
                        ths.option.back && ths.option.back();
                    } else {
                        throw Error("[brooder] packet depends error,maybe has circle depends,or some file has no packet info.");
                    }
                    ths.clean();
                });
            } else {
                ths.option.back && ths.option.back();
                ths.clean();
            }
        }
    };
    packet.basePath = "";
    packet.isNote = /\/\*[\w\W]*?\*\//;
    packet.isInfo = /@([\s\S]*?);/g;
    packet.isPacketTag = /["\']@[A-Za-z0-9_-]+\.[A-Za-z0-9_-]*["\']/g;
    packet.isCurrentTag = /["\']@\.[A-Za-z0-9_-]*["\']/g;
    packet.prototype.load = function (path, fn) {
        var ths = this, pathname = path;
        brooder.ajax({
            url: path,
            type:"post",
            dataType: "text",
            success: function (e) {
//                console.log(e);
                var aa = ths.getPacketInfo(e), kp = 0;
                if (aa.packet === "nopacket") {
                    console.error("[brooder] file has no packet info,path of " + pathname);
                }
                try {
                    c = ths.replacePacketNames(aa, e);
                    e = c;
                } catch (e) {
                    console.error(e.stack);
                }
                ths.info.push({
                    info: aa,
                    code: e
                });
                if (aa.require) {
                    kp += aa.require.length;
                }
                if (aa.css) {
                    kp += aa.css.length;
                }
                if (kp > 0) {
                    var queue = brooder.queue();
                    queue.complete(function () {
                        if (fn) {
                            fn();
                        }
                    });
                    for (var i in aa.css) {
                        var path = aa.css[i];
                        if (packetmapping.indexOf(path) === -1) {
                            packetmapping.push(path);
                            queue.add(function (a, b) {
                                brooder.loader.css(b, function () {
                                    queue.next();
                                });
                            }, null, path);
                        }
                    }
                    for (var i in aa.require) {
                        var path = aa.require[i];
                        if (packetmapping.indexOf(path) === -1) {
                            packetmapping.push(path);
                            queue.add(function (a, b) {
                                ths.load(b, function () {
                                    queue.next();
                                });
                            }, null, path);
                        }
                    }
                    queue.run();
                } else {
                    if (fn) {
                        fn();
                    }
                }
            },
            error: function () {
                if (fn) {
                    fn();
                }
            }
        });
    };
    packet.prototype.dependsSort = function (mapping) {
        var k = [], kk = [];
        for (var i = 0; i < mapping.length; i++) {
            var a = mapping[i];
            a.dependTimes = a.info.depends.length;
            for (var j = 0; j < a.info.depends.length; j++) {
                var n = a.info.depends[j];
                if (packetDone.indexOf(n) !== -1) {
                    a.dependTimes = a.dependTimes - 1;
                }
            }
        }
        for (var i = 0; i < mapping.length; i++) {
            var a = mapping[i];
            if (a.dependTimes === 0 || a.info.depends.length === 0) {
                packetDone.push(a.info.packet);
                k.push(a);
            } else {
                a.dependTimes = a.info.depends.length;
                kk.push(a);
            }
        }
        for (var i = 0; i < k.length; i++) {
            var a = k[i];
            for (var j = 0; j < kk.length; j++) {
                var b = kk[j];
                if (b.info.depends.indexOf(a.info.packet) !== -1) {
                    b.dependTimes = b.dependTimes - 1;
                    if (b.dependTimes <= 0) {
                        packetDone.push(b.info.packet);
                        k.push(b);
                        kk.splice(j, 1);
                    }
                }
            }
        }
        return k;
    };
    packet.prototype.getPacketInfo = function (str) {
        var a = str.match(packet.isNote), basepath = this.option.basepath, n = {"_packets_": {}, "packet": "", require: [], css: [], depends: []};
        if (a && a.length > 0) {
            var b = a[0];
            var bb = b.match(packet.isInfo);
            for (var i = 0; i < bb.length; i++) {
                var a = bb[i];
//            b.match(packet.isInfo).forEach(function (a) {
                var d = a.split(" ");
                if (d.length >= 2) {
                    var key = d[0].substring(1, d[0].length), value = d[1].substring(0, d[1].length - 1);
                    if (key === "require") {
                        n.depends.push(value);
                        var t = value.split(":");
                        if (t.length > 1) {
                            if (n._packets_[t[1]]) {
                                console.info("[brooder] maybe the packet with name of " + n.packet + " contain duplicate packet shortname,it is " + t[1]);
                            }
                            n._packets_[t[1]] = t[0];
                        } else {
                            var m = t[0].split("\.");
                            if (n._packets_[m[m.length - 1]]) {
                                console.info("[brooder] maybe the packet with name of " + n.packet + " contain duplicate packet shortname,it is " + m[m.length - 1]);
                            }
                            n._packets_[m[m.length - 1]] = t[0];
                        }
                        value = basepath + t[0].replace(/\./g, "/") + ".js";
                    } else if (key === "css") {
                        value = basepath + value.replace(/\./g, "/") + ".css";
                    } else if (key === "packet") {
                        n.packet = value;
                    } else {
                        n[key] = value;
                    }
                    n["path"] = basepath + n.packet.replace(/\./g, "/") + ".js";
                    if (n[key]) {
                        if (n[key].indexOf(value) === -1) {
                            n[key].push(value);
                        }
                    }
                }
//            });
            }
        } else {
            n.packet = "nopacket";
        }
        return n;
    };
    packet.prototype.replacePacketNames = function (info, code) {
        return code.replace(packet.isPacketTag, function (str) {
            var a = str.split("\."), index = 0, key = a[1].substring(0, a[1].length - 1), index = a[0].substring(2);
            if (info._packets_[index]) {
                return str[0] + info._packets_[index] + "." + key + str[str.length - 1];
            } else {
                throw Error("[brooder] packet can not find with tag of " + str + ",packet is " + info.packet);
            }
        }).replace(packet.isCurrentTag, function (str) {
            return str[0] + info.packet + "." + str.split("\.")[1];
        });
    };
    packet.prototype.clean = function () {
        for (var i in this) {
            this[i] = null;
        }
    };
    packet.require = function (packetName) {
        if (requireMapping[packetName]) {
            return requireMapping[packetName].exports ? requireMapping[packetName].exports : requireMapping[packetName];
        } else {
            throw Error("[brooder] method require() called error,packet of " + packetName);
        }
    };
    brooder.packet = function (option) {
        new packet(option);
    };
    brooder.packetBasePath = function (path) {
        if (arguments.length === 1) {
            packet.basePath = path;
        } else {
            return packet.basePath;
        }
    };
    brooder.require = function (packetName, fn) {
        new packet({
            basepath: packet.basePath,
            packetName: packetName,
            back: function () {
                fn && fn(packet.require(packetName), packet.require);
            }
        });
    };

    var template = function () {
        this.fn = null;
    };
    template.a = /&lt;%/g;
    template.b = /%&gt;/g;
    template.c = /&quot;/g;
    template.d = /<%|%>/g;
    template.e = /^=.*;$/;
    template.code = function (temp) {
        var fn = "var out='';";
        temp.replace(template.a, "<%").replace(template.b, "%>").split(template.d).forEach(function (e, index) {
            e = e.replace(/"/g, '\\"');
            index % 2 !== 0 ? (template.e.test(e) ? (fn += "out+" + e) : (fn += e)) : (fn += "out+=\"" + e + "\";");
        });
        fn += "return out;";
        return fn;
    };
    template.compile = function (temp) {
        var fn = template.code(temp);
        try {
            return  new Function("data", "fn", fn);
        } catch (e) {
            console.error("[template error] " + e.message);
            console.info("[template result] " + fn);
            return function () {
                return "";
            };
        }
    };
    template.prototype.code = function (temp) {
        return template.code(temp);
    };
    template.prototype.parse = function (temp, data, fn) {
        if (!this.fn) {
            this.fn = template.compile(temp);
        }
        return this.fn(data, fn);
    };
    template.prototype.compile = function (temp) {
        return template.compile(temp);
    };
    brooder.template = function () {
        return new template();
    };
    brooder.fn.template = function () {
        var temp = new template(), ths = this;
        return {
            render: function (data, fn) {
                var str = ths.html();
                ths.html("[rending...]");
                ths.html(temp.parse(str, data, fn));
                return this;
            },
            parse: function (data, fn) {
                return temp.parse("", data, fn);
            }
        };
    };

    var adapt = function () {
    };
    adapt.prototype.privator = function (name) {
        var a = this.__adapt__._private["_" + name];
        if (a) {
            var paras = Array.prototype.slice.call(arguments);
            paras.splice(0, 1);
            return a.apply(this, paras);
        } else {
            return null;
        }
    };
    adapt.prototype.staticor = function (name, scope) {
        var a = this.__adapt__._static["__" + name];
        if (is.isFunction(a)) {
            var paras = Array.prototype.slice.call(arguments);
            paras.splice(0, 2);
            return a.apply(scope, paras);
        } else {
            return a;
        }
    };
    adapt.prototype.type = function () {
        return this.__adapt__._type;
    };
    adapt.prototype.shortName = function () {
        return this.__adapt__._shortName;
    };
    adapt.prototype.packet = function () {
        return this.__adapt__._packet;
    };
    adapt.prototype.typeOf = function (type) {
        return this.__adapt__._mapping[type] !== undefined;
    };
    adapt.prototype.factory = function () {
        return this.__adapt__._factory;
    };
    adapt.prototype.clean = function () {
        this.__adapt__._factory = null;
        for (var i in this) {
            this[i] = null;
        }
    };
    adapt.prototype.isSingleton = function () {
        return this.__adapt__._singleton;
    };
    adapt.prototype.superClass = function (propName) {
        var parent = this.__adapt__._factory.mapping[this.__adapt__._parent];
        if (parent && parent.prototype[propName]) {
            var b = parent.prototype[propName];
            if (is.isFunction(b)) {
                var _a = new parent(), keys = Object.keys(this);
                for (var i = 0; i < keys.length; i++) {
                    _a[keys[i]] = this[keys[i]];
                }
                var pars = Array.prototype.slice.call(arguments);
                pars.splice(0, 1);
                try {
                    var r = b.apply(_a, pars), l = Object.keys(_a);
                    for (var i = 0; i < l.length; i++) {
                        this[l[i]] = _a[l[i]];
                    }
                    return r;
                } catch (e) {
                    console.error(e.message);
                    return null;
                }
            } else {
                return b;
            }
        } else {
            return undefined;
        }
    };
    adapt.prototype.__adapt__ = {
        _type: "adapt",
        _shortName: "adapt",
        _packet: "",
        _parent: null,
        _factory: null,
        _private: null,
        _static: null,
        _option: null,
        _mapping: {},
        _original_option: [],
        _instance_props: ["privator", "staticor", "type", "shortName", "packet", "typeOf", "factory", "clean", "superClass"],
        _extendslink: []
    };
    var factory = function () {
        this.mapping = {
            adapt: adapt
        };
    };
    var fsingleton = {};
    factory.prototype.def = function (obj) {
        var ab = new Function();
        var a = {
            _type: (obj.packet && obj.packet !== "" ? obj.packet + "." : "") + obj.name,
            _shortName: obj.name,
            _packet: obj.packet || "",
            _mapping: {adapt: 1},
            _extendslink: [],
            _instance_props: [],
            _private: {},
            _static: {},
            _factory: this,
            _singleton: obj.singleton === null ? obj.singleton : false,
            _option: obj.option,
            _original_option: []
        };
        a._mapping[a._type] = 1;
        for (var i in obj.option) {
            a._original_option.push(i);
        }
        var prpt = new adapt();
        !obj.extend && (obj.extend = ["adapt"]);
        var array = obj.extend;
        is.isString(obj.extend) && (array = [obj.extend]);
        a._parent = array[0];
        brooder.extend(a._option, this.mapping[array[0]].prototype.__adapt__._option);
        for (var i = array.length - 1; i >= 0; i--) {
            if (array[i] !== "adapt") {
                var d = this.mapping[array[i]].prototype;
                brooder.extend(a._mapping, d.__adapt__._mapping);
                brooder.extend(a._private, d.__adapt__._private);
                brooder.extend(a._static, d.__adapt__._static);
                var q = [];
                for (var i in d) {
                    if (Object.prototype.hasOwnProperty.call(d, i)) {
                        q.push(i);
                    }
                }
                for (var t = 0; t < q.length; t++) {
                    if (brooder.is.isFunction(d[t])) {
                        if (!/^(init)$|^_\w*/.test(t)) {
                            prpt[q[t]] = d[q[t]];
                        }
                    } else {
                        prpt[q[t]] = d[q[t]];
                    }
                }
            }
        }
        prpt.__adapt__ = a;
        for (var i in obj) {
            if (/^__/.test(i)) {
                a._static[i] = obj[i];
            } else {
                if (is.isFunction(obj[i])) {
                    if (/^_/.test(i)) {
                        a._private[i] = obj[i];
                    } else {
                        prpt[i] = obj[i];
                        if (i !== "init")
                            a._instance_props.push(i);
                    }
                } else {
                    if (!/^(name)|(extend)|(option)/.test(i)) {
                        prpt[i] = obj[i];
                        if (!/^(packet)|(layout)/.test(i))
                            a._instance_props.push(i);
                    }
                }
            }
        }
        ab.prototype = prpt;
        var k = ab;
        while (k) {
            a._extendslink.push(k.prototype.__adapt__._type);
            k = this.mapping[k.prototype.__adapt__._parent];
        }
        this.mapping[a._type] = ab;
        return this;
    };
    factory.prototype.get = function (name) {
        return this.mapping[name];
    };
    factory.prototype.create = function (type, option) {
        var objx = null, name = type;
        var clazz = this.mapping[name];
        if (clazz) {
            objx = new clazz();
            objx.option = brooder.extend({}, clazz.prototype.__adapt__._option, option);
            for (var i = clazz.prototype.__adapt__._extendslink.length - 1; i >= 0; i--) {
                var p = this.mapping[clazz.prototype.__adapt__._extendslink[i]];
                if (p && p.prototype["init"]) {
                    p.prototype["init"].call(objx, objx.option);
                }
            }
        }
        return objx;
    };
    factory.prototype.instance = function (type, option) {
        var objx = null, name = type;
        var clazz = this.mapping[name];
        if (clazz) {
            var sg = clazz.prototype.__adapt__._singleton;
            if (sg) {
                if (!fsingleton[type]) {
                    var objxx = new clazz();
                    objxx.option = brooder.extend({}, clazz.prototype.__adapt__._option, option);
                    fsingleton[type] = objxx;
                }
                objx = fsingleton[type];
            } else {
                objx = new clazz();
                objx.option = brooder.extend({}, clazz.prototype.__adapt__._option, option);
            }
        }
        return objx;
    };
    factory.prototype.invoke = function (clazzName, methodName, scope) {
        var a = null;
        if (is.isString(clazzName)) {
            var j = this.mapping[clazzName];
            j && (a = new j());
        } else if (is.isObject(clazzName)) {
            a = clazzName;
        }
        if (a && a[methodName]) {
            if (is.isFunction(a[methodName]) && is.isObject(scope)) {
                var paras = Array.prototype.slice.call(arguments), keys = Object.keys(scope), obj = a;
                paras.splice(0, 3);
                for (var i = 0; i < keys.length; i++) {
                    obj[keys[i]] = scope[keys[i]];
                }
                try {
                    var r = obj[methodName].apply(obj, paras), n = Object.keys(obj);
                    for (var i = 0; i < n.length; i++) {
                        scope[n[i]] = obj[n[i]];
                    }
                    return r;
                } catch (e) {
                    console.error(e.message);
                    return null;
                }
            }
        }
        return null;
    };
    factory.prototype.proxy = function (object, part, fn) {//fn(method)
        if (arguments.length > 1) {
            var some = null, proxy = null;
            if (is.isString(object)) {
                var _a = this.mapping[object];
                _a && (object = new _a());
            } else if (object instanceof adapt) {
                var _b = new this.mapping[object.__adapt__._type](), _c = Object.keys(object);
                for (var i = 0; i < _c.length; i++) {
                    _b[_c[i]] = object[_c[i]];
                }
                object = _b;
            } else {
                object = null;
            }
            if (is.isObject(object)) {
                if (is.isArray(part)) {
                    some = part;
                    proxy = fn;
                } else if (is.isFunction(part)) {
                    proxy = part;
                }
                var a = new this.mapping[object.__adapt__._type]();
                for (var i in object) {
                    if (is.isFunction(object[i])) {
                        if (!some || some && some.indexOf(i) !== -1) {
                            (function (methodName) {
                                a[i] = function () {
                                    var pars = arguments;
                                    proxy && proxy.call(object, {
                                        methodName: methodName,
                                        invoke: function () {
                                            return object[methodName].apply(object, pars);
                                        }
                                    });
                                };
                            })(i);
                        }
                    } else {
                        a[i] = object[i];
                    }
                }
                return a;
            } else {
                return null;
            }
        } else {
            return null;
        }
    };
    factory.prototype.has = function (clazzType) {
        return this.mapping[clazzType] !== undefined;
    };
    brooder.adapt = function () {
        return new factory();
    };

    var module = {
        factory: brooder.adapt(),
        basemapping: {
            basePath: "",
            basicPackets: []
        },
        getPacketName: function (name) {
            console.log(name);
            if (name) {
                name = name.trim();
                if (name !== "") {
                    var a = name.split("\.");
                    if (a.length > 1) {
                        a.splice(a.length - 1, 1);
                        return a.join(".");
                    } else {
                        return name;
                    }
                } else {
                    return "";
                }
            } else {
                return "";
            }
        },
        getArrayUnDuplicate: function (a) {
            var r = {}, c = [];
            for (var i = 0; i < a.length; i++) {
                r[a[i]] = 1;
            }
            for (var i in r) {
                c.push(i);
            }
            return c;
        },
        getViewInstance: function (dom, option, fn, importstart, importend) {
            var moduleName = dom.dataset("view");
            if (moduleName) {
                module.get(moduleName, option, function (c) {
                    if (!dom.data("-view-")) {
                        c.dom = dom;
                        fn && fn(c);
                    } else {
                        fn && fn(dom.data("-view-"));
                    }
                }, importstart, importend);
            } else {
                throw Error("[brooder] view can not init.the element has no attribute like view-*");
            }
        },
        add: function (obj) {
            if (!obj.tagName) {
                obj.tagName = "div";
            }
            module.factory.def(obj);
            var ne = (obj.packet && obj.packet !== "" ? obj.packet + "." : "") + obj.name;
            var sobj = module.factory.get(ne).prototype;
            var cln = [obj.className || ""];
            for (var i = sobj.__adapt__._extendslink.length - 1; i >= 0; i--) {
                var b = module.factory.get(sobj.__adapt__._extendslink[i]);
                if (b) {
                    var cn = b.prototype.className;
                    if (cn && cn !== "") {
                        if (cln.indexOf(cn) === -1) {
                            cln.push(cn);
                        }
                    }
                }
            }
            sobj.fullClassName = cln.join(" ");
        },
        has: function (moduleName) {
            return  module.factory.has(moduleName);
        },
        get: function (moduleName, option, fn, importstart, importend) {
            if (!module.has(moduleName)) {
                var basepath = module.basemapping.basePath, packetName = module.getPacketName(moduleName);
                importstart && importstart({
                    packetName: packetName,
                    module: moduleName
                });
                brooder.packet({
                    basepath: basepath,
                    packetName: packetName,
                    back: function () {
                        importend && importend({
                            packetName: packetName,
                            module: moduleName
                        });
                        if (fn) {
                            if (module.has(moduleName)) {
                                fn(module.factory.instance(moduleName, option));
                            } else {
                                throw Error("[brooder] can not find module with name of " + moduleName + ",it is not in the packet of " + module.getPacketName(moduleName) + " or the packet file inited failed.");
                            }
                        }
                    }
                });
            } else {
                if (fn) {
                    fn(module.factory.instance(moduleName, option));
                }
            }
        }
    };
    var option = {
        options: {},
        add: function (obj) {
            if (obj.name && obj.name !== "") {
                option.options[obj.name] = obj;
            } else {
                throw Error("[brooder] option name can not null or ''");
            }
        },
        has: function (optionName) {
            var a = option.options[optionName];
            if (a) {
                return a;
            } else {
                return false;
            }
        },
        get: function (optionName, fn, importstart, importend) {
            if (optionName && optionName !== "") {
                var a = option.has(optionName);
                if (a === false) {
                    var packetName = module.getPacketName(optionName);
                    importstart && importstart({
                        packet: packetName,
                        option: optionName
                    });
                    brooder.packet({
                        basepath: module.basemapping.basePath,
                        packetName: packetName,
                        back: function () {
                            importend && importend({
                                packet: packetName,
                                option: optionName
                            });
                            if (fn) {
                                var ops = option.has(optionName);
                                if (ops) {
                                    fn(ops);
                                } else {
                                    throw Error("[brooder] can not find option with name of " + optionName + ",is not in the packet of " + module.getPacketName(optionName));
                                }
                            }
                        }
                    });
                } else {
                    fn && fn(a);
                }
            } else {
                fn && fn(null);
            }
        }
    };
    var viewevent = function (target, type, data) {
        this.target = target;
        this.data = data;
        this.type = type;
        this._goon = true;
        this.currentTarget = null;
    };
    viewevent.prototype.clone = function () {
        return brooder.extend(new viewevnet(), this);
    };
    viewevent.prototype.stopPropagation = function () {
        this._goon = false;
    };
    module.add({
        name: "view",
        packet: "",
        option: {
        },
        parentView: null,
        init: null,
        onbeforeinit: null,
        onendinit: null,
        onunload: brooder.nfn,
        onimportoptionstart: brooder.nfn,
        onimportoptionend: brooder.nfn,
        getId: function () {
            return this.dom.dataset("viewId");
        },
        postData: function (ops) {
            ops["dataType"] = "json";
            brooder.ajax(ops).done(function (a) {
                if (a.code && a.code === "1") {
                    ops.back && ops.back(a.data);
                } else {
                    ops.dataerror && ops.dataerror(a);
                }
            }).fail(function (a) {
                ops.neterror && ops.neterror();
            });
        },
        triggerEvent: function (e) {
            e.currentTarget = this;
            if (this._handlers[e.type]) {
                return this._handlers[e.type].call(this, e);
            } else {
                if (this["event_" + e.type]) {
                    return this["event_" + e.type].call(this, e);
                } else {
                    return true;
                }
            }
        },
        initEvent: function (type, data) {
            var e = new viewevent(this, type, data);
            return e;
        },
        dispatchEvent: function (type, data, isdefault) {
            isdefault = isdefault === undefined ? true : isdefault;
            var event = new viewevent(this, type, data);
            if (isdefault === true) {
                var i = this;
                while (i) {
                    i.triggerEvent(event);
                    if (event._goon) {
                        i = i["parentView"];
                    } else {
                        break;
                    }
                }
            } else {
                this.triggerEvent(event);
                if (this.typeOf("viewgroup")) {
                    if (this.oninterceptevent() !== false) {
                        this.forEach(function (a) {
                            this.dispatchEvent(type, data, false);
                            if (!event._goon) {
                                return false;
                            }
                        });
                    }
                }
            }
        },
        addEventListener: function (type, fn) {
            this._handlers[type] = fn;
            return this;
        },
        removeEventListener: function (type, fn) {
            this._handlers[type] = null;
            return this;
        },
        remove: function () {
            this.dom.remove();
        },
        render: function (fn) {
            if (!this.dom.data("-view-")) {
                var optionName = this.dom.dataset("option"), ths = this;
                this._handlers = [];
                option.get(optionName, function (ops) {
                    ths.dom.data("-view-", ths);
                    if (ops) {
                        for (var i in ops) {
                            if (i !== "name") {
                                ths.option[i] = ops[i];
                            }
                        }
                    }
                    for (var i in ths.option.override) {
                        if (!/^(dom)|^(option)|^(name)|^(extend)|^(init)/.test(i)) {
                            ths[i] = ths.option.override[i];
                        }
                    }
                    ths["name"] = ths.type();
                    ths["shortname"] = ths.shortName();
                    if (typeof ths.onbeforeinit === 'function') {
                        try {
                            ths.onbeforeinit(ths.option);
                        } catch (e) {
                            console.error("[brooder] onbeforeinit called error with module of " + ths.type() + " Message:" + e.message);
                        }
                    }
                    if (typeof ths.init === 'function') {
                        try {
                            if (ths.className && ths.className !== "") {
                                ths.dom.addClass(ths.className);
                            }
                            ths.init(ths.option);
                        } catch (e) {
                            console.error("[brooder] init called error with module of " + ths.type() + " Message:" + e.stack);
                        }
                    }
                    if (typeof ths.onendinit === 'function') {
                        try {
                            ths.onendinit(ths.option);
                        } catch (e) {
                            console.error("[brooder] onendinit called error with module of " + ths.type() + " Message:" + e.message);
                        }
                    }
                    fn && fn();
                }, function (a) {
                    if (typeof ths.onimportoptionstart === 'function') {
                        try {
                            ths.onimportoptionstart.call(ths, a);
                        } catch (e) {
                            console.error("[brooder] onimportoptionstart called error with module of " + ths.type() + " Message:" + e.stack);
                        }
                    }
                }, function (a) {
                    if (typeof ths.onimportoptionend === 'function') {
                        try {
                            ths.onimportoptionend.call(ths, a);
                        } catch (e) {
                            console.error("[brooder] onimportoptionend called error with module of " + ths.type() + " Message:" + e.stack);
                        }
                    }
                });
            }
            return this;
        },
        clean: function () {
            try {
                this.onunload();
            } catch (e) {
                console.error("[brooder] onunload called error with module of " + this.type() + " Message:" + e.stack);
            }
            var parentview = this.parentView;
            if (parentview && parentview.children) {
                var c = parentview.children.indexOf(this);
                if (c !== -1) {
                    parentview.children.splice(c, 1);
                }
            }
            for (var i in this) {
                this[i] = null;
            }
        },
        original: function (methods, paras) {
            var a = Object.getPrototypeOf(this)[methods];
            if (brooder.is.isFunction(a)) {
                var b = Array.prototype.slice.call(arguments);
                b.splice(1, 1);
                return a.apply(this, b);
            } else {
                return a;
            }
        }
    });
    module.add({
        name: "viewgroup",
        packet: "",
        extend: ["view"],
        option: {},
        layout: null,
        onsetlayout: null,
        ondomready: null,
        onoption: null,
        oninterceptevent: null,
        onimportstart: null,
        onimportend: null,
        oninitchild: null,
        render: function (fn) {
            if (!this.dom.data("-view-")) {
                this._handlers = {};
                this.children = [];
                var ths = this, optionName = this.dom.dataset("option"), queue = brooder.queue();
                option.get(optionName, function (ops) {
                    if (ops) {
                        for (var i in ops.override) {
                            if (!/^(dom)|^(option)|^(name)|^(extend)|^(init)/.test(i)) {
                                ths[i] = ops.override[i];
                            }
                        }
                        for (var i in ops) {
                            if (i !== "name" && i !== "override") {
                                ths.option[i] = ops[i];
                            }
                        }
                    }
                    if (typeof ths.onbeforeinit === 'function') {
                        try {
                            ths.onbeforeinit(ths.option);
                        } catch (e) {
                            console.error("[brooder] onbeforeinit called error with module of " + ths.type() + " Message:" + e.stack);
                        }
                    }
                    if (ths.layout && ths.layout !== "") {
                        var str = ths.layout;
                        if (typeof ths.onsetlayout === 'function') {
                            try {
                                str = ths.onsetlayout(ths.layout);
                            } catch (e) {
                                str = "";
                                console.error("[brooder] onsetlayout called error with module of " + ths.type() + " Message:" + e.stack);
                            }
                        }
                        if (brooder.is.isString(str)) {
                            try {
                                var code = brooder.template().code(str);
                                str = (new Function("data", "module", code))({
                                    id: ths.getId(), option: ths.option
                                }, function (type, option, id) {
                                    var prps = ths.__adapt__._factory.mapping[type].prototype;
                                    return "<" + prps.tagName + " class='" + prps.fullClassName + "' data-parent-view='" + ths.getId() + "' data-view='" + type + "' data-view-id='" + (id || "") + "' data-option='" + (option || "") + "'></" + prps.tagName + ">";
                                });
                            } catch (e) {
                                console.error("[brooder] parse layout called error with module of " + ths.type() + " Message:" + e.stack);
                                str = "";
                            }
                        } else {
                            str = "[empty layout]";
                        }
                        ths.layout = str;
                        ths.dom.html(str);
                    } else if (ths.layout === "") {
                        ths.dom.empty();
                    }
                    if (typeof ths.ondomready === 'function') {
                        try {
                            ths.ondomready(ths.option);
                        } catch (e) {
                            console.error("[brooder] ondomready called error with module of " + ths.type() + " Message:" + e.stack);
                        }
                    }
                    queue.complete(function (a) {
                        a.dom.data("-view-", a);
                        a["name"] = a.type();
                        a["shortname"] = a.shortName();
                        if (typeof a.init === 'function') {
                            try {
                                if (a.className && a.className !== "") {
                                    a.dom.addClass(a.className);
                                }
                                a.init(a.option);
                            } catch (e) {
                                console.error("[brooder] init called error with module of " + ths.type() + " Message:" + e.stack);
                            }
                        }
                        if (typeof a.onendinit === 'function') {
                            try {
                                a.onendinit(a.option);
                            } catch (e) {
                                console.error("[brooder] onendinit called error with module of " + ths.type() + " Message:" + e.stack);
                            }
                        }
                        fn && fn();
                    });
                    ths.dom.find("*[data-parent-view='" + ths.getId() + "']").each(function () {
                        queue.add(function (aa, dom) {
                            var que = this;
                            var ops = {}, subview = dom.dataset("view"), subid = dom.dataset("viewId");
                            if (aa.oninitchild) {
                                try {
                                    aa.oninitchild({id: subid, type: subview});
                                } catch (e) {
                                    console.error("[brooder] oninitchild called error with module of " + ths.type() + " Message:" + e.stack);
                                }
                            }
                            module.get(subview, null, function (k) {
                                for (var i = k.__adapt__._extendslink.length - 1; i >= 0; i--) {
                                    brooder.extend(ops, aa.option[k.__adapt__._extendslink[i]]);
                                }
                                brooder.extend(ops, aa.option[subid]);
                                var tops = null;
                                if (typeof aa.onoption === 'function') {
                                    try {
                                        tops = aa.onoption.call(aa, ops, subview, subid);
                                        brooder.extend(ops, tops);
                                    } catch (e) {
                                        console.error("[brooder] onoption called error with module of " + ths.type() + " Message:" + e.stack);
                                    }
                                }
                                brooder.extend(k.option, ops);
                                if (!dom.data("-view-")) {
                                    var obj = k;
                                    obj.dom = dom;
                                    obj.parentView = aa;
                                    aa.children.push(obj);
                                    obj.render(function () {
                                        que.next(aa);
                                    });
                                } else {
                                    que.next(aa);
                                }
                            }, function (a) {
                                if (typeof aa.onimportstart === 'function') {
                                    try {
                                        aa.onimportstart.call(aa, a);
                                    } catch (e) {
                                        console.error("[brooder] onimportstart called error with module of " + ths.type() + " Message:" + e.stack);
                                    }
                                }
                            }, function (a) {
                                if (typeof aa.onimportend === 'function') {
                                    try {
                                        aa.onimportend.call(aa, a);
                                    } catch (e) {
                                        console.error("[brooder] onimportend called error with module of " + ths.type() + " Message:" + e.stack);
                                    }
                                }
                            });
                        }, function () {
                            this.next(ths);
                        }, brooder(this));
                    });
                    queue.run(ths);
                }, function (a) {
                    if (typeof ths.onimportoptionstart === 'function') {
                        try {
                            ths.onimportoptionstart.call(ths, a);
                        } catch (e) {
                            console.error("[brooder] onimportoptionstart called error with module of " + ths.type() + " Message:" + e.stack);
                        }
                    }
                }, function (a) {
                    if (typeof ths.onimportoptionend === 'function') {
                        try {
                            ths.onimportoptionend.call(ths, a);
                        } catch (e) {
                            console.error("[brooder] onimportoptionend called error with module of " + ths.type() + " Message:" + e.stack);
                        }
                    }
                });
            }
            return this;
        },
        parentViews: function (level) {
            level = brooder.is.isAvalid(level) ? (brooder.is.isNumber(level) ? level : parseInt(level)) : 0;
            var b = this.parentView, c = level - 1;
            while (b && c > 0) {
                c--;
                b = b.parentView;
            }
            return b;
        },
        previousSibling: function () {
            if (this.parentView) {
                var a = this.parentView.children.indexOf(this);
                if (a !== 0) {
                    return this.parentView.children[a - 1];
                } else {
                    return null;
                }
            } else {
                return null;
            }
        },
        nextSibling: function () {
            if (this.parentView) {
                var a = this.parentView.children.indexOf(this);
                if (a + 1 < this.parentView.children.length) {
                    return this.parentView.children[a + 1];
                } else {
                    return null;
                }
            } else {
                return null;
            }
        },
        getChildrenByType: function (type) {
            var r = [];
            for (var i = 0; i < this.children.length; i++) {
                if (this.children[i].typeOf(type)) {
                    r.push(this.children[i]);
                }
            }
            return r;
        },
        getChildById: function (id) {
            var r = null;
            for (var i = 0; i < this.children.length; i++) {
                if (this.children[i].getId() === id) {
                    r = this.children[i];
                    break;
                }
            }
            return r;
        },
        getChildAt: function (index) {
            if (brooder.is.isNumber(index) && index >= 0 && index < this.children.length) {
                return this.children[index];
            } else {
                return null;
            }
        },
        childEach: function (fn) {
            for (var i = 0; i < this.children.length; i++) {
                if (fn) {
                    if (fn.call(this.children[i], i, this.children[i], this.children) === false) {
                        break;
                    }
                } else {
                    break;
                }
            }
        },
        contains: function (view) {
            return this.children.indexOf(view) !== -1;
        },
        getFirstChild: function (type) {
            if (brooder.is.isAvalid(type)) {
                return this.getChildrenByType(type)[0];
            } else {
                return this.children[0];
            }
        },
        getLastChild: function (type) {
            var r = null;
            if (brooder.is.isAvalid(type)) {
                var a = this.getChildrenByType(type);
                if (a.length > 0) {
                    r = a[a.length - 1];
                }
            } else {
                this.children.length > 0 && (r = this.children[this.children.length - 1]);
            }
            return r;
        },
        getChildIndex: function (view) {
            return this.children.indexOf(view);
        },
        addChild: function (option) {
            var ths = this, ops = brooder.extend({type: null,
                option: "",
                parameters: null,
                id: this.getId() + "-" + this.children.length,
                container: "body",
                fn: brooder.nfn
            }, option);
            if (ops.container.isWrapper && !ops.container.isWrapper()) {
                ops.container = "body";
            }
            if (ops.type && brooder.is.isString(ops.type) && ops.type !== "") {
                module.get(ops.type, null, function (sobj) {
                    ths.children.push(sobj);
                    var cln = sobj.__adapt__._factory.mapping[sobj.__adapt__._type].prototype.fullClassName;
                    var coner = brooder(ops.container);
//                    console.log(ths.dom.get(0).contains(coner.get(0)));
                    sobj.dom = brooder("<" + sobj.tagName + " class='" + cln + "' data-parent-view='" + ths.getId() + "' data-view='" + ops.type + "' data-view-id='" + ops.id + "' data-option='" + (is.isObject(ops.option) ? "" : ops.option) + "'></" + sobj.tagName + ">").appendTo(coner);
                    var opss = {};
                    for (var i = sobj.__adapt__._extendslink.length - 1; i >= 0; i--) {
                        brooder.extend(opss, ths.option[sobj.__adapt__._extendslink[i]]);
                    }
                    brooder.extend(opss, sobj.__adapt__._option, ths.option[ops.id], ths.option[ops.type]);
                    if (is.isObject(ops.option)) {
                        sobj.option = brooder.extend(opss, ops.option);
                    }
                    if (!ths.dom.contain(sobj.dom)) {
                        sobj.___outer___ = true;
                    }
                    sobj.option = opss;
                    sobj.parameters = ops.parameters;
                    sobj.parentView = ths;
                    sobj.render(function () {
                        ops.fn && ops.fn.call(sobj);
                    });
                }, function (a) {
                    if (typeof ths.onimportstart === 'function') {
                        try {
                            ths.onimportstart.call(ths, a);
                        } catch (e) {
                            console.error("[brooder] onimportstart called error with module of " + ths.type() + " [" + e.message + "]");
                        }
                    }
                }, function (a) {
                    if (typeof ths.onimportend === 'function') {
                        try {
                            ths.onimportend.call(ths, a);
                        } catch (e) {
                            console.error("[brooder] onimportend called error with module of " + ths.type() + " [" + e.message + "]");
                        }
                    }
                });
            }
        },
        removeChild: function (id) {
            var a = this.getChildById(id);
            a && a.remove();
            return this;
        },
        removeChildAt: function (index) {
            if (brooder.is.isNumber(index) && index > 0 && index < this.children.length) {
                this.children[index].remove();
            }
            return this;
        },
        removeAllChild: function () {
            while (this.children.length > 0) {
                this.children.pop().remove();
            }
            return this;
        },
        clean: function () {
            var outers = [];
            for (var i in this.children) {
                if (this.children[i].___outer___) {
                    outers.push(this.children[i]);
                }
            }
            while (outers.length > 0) {
                outers.pop().remove();
            }
            try {
                this.onunload();
            } catch (e) {
                console.error("[brooder] onunload called error with module of " + this.type() + " Message:" + e.stack);
            }
            var parentview = this.parentView;
            if (parentview && parentview.children) {
                var c = parentview.children.indexOf(this);
                if (c !== -1) {
                    parentview.children.splice(c, 1);
                }
            }
            for (var i in this) {
                this[i] = null;
            }
        }
    });
    module.add({
        name: "root",
        packet: "",
        extend: ["viewgroup"],
        className: "root",
        option: {
            packets: []
        },
        init: function () {
            console.log("[brooder] root view init.");
        },
        oninitimportstart: brooder.nfn,
        oninitimportprogress: brooder.nfn,
        oninitimportend: brooder.nfn,
        importPackets: function () {
            if (this.option.override) {
                for (var i in this.option.override) {
                    if (!/^(dom)|^(option)|^(name)|^(extend)|^(init)/.test(i)) {
                        this[i] = this.option.override[i];
                    }
                }
                this.option.override = null;
            }
            var a = [];
            for (var i = 0; i < module.basemapping.basicPackets.length; i++) {
                a.push(module.basemapping.basicPackets[i]);
            }
            if (brooder.is.isArray(this.option.packets)) {
                for (var i = 0; i < this.option.packets.length; i++) {
                    a.push(this.option.packets[i]);
                }
            }
            if (a.length > 0) {
                var queue = brooder.queue(), ths = this;
                queue.complete(function () {
                    ths.oninitimportend.call(ths);
                    ths.render();
                }).progress(function (a) {
                    ths.oninitimportprogress.call(ths, a);
                });
                for (var i = 0; i < a.length; i++) {
                    queue.add(function (a, b) {
                        var ths = this;
                        brooder.packet({
                            basepath: module.basemapping.basePath,
                            packetName: b,
                            back: function () {
                                ths.next();
                            }
                        });
                    }, null, a[i]);
                }
                ths.oninitimportstart.call(ths);
                queue.run();
            } else {
                this.render();
            }
        }
    });

    brooder.overrideView = function (obj) {
        var view = module.factory.get("view");
        var group = module.factory.get("viewgroup");
        var root = module.factory.get("root");
        for (var i in obj) {
            if (i !== "init" && i !== "option" && i !== "extend") {
                view.prototype[i] = obj[i];
                group.prototype[i] = obj[i];
                root.prototype[i] = obj[i];
            }
        }
    };
    brooder.overrideViewGroup = function (obj) {
        var group = module.factory.get("viewgroup");
        for (var i in obj) {
            if (i !== "init" && i !== "option" && i !== "extend") {
                group.prototype[i] = obj[i];
            }
        }
    };
    brooder.overrideRoot = function (obj) {
        var group = module.factory.get("root");
        for (var i in obj) {
            if (i !== "init" && i !== "option" && i !== "extend") {
                group.prototype[i] = obj[i];
            }
        }
    };
    brooder.Option = function (optionx, filter, newset) {
        if (brooder.is.isString(optionx)) {
            var a = option.has(optionx) || null;
            if (a) {
                var b = brooder.extend(json.clone(a), {}), c = {};
                if (filter && is.isArray(filter) && filter.length > 0) {
                    for (var i = 0; i < filter.length; i++) {
                        c[filter[i]] = b[filter[i]];
                    }
                } else {
                    c = b;
                }
                brooder.extend(c, newset);
                return c;
            } else {
                return null;
            }
        } else {
            if (brooder.___info) {
                optionx.name = (brooder.___info.packet ? brooder.___info.packet + "." : "") + optionx.name;
            }
            option.add(optionx);
        }
    };
    brooder.Module = function (obj) {
        if (brooder.___info) {
            obj.packet = brooder.___info.packet;
        }
        module.add(obj);
    };
    brooder.Boot = function (optionx, option) {
        var ops = {
            basePath: ""
        };
        brooder.extend(module.basemapping, ops, optionx);
        var root = brooder("*[data-view='root']");
        if (root.length > 0) {
            module.getViewInstance(root, option, function (a) {
                a.importPackets();
            });
        } else {
            throw Error("[brooder boot] can not find the root element.");
        }
    };
    brooder.fn.Boot = function (option, optionName) {
        if (is.isString(optionName)) {
            this.dataset("view", "root").dataset("viewId", "root").dataset("option", optionName);
            brooder.Boot(option);
        } else {
            this.dataset("view", "root").dataset("viewId", "root").dataset("option", "");
            brooder.Boot(option, optionName);
        }
        return this;
    };
    brooder.fn.getModule = function () {
        return this.data("-view-");
    };
    brooder.fn.predefined = function (name, args) {
        var a = brooder.fn[name];
        if (a) {
            var b = Array.prototype.slice.call(arguments);
            b.splice(0, 1);
            return a.call(this, b);
        } else {
            return this;
        }
    };
    var _override = {};
    brooder.override = function (name, obj) {
        if (is.isString(name)) {
            if (is.isObject(obj)) {
                if (!_override[name]) {
                    _override[name] = brooder.extend(new query(), obj);
                } else {
                    brooder.extend(_override[name], obj);
                }
            }
        }
    };
    brooder.toggle = function (name) {
        if (is.isString(name)) {
            _override[name] && (dom.prototype = _override[name]);
        } else {
            dom.prototype = new query();
        }
    };
    window.brooder = brooder;
    window.$ = brooder;
    brooder.debug = {
        modules: module.factory, options: option.options,
        packets: packetmapping
    };
    brooder.about.print();
})(jQuery);