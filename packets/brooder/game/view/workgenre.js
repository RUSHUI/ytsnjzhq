/*!
 * @packet brooder.game.view.workgenre;
 * @require brooder.game.base;
 * @require brooder.game.view.doquestion;
 * @require brooder.game.view.draw;
 * @css brooder.game.css.workgenre;
 * @dom brooder.game.layout.temp;
 */
Module({
    name: "workgenre",
    extend: "@base.frame",
    className: "workgenre",
    layout:domstr("@temp","workgenre"),
    onoption: function (option) {
    },
    ondomready: function () {
    },
    init: function (option) {
        var ths=this;
        this.dom.find(".praze").tap(function(){
            ths.parentView.addChild({
                type: "@draw.draw",
                option: "@draw.draw",
                container: ths.parentView.dom
            });
            ths.parentView.gotoAndPlay("draw");
        });
    }
});

Option({
    name: "workgenre",
    frameName: "workgenre"
});
Option({
    name: "workgenrelist"
});
Module({
    name: "workgenrelist",
    className: "workgenrelist",
    extend: 'view',
    option: {
        urlinit: "packets/brooder/game/data/workgenre.json" ,
        template: T("<div class='item-list' data-find='item' data-itemid='<%=data.genreId;%>' data-itemname='<%=data.genreName;%>'>",
            "<div class='icons' style='background-position: <%=data.x;%>px <%=data.y;%>px;'></div>",
            "<div class='icontext'><%=data.genreName;%></div></div>")
    },
    init: function () {
        this.getData();
    },
    getData: function () {
        var ths = this;
        this.postData({
            url: ths.option.urlinit,
            back: function (data) {
                //alert("工种列表初始化成功");
                ths.preDealData(data);
            },
            dataerror: function (e) {
                console.log("-----获取失败--%o---", e.msg);
            },
            neterror: function (e) {
                console.log("------网络错误--%o----", e.msg);
            }
        });
    },
    preDealData:function(data){
        var ths=this;
        var list=local.get("workgenrelist"),newlist=[];
        for(var i=0,len=data.length;i<len;i++){
            var name=data[i].genreName,id=data[i].genreId;data[i].sequence=i+1;
            for(var j=0,l=list.length;j<l;j++){
                if(name===list[j].genreName){
                    list[j].sequence=i+1;
                    newlist.push(list[j]);
                }
            }
        }
        newlist.sort(function(o,t){
            return o.sequence-t.sequence;
        });
        for (var i in newlist) {
            ths.dom.append($.template(ths.option.template).render(newlist[i]));
        }
        ths.delegateFind();
    },
    delegateFind: function () {
        var ths = this;
        this.dom.find(".item-list .icons").each(function(){
            $(this).tap(function(){
               var id=$(this.parentNode).dataset("itemid"),name=$(this.parentNode).dataset("itemname"),thss=this;
               ths.postData({
                    url: "packets/brooder/game/data/doQstatus.json",
                    back: function (data) {
                        if(data.doQstatus=="1"){
                            //alert("允许答题");
                            $(thss).addClass("active");
                            setTimeout(function(){
                                $(thss).removeClass("active");
                                ths.parentView.parentView.addChild({
                                    type: "@doquestion.doQuestion",
                                    option: "@doquestion.doQuestion",
                                    container: ths.parentView.parentView.dom
                                });
                                ths.parentView.parentView.gotoAndPlay("doQuestion");
                                ths.parentView.parentView.dom.find(".doQ").attr("genreId",id);
                            },0);
                        }else{
                            alert("当前工种不允许答题，请联系管理员");
                        }
                    },
                    dataerror: function (e) {
                        console.log("-----获取失败--%o---", e.msg);
                    },
                    neterror: function (e) {
                        console.log("------网络错误--%o----", e.msg);
                    }
                });
            });
        });
    }
});

