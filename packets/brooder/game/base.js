/*!
 * @packet brooder.game.base;
 */

Module({
    name: "frame",
    extend: "viewgroup",
    className: "frame",
    layout: "",
    option: {
        frameName: ""
    },
    init: function (option) {
    },
    onenterframe: null,
    onoutframe: null,
    play: function (data) {
        this.onenterframe && this.onenterframe(data);
    },
    playend: function (data) {
        this.onoutframe && this.onoutframe(data);
    },
    hide: function () {
        this.dom.hide();
    },
    show: function () {
        this.dom.show();
    }
});
Module({
    name: "frames",
    extend: "viewgroup",
    className: "frames",
    option: {
        frames: []
    },
    init: function (option) {
        this.num = option.frames.length;
        this.current = -1;
        for (var i in option.frames) {
            this.addChild({
                type: "@.frame",
                option: option.frames[i],
                container: this.dom
            });
        }
        this.gotoAndPlay(1);
    },
    gotoAndPlay: function (index) {
        var ths = this;
        if ($.is.isString(index)) {
            this.childEach(function (num) {
                if (this.option.frameName === index) {
                    ths.children[ths.current].hide();
                    ths.children[ths.current].playend();
                    ths.current = num;
                    ths.children[num].show();
                    ths.children[num].play();
                } else {
                    ths.children[num].hide();
                }
            });
        } else if ($.is.isNumber(index)) {
            var num = index - 1;
            this.childEach(function (a) {
                if (a === num) {
                    ths.children[ths.current] && ths.children[ths.current].hide();
                    ths.children[ths.current] && ths.children[ths.current].playend();
                    ths.current = a;
                    ths.children[a].show();
                    ths.children[a].play();
                } else {
                    ths.children[a].hide();
                }
            });
        }
        return this;
    },
    gotoByMName: function (index) {
        var ths = this;
        if ($.is.isString(index)) {
            this.childEach(function (num) {
                if (this.option.frameName === index) {
                    ths.children[ths.current].hide();
                    ths.children[ths.current].playend();
                    ths.current = num;
                    ths.children[num].show();
                    ths.children[num].play();
                } else {
                    ths.children[num].hide();
                }
            });
        } else if ($.is.isNumber(index)) {
            var num = index - 1;
            this.childEach(function (a) {
                if (a === num) {
                    ths.children[ths.current] && ths.children[ths.current].hide();
                    ths.children[ths.current] && ths.children[ths.current].playend();
                    ths.current = a;
                    ths.children[a].show();
                    ths.children[a].play();
                } else {
                    ths.children[a].hide();
                }
            });
        }
        return this;
    }


});
Module({
    name:"datalist",
    className:"datalist",
    extend:'view',
    option:{
        url:"packets/brooder/game/data/herolist.json",
        template:T("<div class='item-list' data-find='item'>",
                        "<div class='list-name'><%=data.name;%></div>",
                        "<div class='list-score'><%=data.score;%></div>",
                        "<div class='list-sequence'><span class='<%=data.cls;%>'>",
                        "<%=data.sequence;%></span>",
                        "</div>",
                    "</div>"),
        option:""
    },
    init:function(){
        this.getData();
    },
    getData:function(fn){
        var ths=this;
        this.postData({
            url:this.option.url,
            back:function(data){
                ths.dom.append("<div class='head' data-find='item'>"+
                        "<div class='list-name'>用户名</div>"+
                        "<div class='list-score'>分数</div>"+
                        "<div class='list-sequence'>排名</div>"+
                    "</div><div class='content'></div>")
                for(var i in data){
                    ths.dom.find(".content").append($.template(ths.option.template).render(data[i]));
                }
                ths.delegateFind();
                fn&&fn();
            }
        });
    },
    refresh:function(fn){
        this.dom.empty();
        this.getData(fn);
    },
    delegateFind:function(){
         console.log(this.dom.find(".content").length);
         this.dom.find(".content").touch(function(e){
            if(e.action==="up"){console.log("-------e----%o---",e);
                if (e.timeLast < 200 && (e.direction === "top"||e.direction === "bottom" )) {//上下滚动防止冒泡
                    //e.preventDefault();//默认行为就是滚动
                    e.stopPropagation();
                }
            }
        });
    }
});

