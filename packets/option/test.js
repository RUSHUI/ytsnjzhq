/*!
 * @packet option.test;
 * @require brooder.view.group;
 * @require brooder.view.form;
 * @require brooder.view.photo;
 */
Option({
    name: "table",
    find: {
        colnum: 2,
        fields: [
            {_type: "brooder.view.field.text", label: "xxxx", name: "xx"},
            {_type: "brooder.view.field.text", label: "xxxx", name: "xx"},
            {_type: "brooder.view.field.text", label: "xxxx", name: "xx"},
            {_type: "brooder.view.field.text", label: "xxxx", name: "xx"},
            {_type: "brooder.view.field.text", label: "xxxx", name: "xx"},
            {_type: "brooder.view.field.text", label: "xxxx", name: "xx"},
            {_type: "brooder.view.field.text", label: "xxxx", name: "xx"},
            {_type: "brooder.view.field.text", label: "xxxx", name: "xx"}
        ]
    },
    table: {
        dataurl: "data/table.json",
        cols: [
            {name: "keywords", key: 'keywords', ishow: true, width: 200},
            {name: "goods_no", key: 'goods_no', ishow: true, width: 200},
            {name: "状态", key: 'state', ishow: true, width: 200, center: true},
            {name: "content", key: 'bName', ishow: true, width: 200}
        ],
        tool: [{title: "添加数据", img: "fa fa-plus", type: "table_choutier"}]
    }
});
$.Option({
    name: "main",
    "@group.tablegroup": $.Option("@.table", ["find", "table"], {
        override: {
            event_table_choutier: function (e) {
                console.log("=====>>");
            }
        }
    }),
    override: {
        event_table_choutier: function (e) {
            this.add({
                width: 270,
                btns: [
                    {type: "ok", name: "ok", icon: "fa fa-angellist"},
                    {type: "cutter", name: "cutter", icon: "fa fa-crop"},
                    {type: "gallery", name: "gallery", icon: "fa fa-picture-o"},
                    {type: "removeChouti", name: "close", icon: "fa fa-times"}
                ],
                type: "@form.listform",
                option: {
                    fields: [
                        {_type: "brooder.view.field.text", label: "xxxx", name: "xx"},
                        {_type: "brooder.view.field.text", label: "xxxx", name: "xx"},
                        {_type: "brooder.view.field.text", label: "xxxx", name: "xx"}
                    ]
                }
            });
            e.stopPropagation();
        },
        event_ok: function (e) {
            this.add({
                width: 1000,
                title: "Select something",
                type: "@group.treetablegroup",
                option: $.Option("@.main")
            });
            e.stopPropagation();
        },
        event_cutter: function (e) {
            this.add({
                width: 500,
                title: "photocutter",
                type: "@photo.photocutter"
            });
            e.stopPropagation();
        },
        event_gallery:function(e){
            this.add({
                width: 800,
                title: "gallery",
                type: "@photo.gallery",
                option:{
                    url:"data/gallery_1.json"
                }
            });
            e.stopPropagation();
        }
    }
});
Option({
    name: "quickmenu",
    mapping: {
        0: "brooder.view.main.quicklink",
        1: "brooder.view.main.quicklink",
        8: "brooder.view.main.quicklink",
        14: "brooder.view.main.quicklink",
        18: "brooder.view.main.quicklink",
        23: "brooder.view.main.quicklink",
        28: "brooder.view.main.quicklink"
    }
});
Option({
    name: "site",
    mapping: {name: "kk"}
});
Option({
    name: "site-root",
    override: {
        oninitimportstart: function () {
            console.log("----start");
        },
        oninitimportprogress: function (e) {
            console.log("------progress--%o", e);
        },
        oninitimportend: function () {
            console.log("-------end");
        },
        onimportstart: function (a) {
            console.log("-------->>import:%o", a.module);
        },
        oninitchild: function (e) {
            console.log("-------->>%o---%o", e.id, e.type);
        }
    }
});