/*!
 * @packet option.sitetest;
 */
Option({
    name: "site",
    mapping: {name: "kk哟基金经理了解了解了"}
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