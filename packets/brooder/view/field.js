/*!
 * @packet brooder.view.field;
 * @require brooder.view.form;
 */
Module({
    name: "text",
    extend: "@form.field",
    option: {
        label: "text-label",
        isflex: false,
        isblock: true,
        inputType: "text", //text|textarea|password
        reg: "any",
        value: "",
        max: 2000,
        min: 0,
        width: null,
        disabled: false,
        desc: "",
        hook: null
    },
    init: function (option) {
        var ths = this;
        if (this.option.type === "hidden") {
            this.dom.hide();
        }
        var str = "";
        if (option.label && option.label !== "") {
            str += "<div class='" + (option.isblock ? "label-block" : "label") + "'>" + option.label + "</div>";
        }
        str += "<input" + (option.width ? " style='width:" + option.width + "px'" : "") + " type='" + option.inputType + "'" + (option.disabled ? " disabled" : "") + (option.value && option.value !== "" ? " value='" + option.value + "'" : "") + "/>";
        if (option.desc && option.desc !== "") {
            str += "<div class='" + (option.isblock ? "block" : "inline") + "'>" + option.desc + "</div>";
        }
        if (option.isflex) {
            this.dom.addClass("flex").width("100%");
        }
        this.input = this.dom.html(str).find("input");
        this.input.bind("keyup", function () {
            ths.check();
        });
    },
    reg: {
        email: [/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, "请输入正确的email地址"],
        number: [/^[0-9]*$/, "请输入数字"],
        int: [/^\+?[1-9][0-9]*$/, "非零正整数"],
        unint: [/^\-[1-9][0-9]*$/, "非零负整数"],
        intwith: [/^\d+$/, "正整数 + 0"],
        unintwith: [/^((-\d+)|(0+))$/, "负整数 + 0"],
        en: [/^[A-Za-z]+$/, "26个英文字母组成的字符串"],
        enupper: [/^[A-Z]+$/, "26个大写英文字母组成的字符串"],
        enlower: [/^[a-z]+$/, "26个小写英文字母组成的字符串"],
        words: [/^[A-Za-z0-9]+$/, "数字和26个英文字母组成的字符串"],
        simplewords: [/^\w+$/, "数字、26个英文字母或者下划线"],
        username: [/^[\一\?-Za-z0-9-_]*$/, "中英文，数字，下划线，减号"],
        password: [/^[a-zA-Z]\w{5,17}$/, "以字母开头，长度在6-18之间，只能包含字符、数字和下划线"],
        nospecial: [/^([\u4e00-\u9fa5-a-zA-Z0-9]+)$/, "不能输入特殊字符！"],
        any: [/^.*$/, ""]
    },
    showTip: function (mes) {
        var k = this.input;
        if (this.dom.find(".tip").length <= 0) {
            k.before("<div class='tip" + (this.option.isblock ? " right" : "") + "'></div>");
        }
        this.dom.find(".tip").html(mes);
    },
    hideTip: function () {
        this.dom.find(".tip").remove();
    },
    check: function () {
        var result = false;
        if (!this.customCheck) {
            result = this.checkLength();
            if (!result) {
                this.showTip("长度应该大于" + this.option.min + "小于" + this.option.max);
                return false;
            } else {
                this.hideTip();
            }
            result = this.checkRegular();
            if (!result) {
                this.showTip(this.reg[this.option.reg][1] || "格式不正确");
                return false;
            } else {
                this.hideTip();
            }
            result = this.checkRequired();
            if (!result) {
                this.showTip("必填选项");
                return false;
            } else {
                this.hideTip();
            }
            return true;
        } else {
            return this.customCheck.call(this);
        }
    },
    checkDefault: function () {
        result = this.checkLength();
        if (!result) {
            this.showTip("长度应该大于" + this.option.min + "小于" + this.option.max);
            return false;
        }
        result = this.checkRegular();
        if (!result) {
            this.showTip(this.reg[this.option.reg][1] || "格式不正确");
            return false;
        }
        result = this.checkRequired();
        if (!result) {
            this.showTip("必填选项");
            return false;
        }
        return true;
    },
    checkRequired: function () {
        var value = this.input.val();
        if (this.option.required) {
            if (value.length > 0) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    },
    checkRemote: function (url, paraName) {
        var data = {}, result = false;
        data[paraName] = this.input.val();
        $.ajax({
            url: url,
            data: data,
            dataType: "json",
            asysn: false,
            success: function (e) {
                if (e.code === "1") {
                    result = true;
                } else {
                    result = false;
                }
            },
            error: function () {
                result = false;
            }
        });
        return result;
    },
    checkLength: function (a, b) {
        var value = this.input.val();
        if (arguments.length === 0) {
            return value.length >= this.option.min && value.length <= this.option.max;
        } else if (arguments.length === 2) {
            return value.length >= a && value.length <= b;
        } else {
            return false;
        }
    },
    checkRegular: function (reg) {
        var value = this.input.val();
        if (arguments.length === 0) {
            reg = this.option.reg;
        }
        if ($.util.isString(reg)) {
            var regx = this.reg[reg][0];
            if (regx) {
                return regx.test(value);
            } else {
                return false;
            }
        } else if (reg instanceof RegExp) {
            return reg.test(value);
        } else {
            return false;
        }
    },
    setValue: function (a) {
        if (this.option.hook) {
            this.input.val(this.option.hook(a));
        } else {
            this.input.val(a);
        }
        this.value = a;
    },
    getValue: function () {
        return {
            name: this.option.name,
            value: this.input.val()
        };
    },
    disable: function (isdisable) {
        if (isdisable) {
            this.input.get(0).disabled = true;
        } else {
            this.input.get(0).disabled = false;
        }
        return this;
    },
    reset: function () {
        this.wrap.removeClass("error");
        this.setValue(this.value);
    }
});
Module({
    name: "select",
    extend: "@form.field",
    option: {
        name: "",
        url: "",
        label: "",
        paraname: "",
        isload: false,
        next: "",
        value: "",
        defaults: []
    },
    init: function (option) {
        var ths = this;
        this.value = this.option.value;
        this.select = this.dom.html((option.label === "" ? "" : "<div class='label'>" + option.label + ":</div>") + "<select></select>").find("select");
        if (option.isload) {
            this.loadData();
        } else {
            var str = "";
            for (var i in option.defaults) {
                str += "<option value='" + option.defaults[i].value + "'>" + option.defaults[i].key + "</option>";
            }
            this.select.html(str);
        }
        this.select.bind("change", function () {
            ths.dispatchEvent("selectchange", {
                value: ths.select.val(),
                next: ths.option.next
            });
        });
    },
    loadData: function (para) {
        this.select.get(0).disabled = true;
        var par = {}, ths = this;
        par[this.option.paraname] = para;
        this.postData({
            url: this.option.url,
            data: par,
            back: function (data) {
                ths.select.get(0).disabled = false;
                var str = "";
                for (var i in ths.option.defaults) {
                    str += "<option value='" + ths.option.defaults[i].value + "'>" + ths.option.defaults[i].key + "</option>";
                }
                for (var t in data) {
                    str += "<option" + (ths.value === data[t].value + "" ? " selected='selected'" : "") + " value='" + data[t].value + "'>" + data[t].key + "</option>";
                }
                ths.select.html(str);
                ths.dispatchEvent("selectchange", {
                    value: ths.select.val(),
                    next: ths.option.next
                });
            }
        });
    },
    getValue: function () {
        return {
            name: this.option.name,
            value: this.select.val()
        };
    },
    setValue: function (val) {
        this.value = val;
        this.parameters = val;
        this.select.children().each(function () {
            if ($(this).attr("value") === val + "") {
                $(this).get(0).selected = "selected";
                return false;
            }
        });
    },
    reset: function () {
        var val = this.value;
        if (this.value === null || this.value === "") {
            this.select.children().get(0).selected = "selected";
        } else {
            this.select.children().each(function () {
                if ($(this).attr("value") === val + "") {
                    $(this).get(0).selected = "selected";
                    return false;
                }
            });

        }
    }
});

Module({
    name: "selectgroup",
    extend: "@form.field",
    option: {
        label: "selectgroup",
        selects: []
    },
    layout: "<div class='form-label'><%=data.option.label;%>:</div><%for(var i in data.option.selects){%>" +
            "<div view-<%=data.id;%>='select' viewid='v<%=i;%>'></div>" +
            "<%}%>",
    init: function () {
    },
    option_select: function (option, id) {
        return this.option.selects[id.substring(1, id.length)];
    },
    event_selectchange: function (e) {
        var next = e.data.next, value = e.data.value, ths = this;
        this.viewEach(function () {
            if (this.option.name === next) {
                this.loadData(value);
            }
        });
        e.stop();
    },
    getValue: function () {
        return this.getValues();
    },
    setValue: function (a) {
        this.value = a;
        this.getFirstView("select").setValue(a);
    },
    reset: function () {
        this.getFirstView("select").reset();
    }
});
Module({
    name: "radiogroup",
    extend: "@form.field",
    option: {
        label: "radio",
        value: "",
        radios: [
            {key: "xxxx", value: "xx"}
        ]
    },
    init: function (option) {
        this.value = this.option.value;
        var str = "<div class='label'>" + option.label + ":</div>", dot = Math.round(Math.random(1) * 1000000000);
        for (var i in option.radios) {
            str += "<div class='radio'><div class='radio-btn'><input" + (option.radios[i].value === option.value + "" ? " checked='checked'" : "") + " type='radio' name='" + dot + "' value='" + option.radios[i].value + "'/></div>" +
                    "<div class='radio-text'>" + option.radios[i].key + "</div>";
        }
        str += "</div>";
        this.dom.html(str);
        if (option.value === "") {
            this.dom.find("input[type='radio']").get(0).checked = true;
        }
    },
    getValue: function () {
        var k = null;
        this.dom.find("input").each(function () {
            if ($(this).get(0).checked) {
                k = $(this).attr("value");
                return false;
            }
        });
        return {
            name: this.option.name,
            value: k
        };
    },
    setValue: function (a) {
        this.value = a;
        this.dom.find("input").each(function () {
            if ($(this).attr("value") === a + "") {
                $(this).get(0).checked = true;
            } else {
                $(this).get(0).checked = false;
            }
        });
    },
    reset: function () {
        var a = this.value;
        if (a === null || a + "" === "") {
            this.dom.find("input").get(0).checked = true;
        } else {

            this.dom.find("input").each(function () {
                if ($(this).attr("value") === a + "") {
                    $(this).get(0).checked = true;
                } else {
                    $(this).get(0).checked = false;
                }
            });

        }
    }
});
Module({
    name: "checkboxgroup",
    extend: "@form.field",
    option: {
        label: "checkboxgroup",
        value: "xx",
        checkboxs: [
            {key: "xxxx", value: "xx"}
        ]
    },
    init: function (option) {
        var str = "<div class='form-label'>" + option.label + ":</div>";
        for (var i in option.checkboxs) {
            str += "<div class='checkbox'><div class='checkbox-btn'><input type='checkbox' value='" + option.checkboxs[i].value + "'/></div>" +
                    "<div class='checkbox-text'>" + option.checkboxs[i].key + "</div></div>";
        }
        str += "</div>";
        this.dom.html(str);
        if (this.option.value !== "") {
            var values = this.option.value.split(",");
            for (var i in values) {
                var k = this.dom.find("input[value='" + values[i] + "']");
                if (k.length > 0) {
                    k.get(0).checked = true;
                }
            }
        }
    },
    getValue: function () {
        var val = "";
        this.dom.find("input[type='checkbox']").each(function () {
            if ($(this).get(0).checked) {
                val += $(this).attr("value") + ",";
            }
        });
        if (val.length > 0) {
            val = val.substring(0, val.length - 1);
        }
        return {
            name: this.option.name,
            value: val
        };
    },
    setValue: function (a) {
        this.value = a;
        var values = a.split(",");
        for (var i in values) {
            var k = this.dom.find("input[value='" + values[i] + "']");
            if (k.length > 0) {
                k.get(0).checked = true;
            }
        }
        return this;
    },
    reset: function () {
        var a = this.value;
        var values = a.split(",");
        for (var i in values) {
            var k = this.dom.find("input[value='" + values[i] + "']");
            if (k.length > 0) {
                k.get(0).checked = true;
            }
        }
    }
});
Module({
    name: "describ",
    extend: "view",
    option: {
        text: "describ"
    },
    init: function (option) {
        this.dom.html("<div>" + option.text + "</div>");
    }
});

Module({
    name:"fgroup",
    extend:"@form.field",
    option:{
        inner:""
    },
    init:function(){}
});