/*!
 * @packet brooder.game.view.prase;
 * @require brooder.game.view.list;
 * @require brooder.game.base;
 * @require brooder.game.util.touch;
 * @css brooder.game.css.prase;
 */
Module({
    name: "prase",
    className:"prasecls",
    extend: "@base.frame",
    option: {
        frameName:"prase"
    },
    layout:"<div class='prase'><div class='box'><div class='jifen'>积分：500</div><div class='tiaojian'>已达到升级条件</div></div><div class='test'>恭喜哦，升级咯</div><div class='btn'><input type='button' class='paihang' readonly value='查看排行'><input class='dati' type='button' readonly value='返回选关'></div></div>",
    onoption: function (option) {
        return {name:"name"};
    },
    ondomready: function () {
    },
    init: function (option) {
        var ths = this,position=0;
        this.option=option;
        var data=JSON.parse(this.dom.attr("data"));

        this.dom.find(".dati").tap(function(){
        	ths.parentView.dom.find(".prasecls").hide();
        	ths.parentView.gotoAndPlay("workgenre");
        });
        this.dom.find(".paihang").tap(function(){
            if(!ths.parentView.dom.find("list").length){
                ths.parentView.addChild({
                    type: "@list.list",
                    option: "@list.list",
                    container:ths.parentView.dom
                });
                ths.parentView.gotoAndPlay("list");
            }else{
                ths.parentView.gotoAndPlay("list");
            }
        });
    }
});



Option({
    name: "prase" ,
    frameName:"prase"
});
