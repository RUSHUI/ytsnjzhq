/*!
 * @packet brooder.view.group;
 * @require brooder.view.table;
 * @require brooder.view.tree;
 * @require brooder.view.form;
 * @require brooder.view.field;
 */
Module({
    name: "basegroup",
    extend: "viewgroup",
    className: "group",
    init: function () {
        this.choutiers = [];
    },
    add: function (option) {
        var ops={
            title:"Title",
            type:"",
            width:300+Math.random()*500,
            option:"",
            btns:[{type:"removeChouti",name:"close",icon:"fa fa-times"}]
        };
        $.extend(ops,option);
        var ths = this;
        if (this.dom.children(".group").length === 0) {
            this.group = $("<div class='group'></div>").appendTo(this.dom);
        }
        var a = 0;
        for (var i = this.group.children().length - 1; i >= 0; i--) {
            a += 30;
            this.group.children().eq(i).css({
                "-all-transform": "translateX(" + (-this.group.children().eq(i).width() + a) + "px)"
            });
            this.group.children().eq(i).children(".foot").hide();
        }
        var cc = "<div class='choutier' num='" + this.group.children().length + "' style='width:"+ops.width+"px;'>" +
                "<div class='head'><div class='title'>"+ops.title+"</div></div>" +
                "<div class='body'></div>" +
                "<div class='foot'>";
                for(var i in ops.btns){
                    cc+="<div class='tbtn' type='"+ops.btns[i].type+"' title='"+ops.btns[i].name+"'><i class='"+ops.btns[i].icon+"'></i></div>";
                }
                cc+="</div>" +
                "</div>";
        var c=$(cc).prependTo(this.group);
        c.find(".head").click(function () {
            ths.dispatchEvent("showit", $(this).parent());
        });
        c.find(".tbtn").each(function(){
            $(this).click(function(){
                var type=$(this).attr("type");
                ths.dispatchEvent(type,{
                    btn:$(this)
                });
            });
        });
        setTimeout(function () {
            c.css({
                "-webkit-transform": "translateX(" + a + "px)"
            });
        }, 0);
        this.addChild({
            type: ops.type,
            container: c.find(".body"),
            option:ops.option
        });
    },
    showIt: function (a) {
        var b = 0;
        for (var i = this.group.children().length - 1; i >= 0; i--) {
            if (i !== a) {
                b += 30;
            } else {
                b += this.group.children().eq(i).width();
            }
            this.group.children().eq(i).css("-all-transform", "translateX(" + (-this.group.children().eq(i).width() + b) + "px)");
        }
    },
    removeIt: function (a) {
        var b = 0, ths = this;
        for (var i = this.group.children().length - 1; i >= 0; i--) {
            b += 30;
            this.group.children().eq(i).css("-all-transform", "translateX(" + (-this.group.children().eq(i).width() + b) + "px)");
        }
        setTimeout(function () {
            ths.group.children().eq(a).remove();
            if(ths.group.children().length>0){
                ths.group.children().eq(a).children(".foot").show();
                ths.showIt(a);
            }else{
                ths.group.remove();
            }
        }, 500);
    },
    event_addChouti:function(e){
        this.add(e.data);
    },
    event_showit: function (e) {
        var a = this.group.children().length - parseInt(e.data.attr("num")) - 1;
        this.showIt(a);
    },
    event_removeit: function (e) {
        var a = this.group.children().length - parseInt(e.data.attr("num")) - 1;
        this.removeIt(a);
    },
    event_removeChouti:function(){
        var a = this.group.children().length - parseInt(this.group.children(0).attr("num")) - 1;
        this.removeIt(a);
    },
    onunload: function () {
        console.log("--44444444--%o----%o", this.type(), this.getId());
    }
});
Module({
    name: "tester",
    extend: "view",
    init: function () {
        this.dom.html("<div style='width:100px;height:100px;position:absolute;left:10px;top:10px;background:white;'></div>");
    },
    onunload: function () {
        console.log("----%o----%o", this.type(), this.getId());
    }
});
Module({
    name: "tablegroup",
    extend: "viewgroup",
    className: "tablegroup",
    option: {
        tableType: "table",
        query: true,
        form: {},
        edit: {},
        delet: {},
        add: {},
        table: {}
    },
    layout: "<div class='search'>" +
            "<div class='form'>" +
            "<div class='head'>Search</div>" +
            "<div class='body'>" +
            "<%=module('@form.listform','','form');%>" +
            "</div>" +
            "<div class='foot'><div class='tbtn nn'><i class='fa fa-plane'></i></div></div>" +
            "</div>" +
            "<div class='bar'><i class='fa fa-chevron-right'></i></div>" +
            "</div>" +
            "<div class='tablecon'>" +
            "<%=module('@table.doubleTable','','aa');%>" +
            "</div>" +
            "<div class='chouti'>" +
            "<div class='con'>" +
            "<div class='head'>edit</div>" +
            "<div class='body'>" +
            "<%=module('@form.listform','','form');%>" +
            "</div>" +
            "<div class='foot'><div class='tbtn mm'><i class='fa fa-plane'></i></div></div>" +
            "</div>" +
            "</div>",
    init: function (option) {
        var ths = this;
        this.dom.addClass("close");
        this.dom.find(".mm").click(function () {
            $(this).parent(3).removeClass("open");
        });
        this.dom.find(".nn").click(function () {
            $(this).parent(4).toggleClass("close");
        });
        this.dom.find(".bar").click(function () {
            $(this).parent(2).toggleClass("close");
        });
        this.dom.find(".tablegroup-head").click(function () {
            $(this).addClass("open");
        });
        this.dom.find(".arrow").click(function () {
            ths.dom.find(".tablegroup-head").addClass("open");
        });
        this.dom.find(".toolbtns .search").click(function (e) {
            ths.refresh();
            ths.dom.find(".tablegroup-head").removeClass("open");
            e.stopPropagation();
        });
        this.dom.find(".toolbtns .reset").click(function (e) {
            ths.getFirstView("form").reset();
            e.stopPropagation();
        });
        this.dom.find(".toolbtns .close").click(function (e) {
            ths.dom.find(".tablegroup-head").removeClass("open");
            e.stopPropagation();
        });
        this.outerData = null;
        this.refresh();
    },
    onbeforeinit: function (option) {
        option["@form.listform"] = option.find;
        option["@table.doubleTable"] = option.table;
    },
    getSelectData: function () {
        var table = this.getFirstView("table");
        if (table) {
            return table.getSelectData();
        } else {
            return null;
        }
    },
    event_table_uploadfile: function (e) {
        this.addView({
            type: "Messagebox",
            option: {
                innerview: "multiupload",
                btns: [
                    {name: "关闭", type: "close"},
                    {name: "上传", type: "upload"}
                ],
                multiupload: {
                    action: "data/upload.php",
                    complete: function () {
                        this.dispatchEvent("close");
                    }
                },
                override: {
                    event_close: function (e) {
                        this.close();
                        e.stop();
                    },
                    event_upload: function (e) {
                        this.getFirstView("multiupload").uploadAll();
                        e.stop();
                    }
                }
            }
        });
        e.stop();
    },
    event_table_multidelete: function (e) {
        var btn = e.data.btn, data = e.data.data, ths = this;
        var control = btn.data("control");
        if (!control) {
            btn.data("control", {});
            control = btn.data("control");
        }
        if (data.length <= 0) {
            btn.html("<i class='fa fa-times'></i>还未选择任何数据");
            if (!control["timeout"]) {
                control["timeout"] = setTimeout(function () {
                    btn.html("<i class='fa fa-times'></i>");
                    control["timeout"] = null;
                }, 2000);
            }
        } else {
            if (control["isdelete"]) {
                clearTimeout(control["timeout"]);
                var r = "";
                for (var i in data) {
                    r += data[i].id + ",";
                }
                r = r.length >= 1 ? r.substring(0, r.length - 1) : "";
                btn.html("<i class='fa fa-refresh fa-spin'></i>");
                this.doRequest(this.option.delete.url, {ids: r}, function () {
                    btn.html("<i class='fa fa-times'></i>");
                    control["isdelete"] = false;
                    control["timeout"] = null;
                    ths.dispatchEvent("data_refresh");
                }, function () {
                    btn.html("<i class='fa fa-times'></i>");
                    control["isdelete"] = false;
                    control["timeout"] = null;
                }, function () {
                    btn.html("<i class='fa fa-times'></i>");
                    control["isdelete"] = false;
                    control["timeout"] = null;
                });
            } else {
                control["isdelete"] = true;
                btn.html("<i class='fa fa-times'></i>确定删除数据？");
                if (!control["timeout"]) {
                    control["timeout"] = setTimeout(function () {
                        control["isdelete"] = false;
                        btn.html("<i class='fa fa-times'></i>");
                        control["timeout"] = null;
                    }, 4000);
                }
            }
        }
    },
    event_table_rowedit: function (e) {
        this.addView(null, "formwindow", this.option.edit, "xx", e.data.data);
        e.stop();
    },
    event_table_tooladd: function (e) {
//        this.option.add.color = "red";
//        this.addView(null, "formwindow", this.option.add, "xx");
        this.dom.find(".chouti").addClass("open");
//        e.stop();
    },
    event_table_rowdelete: function (e) {
        var btn = e.data.btn, data = e.data.data, ths = this;
        var control = btn.data("control");
        if (!control) {
            btn.data("control", {});
            control = btn.data("control");
        }
        if (!control["timeout"]) {
            var b = $("<div class='alert'>确定删除？</div>").appendTo(btn.parent().parent().parent());
            control["alert"] = b;
            b.click(function (e) {
                clearTimeout(control["timeout"]);
                control["alert"].html("<i class='fa fa-refresh fa-spin'></i>");
                ths.doRequest(ths.option.delete.url, {ids: data.id}, function () {
                    control["alert"].remove();
                    control["alert"] = null;
                    control["timeout"] = null;
                    ths.dispatchEvent("data_refresh");
                }, function () {
                    control["alert"].remove();
                    control["alert"] = null;
                    control["timeout"] = null;
                }, function () {
                    control["alert"].remove();
                    control["alert"] = null;
                    control["timeout"] = null;
                });
                e.stopPropagation();
            });
            control["timeout"] = setTimeout(function () {
                control["alert"].remove();
                control["alert"] = null;
                control["timeout"] = null;
            }, 4000);
        }
        e.stop();
    },
    event_table_toolrefresh: function (e) {
        this.refresh();
        e.stop();
    },
    event_data_refresh: function (e) {
        var data = this.getFirstView("form") ? this.getFirstView("form").getValues() : null;
        var table = this.getFirstView("tablebase");
        table.gotoPage(1, data);
        e.stop();
    },
    refresh: function (data) {
        if (data) {
            this.outerData = data;
        }
        var table = this.getChildIndex(0);
//        table.gotoPage(1, null);
    }
});
Module({
    name: "treetablegroup",
    extend: "@.basegroup",
    className: "treetablegroup",
    option: {
        tableType: "table",
        query: true,
        form: {},
        edit: {},
        delet: {},
        add: {},
        table: {}
    },
    layout: "<div class='treecon'>" +
            "<%=module('@tree.treelite','','form');%>" +
            "</div>" +
            "<div class='tbg'>" +
            "<%=module('@.tablegroup','','form');%>" +
            "</div>",
    init: function (option) {
    }
});