/*!
 * @packet brooder.view.form;
 */
Module({
    name: "Afieldgroup",
    extend: "viewgroup",
    getViewByName: function (name) {
        var a = null;
        this.viewEach(function () {
            if (this.option.name === name) {
                a = this;
                return false;
            }
        });
        return a;
    },
    setViewValueByName: function (name, value) {
        this.viewEach(function () {
            if (this.option.name === name) {
                this.setValue(value);
                return false;
            }
        });
    },
    check: function () {
        var a = true, field = null;
        this.viewEach(function () {
            if (this.typeOf("Afield")) {
                a = this.check();
                field = this;
                return a;
            }
        });
        if (a) {
            if (this.customCheck) {
                a = this.customCheck.call(this);
            }
        }
        if (!a) {
            this.dispatchEvent("field_error", {
                field: field
            });
        }
        return a;
    },
    customCheck: null,
    reset: function () {
        this.viewEach(function () {
            if (this.typeOf("Afield")) {
                this.reset();
            }
        });
    },
    disable: function () {
        this.viewEach(function () {
            if (this.typeOf("Afield")) {
                this.disable();
            }
        });
    },
    getValues: function () {
        var vals = {};
        this.viewEach(function () {
            if (this.typeOf("Afield")) {
                if (this.typeOf("fieldgroup")) {
                    var valsx = this.getValue();
                    if (valsx) {
                        for (var i in valsx) {
                            vals[valsx[i].name] = valsx[i].value;
                        }
                    }
                } else {
                    var c = this.getValue();
                    if (c) {
                        vals[c.name] = c.value;
                    }
                }
            }
        });
        return vals;
    },
    setValues: function (obj) {
        if (obj) {
            this.viewEach(function () {
                if (this.typeOf("Afield")) {
                    var k = obj[this.option.name];
                    if (k || k === 0) {
                        this.setValue(obj[this.option.name]);
                    }
                }
            });
        }
    }
});
Module({
    name: "form",
    extend: "@.Afieldgroup",
    getValuesMapping: function () {
        var mapping = [];
        this.viewEach(function () {
            if (this.typeOf("Aasys")) {
                mapping.push({
                    type: "asys",
                    obj: this
                });
            } else if (this.typeOf("fieldgroup")) {
                var val = {}, vals = this.getValue();
                if (vals) {
                    for (var i in vals) {
                        mapping.push({
                            type: "simple",
                            data: vals[i]
                        });
                    }
                }
            } else if (this.typeOf("field")) {
                var bc = this.getValue();
                if (bc) {
                    mapping.push({
                        type: "simple",
                        data: bc
                    });
                }
            }
        });
        return mapping;
    },
    submit: function (mapping) {
        if (this.check()) {
            var loadingHold = this.loadingHold(), queue = $.queue(), ths = this;
            var map = {
                start: function () {
                    loadingHold.setText("<i class='fa fa-refresh fa-spin'></i>共有" + queue.last() + "个任务需要处理");
                },
                progress: function (e) {
                    loadingHold.setText("<i class='fa fa-refresh fa-spin'></i>共有个" + e.total + "任务正在处理" + (e.runed) + "个任务");
                },
                complete: function () {
                    loadingHold.setText("<i class='fa fa-check'></i>任务处理完成");
                    loadingHold.close();
                    ths.dispatchEvent("data_refresh");
                    ths.dispatchEvent("formwindow_close");
                },
                error: function (a, e) {
                    var b = "";
                    if (e.msg && e.msg !== "") {
                        b = e.msg;
                    } else {
                        if (a === 1) {
                            b = "任务处理发生异常";
                        } else {
                            b = "任务处理发生数据错误";
                        }
                    }
                    loadingHold.setText("<i class='fa fa-times'></i>" + b);
                    loadingHold.close();
                },
                url: this.option.action,
                data: null
            };
            $.extend(map, mapping);
            if (!map.url) {
                map.url = this.option.action;
            }
            var a = this.getValuesMapping(), vals = {}, asys = [];
            for (var i in a) {
                if (a[i].type === "simple") {
                    vals[a[i].data.name] = a[i].data.value;
                } else {
                    asys.push({
                        obj: a[i].obj
                    });
                }
            }
            for (var i in map.data) {
                vals[i] = map.data[i];
            }
            queue.onstart(function (e) {
                map.start(e);
            }).onprogress(function (e) {
                map.progress(e);
            }).oncomplete(function (e) {
                map.complete(e);
            });
            if (!$.util.isEmptyObject(vals)) {
                queue.add(function () {
                    var que = this;
                    ths.postData({
                        url: map.url,
                        data: vals,
                        back: function () {
                            que.next();
                        },
                        dataerror: function (e) {
                            map.error(0, e);
                            que.clean();
                        },
                        neterror: function (e) {
                            map.error(1, e);
                            que.clean();
                        }
                    });
                });
            }
            for (var i in asys) {
                (function (aysfield) {
                    queue.add(function () {
                        var que = this;
                        aysfield.obj.asyssubmit(function () {
                            que.next();
                        });
                    });
                })(asys[i]);
            }
            queue.run();
        } else {
            this.toast("表单数据填写可能存在错误，无法提交任务请求", 2000);
        }
    },
    onoption: function (option, view, viewid) {
        var name = viewid.substring(1, viewid.length);
        return this.option.fields[name];
    }
});
Module({
    name: "Afield",
    option: {
        name: "",
        label: "",
        disabled: false,
        required: false
    },
    value: null,
    check: function () {
        if (this.customCheck) {
            return this.customCheck.call(this);
        } else {
            return true;
        }
    },
    customCheck: null,
    getValue: function () {
        return null;
    },
    setValue: function (a) {
        this.value = a;
        return this;
    },
    disable: function (isdisable) {
        return this;
    },
    reset: function () {
        this.setValue(this.value);
        return this;
    }
});
Module({
    name: "Aasys",
    extend: "view",
    asyssubmit: function (success, error) {
        if (success) {
            success();
        }
    }
});
Module({
    name: "field",
    extend: ["view", "@.Afield"],
    className: "field",
    option: {
    },
    getValue: function () {
        return {
            name: this.option.name,
            value: this.value
        };
    }
});
Module({
    name: "fieldgroup",
    extend: ["@.Afieldgroup", "@.Afield"],
    getValue: function () {
        return [];
    }
});
Module({
    name: "asysfield",
    extend: ["@.field", "@.Aasys"]
});
Module({
    name: "asysfieldgroup",
    extend: ["@.fieldgroup", "@.Aasys"]
});

