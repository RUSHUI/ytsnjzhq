/*!
 * @packet brooder.mobi.option.root;
 * @require brooder.mobi.boot;
 * @require brooder.mobi.form;
 * @require brooder.util.fullscreen;
 * @css brooder.mobi.css.icons;
 */
Option({
    name: "menu",
    list: [
        {type: "@boot.statictab", option: "@.winone", title: "testA", icon: "fa fa-description"},
        {type: "@boot.switchContainer", option: "@.wintwo2", title: "testB", icon: "fa fa-description"},
        {type: "@boot.scroll", option: "@.wintwo", title: "testC", icon: "fa fa-description"},
        {type: "@boot.scroll", option: "@.winfour", title: "testD", icon: "fa fa-description"}
    ]
});
Option({
    name: "winone",
    inner: "@boot.datalist"
});
Option({
    name: "wintwo",
    inner: "@boot.deallist"
});
Option({
    name: "wintwo2",
    switchs: [
        {action: "aa", icon: "fa fa-dashboard", title: "aa", inner: "@boot.scroll", option: "@.wintwo"},
        {action: "bb", icon: "fa fa-extension", title: "aa", inner: "@boot.statictab", option: "@.winone"},
        {action: "cc", icon: "fa fa-settings", title: "aa", inner: "@boot.scroll", option: "@.wintwo"}
    ]
});
Option({
    name: "winthree",
    title: "window",
    large:true,
    inner: "@boot.test",
    lbtns: [{name: "open", icon: "fa fa-keyboard-backspace"}],
    rbtns: [{name: "menu", icon: "fa fa-more-vert"}]
});
Option({
    name: "winfour",
    inner: "@form.baseform",
    "@form.baseform": {
        fields: [
            {type: "@form.text", name: "aa", label: "aa", value: "aa"},
            {type: "@form.text", name: "bb", label: "bb", value: "bb"},
            {type: "@form.text", name: "cc", label: "cc", value: "cc"}
        ]
    }
});
Option({
    name: "root",
    override: {
        onendinit: function () {
            this.addChild({
                type:"@boot.login"
            });
            this.dom.find(".bg").transition().set("-all-transform",function(){
                this.remove();
            }).transform().x("-100%");
        },
        event_loginend:function(){
            this.getFirstChild().close();
            this.addChild({
                type: "@boot.main",
                option: {
                    "@boot.menu": Option("@.menu", ["list"])
                }
            });
        },
        event_addPage: function (e) {
            var option = e.data.option, ths = this;
            this.getFirstChild().getDom().transition().set("-all-transform").transform().scale(0.95, 0.95);
            this.addChild({
                type: "@boot.winkit",
                option: "@.winthree"
            });
        },
        event_winkitclose: function () {
            this.getFirstChild().getDom().transition().set("-all-transform").transform().scale(1, 1);
        }
    }
});