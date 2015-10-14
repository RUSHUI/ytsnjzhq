/*!
 * @packet brooder.game.view.item;
 * @require brooder.game.base;
 * @require brooder.game.view.doquestion;
 * @css brooder.game.css.item;
 * @dom brooder.game.layout.temp;
 */
Module({
    name: "item",
    extend: "@base.frame",
    className:"itemcls",
    option: {
        frameName:"item",
        url:"packets/brooder/game/data/script.json"
    },
    layout: "<div class='title'>任务列表</div><div class='choice'><div class='chuangguan'>闯关关口</div><div class='discript active'>闯关说明</div></div><%=module('@.itemlist');%><div class='shuoming'></div>",
    onoption: function (option) {
    },
    ondomready: function () {
    },
    init: function (option) {
        var ths = this;
        this.option=option;
        this.postData({
            url:ths.option.url,
            back:function(data){
            	var str="",a="ABCDEFG";
            	for(var i in data.discript){
            		if(i!=0&&i!=data.discript.length-1){
                        str+="<p>"+a[i-1]+".&nbsp;&nbsp;&nbsp;&nbsp;"+data.discript[i]+"</p>";
            		} else if(i==0){
                        str+="<div class='titlecls'>"+data.discript[i]+"</div><div>";
                    } else{
                       str+="<p>&nbsp;&nbsp;&nbsp;&nbsp;"+data.discript[i]+"</p>";
                    }
            	}
                ths.dom.find(".shuoming").html(str+"</div>");
            }
        });
        console.log("--this.dom-----%o------",this.dom);
        ths.dom.find(".discript").tap(function(){
            ths.dom.find(".choice >div").each(function(){
                $(this).removeClass("active");
            });
            $(this).addClass("active");
        	ths.dom.find(".itemlist").hide();
            ths.dom.find(".shuoming").css("display","inline-block");
        });
        ths.dom.find(".chuangguan").tap(function(){
            ths.dom.find(".choice >div").each(function(){
                $(this).removeClass("active");
            });
            $(this).addClass("active");
        	ths.dom.find(".itemlist").css("display","inline-block");
        	ths.dom.find(".shuoming").hide();
        });
    }
});

Option({
    name: "item" ,
    frameName:"item",
    layout:domstr("@temp.item")
});

Module({
    name:"itemlist",
    className:"itemlist",
    extend:'view',
    option:{
        url:"packets/brooder/game/data/item.json",
        template:T("<div class='item-list' data-find='item'>",
                        "<div class='list-name'><%=data.name;%></div>",
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
                for(var i in data){
                    ths.dom.append($.template(ths.option.template).render(data[i]));
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
    	var ths=this;
         this.dom.find(".item-list").touch(function(e){
            if(e.action==="up"){console.log("-------e----%o--%o-",e.direction,e.timeLast);
                if (e.timeLast < 150 && e.direction ==="none") {//上下滚动防止冒泡
                    ths.dom.find(".item-list").each(function(){
                        $(this).find(".list-name").removeClass("active");
                    });
                    $(this).find(".list-name").addClass("active");
                   ths.parentView.parentView.addChild({
                        type: "@doquestion.doQuestion",
                        option: "@doquestion.doQuestion",
                        container:ths.parentView.parentView.dom
                    });
                    ths.parentView.parentView.gotoAndPlay("doQuestion");
                    //e.preventDefault();//默认行为就是滚动
                    e.stopPropagation();
                }
            }
        });
    }
});