Module({
    name: "simpleform",
    extend: "@.form",
    option: {
        colnum: 3,
        fields: [],
        btns: [{type: "submit", name: "submit"}, {type: "reset", name: "reset"}]
    },
    layout: "<div class='con'><div class='row'>" +
            "<%for(var i in data.option.fields){%>" +
            "<div class='span1-<%=data.option.colnum;%>'>" +
            "<div view-<%=data.id;%>='<%=data.option.fields[i]._type;%>' viewid='k<%=i;%>'></div>" +
            "</div>" +
            "<%}%>" +
            "</div></div>",
    init: function () {
//        this.super("init");
        this.dom.addClass("horizion");
    },
    event_simpleformreset: function (e) {
        this.reset();
        e.stop();
    }
});
Module({
    name: "listform",
    extend: "@.form",
    option: {
        url: "",
        fields: []
    },
    layout: "<%for(var i in data.option.fields){%>" +
            "<div><%=module(data.option.fields[i]._type,'','t'+i);%></div>" +
            "<%}%>",
    init: function () {
//            this.super("init");
        this.setValues(this.parameters);
    }
});
Module({
    name: "singleform",
    extend: "@.form",
    option: {
        action: "",
        fields: [
            {_type: "simpleText", name: "xx", value: "xxx"},
            {_type: "simpleText", name: "xx", value: "xxx"},
            {_type: "select", name: "xx", value: "xxx"},
            {_type: "selectgroup", name: "xx", value: "xxx", selects: [
                    {key: "xx", value: ""},
                    {key: "xx", value: ""}
                ]}
        ],
        btns: [{type: "submit", name: "submit"}, {type: "reset", name: "reset"}]
    },
    layout: "<div style='position:absolute;left:0;top:0;right:0;bottom:50px;overflow:auto;padding:10px;'>" +
            "<%for(var i in data.option.fields){%>" +
            "<div view-<%=data.id;%>='<%=data.option.fields[i]._type;%>' viewid='m<%=i;%>'></div>" +
            "<%}%>" +
            "</div>" +
            "<div style='position:absolute;left:0;right:0;bottom:0;padding:10px 10px 0 10px;border-top:1px solid #D7D7D7;'>" +
            "<div class='btn-group'>" +
            "<%for(var i in data.option.btns){%>" +
            "<div class='btn' type='<%=data.option.btns[i].type;%>'><%=data.option.btns[i].name;%></div>" +
            "<%}%>" +
            "</div>" +
            "</div>",
    init: function () {
//        this.super("init");
        this.setValues(this.parameters);
        var ths = this;
        this.dom.find(".btn").each(function () {
            $(this).click(function () {
                var type = $(this).attr("type");
                ths.dispatchEvent("singleform_" + type, ths.getValues());
            });
        });
    },
    event_singleform_submit: function (e) {
        if (this.check()) {
            this.submit();
        }
        e.stop();
    },
    event_singleform_reset: function (e) {
        this.reset();
        e.stop();
    }
});
Module({
    name: "gridform",
    extend: "@.form",
    option: {
        action: "",
        cols: 6,
        fields: [
            {_type: "text", name: "xx", value: "xxx", col: 2},
            {_type: "text", name: "xx", value: "xxx", col: 2},
            {_type: "select", name: "xx", value: "xxx", col: 2},
            {_type: "selectgroup", name: "xx", value: "xxx", selects: [
                    {key: "xx", value: ""},
                    {key: "xx", value: ""}
                ], col: 6},
            {_type: "select", name: "xx", value: "xxx", col: 2}
        ]
    },
    layout: "<div class='row'>" +
            "<%for(var i in data.option.fields){%>" +
            "<div class='span<%=data.option.fields[i].col;%>-<%=data.option.cols;%>'>" +
            "<div view-<%=data.id;%>='<%=data.option.fields[i]._type;%>' viewid='m<%=i;%>'></div>" +
            "</div>" +
            "<%}%>",
    init: function () {
//        this.super("init");
        this.setValues(this.parameters);
    }
});
Module({
    name: "freeform",
    extend: "@.form",
    option: {
        action: "",
        fields: [
            {_type: "text", name: "xx", value: "xxx"}
        ],
        btns: []
    },
    layout: "<%for(var i in data.option.fields){%>" +
            "<div view-<%=data.id;%>='<%=data.option.fields[i]._type;%>' viewid='<%=i;%>'></div>" +
            "<%}%>",
    init: function () {
//        this.super("init");
        this.setValues(this.parameters);
        this.dom.find(".btn").each(function () {
            $(this).click(function () {
                var type = $(this).attr("type");
                ths.dispatchEvent("freeform_" + type, ths.getValues());
            });
        });
    },
    onbeforeinit: function (a) {
        console.log(a);
    },
    onsetlayout: function (layout) {
        if (this.option.btns.length > 0) {
            var t = "<div style='position:absolute;left:0;top:0;right:0;bottom:50px;overflow:auto;padding:10px;'>" +
                    layout +
                    "</div>" +
                    "<div style='position:absolute;left:0;right:0;bottom:0;padding:10px 10px 0 10px;border-top:1px solid #D7D7D7;'>" +
                    "<div class='btn-group'>" +
                    "<%for(var i in data.option.btns){%>" +
                    "<div class='btn' type='<%=data.option.btns[i].type;%>'><%=data.option.btns[i].name;%></div>" +
                    "<%}%>" +
                    "</div>" +
                    "</div>";
            return t;
        } else {
            return layout;
        }
    },
    ondomready: function (a) {
        console.log(a);
        var id = this.getId();
        var ths = this;
        this.dom.find("div[viewid]").each(function () {
            var num = $(this).attr("viewid");
            var data = ths.option.fields[num];
            $(this).attr("view-" + id, data._type);
        });
    },
    onoption: function (option, view, viewid) {
        return this.option.fields[viewid];
    },
    event_freeform_submit: function (e) {
        if (this.check()) {
            this.submit();
        }
        e.stop();
    },
    event_freeform_reset: function (e) {
        this.reset();
        e.stop();
    }
});