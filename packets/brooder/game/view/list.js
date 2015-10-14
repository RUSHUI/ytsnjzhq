/*!
 * @packet brooder.game.view.list;
 * @require brooder.game.base;
 * @require brooder.game.util.touch;
 * @css brooder.game.css.list;
 * @dom brooder.game.layout.temp;
 */
Module({
    name: "list",
    extend: "@base.frame",
    option: {
        frameName:"list",
        url:"packets/brooder/game/data/herolist.json"
    },
    layout:"<div class='list'>"+domstr('@temp','list')+"<%=module('@base.datalist');%></div>",
    onoption: function (option) {
        return {name:"name"};
    },
    ondomready: function () {
    },
    init: function (option) {
        var ths = this,position=0;
        this.option=option;
        this.dom.touch(function(e){
            if(e.action==="up"){
                if (e.timeLast < 200 && e.direction === "right") {
                    console.log(e);
                    ths.parentView.gotoAndPlay("workgenre");
                    // e.preventDefault();
                    // e.stopPropagation();
                }
            }
        });
    }
});


Option({
    name: "list" ,
    frameName:"list"
});