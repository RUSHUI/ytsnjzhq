/*!
 * @packet option.root;
 * @require brooder.view.main;
 * @require brooder.view.form;
 * @css brooder.style.base;
 * @css brooder.style.font-awesome-min;
 * @css brooder.style.default;
 */
Option({
    name: "root",
    packets: [],
    class: "root",
    layout: "",
    "@main.login": {
        form: {
            fields: [
                {_type: "brooder.view.field.text", label: "USERNAME", name: "xx"},
                {_type: "brooder.view.field.text", label: "PASSWORD", name: "xx"}
            ]
        }
    },
    "@main.mainpage": {
        menu: {
            url: "data/menumapping.json"
        }
    },
    "@main.choutier": {
        inner: "brooder.view.form.listform",
        "@form.listform": {
            fields: [
                {_type: "brooder.view.field.text", label: "USERNAME", name: "xx"},
                {_type: "brooder.view.field.text", label: "PASSWORD", name: "xx"}
            ]
        }
    },
    override: {
        onendinit: function () {
            this.addChild({
                type: "@main.login"
            });
        },
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
        onimportoptionstart: function (a) {
            console.log("-----<" + a.option);
        },
        onimportoptionend: function (a) {
            console.log("-----<" + a.option);
        },
        oninitchild: function (e) {
            console.log("-------->>%o---%o", e.id, e.type);
        },
        event_quitApp: function () {
            this.getFirstChild().remove();
            this.addChild({
                type: "@main.login"
            });
        },
        event_loginEnd: function () {
            this.getFirstChild().remove();
            this.addChild({
                type: "@main.mainpage"
            });
        },
        event_userInfo: function () {
            this.addChild({
                type: "@main.choutier"
            });
        }
    }
});