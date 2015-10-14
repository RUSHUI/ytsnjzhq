/*!
 * @packet brooder.mobi.boot;
 * @require brooder.mobi.util.touch;
 * @css brooder.mobi.css.default;
 */
Module({
    name:"main",
    extend:"viewgroup",
    className:"main",
    layout:"<%=module('@.menu');%><%=module('@.win');%>",
    init:function(){
        this.isopen=false;
        var menu=this.getFirstChild();
        var win=this.getLastChild();
        var position=0,current=0;
        var width=menu.option.width;
        var ths=this;
        this.dom.touch(function(e){
            if(e.action==="down"){
                position=win.dom.transform().x();
                menu.dom.transition().removeAll();
                win.dom.transition().removeAll();
            }else if(e.action==="move"){
                if(e.direction==="left"||e.direction==="right"){
                    var p=position+e.offsetX;
                    if(p>=width){
                        p=width;
                    }else if(p<=0){
                        p=0;
                    }
                    var d=p/width*50-50;
                    current=p;
                    menu.dom.transform().x(d);
                    win.dom.transform().x(p);
                    e.preventDefault();
                    e.stopPropagation();
                }
            }else{
                var v=Math.abs(e.offsetX/e.timeLast);
                if(e.odirection==="left"||e.odirection==="right"){
                    if(v>0.3&&v<1){
                        if(e.odirection==="left"){
                            ths.close();
                        }else if(e.odirection==="right"){
                            ths.open();
                        }
                    }else if(v>0){
                        if(current>width/2){
                            ths.open();
                        }else{
                            ths.close();
                        }
                    }
                }
            }
        });
    },
    open:function(){
        this.isopen=true;
        var menu=this.getFirstChild();
        var win=this.getLastChild();
        win.dom.transition().set("-all-transform").transform().x(menu.option.width);
        menu.dom.transition().set("-all-transform").transform().x(0);
    },
    close:function(){
        this.isopen=false;
        this.getFirstChild().getDom().transition().set("-all-transform").transform().x(-50);
        this.getLastChild().getDom().transition().set("-all-transform").transform().x(0);
    },
    event_close:function(){
        this.close();
    },
    event_open:function(){
        this.open();
    },
    event_toggle:function(){
        if(this.isopen){
            this.close();
        }else{
            this.open();
        }
    },
    event_flip:function(e){
        this.close();
        var type=e.data.type,option=e.data.option;
        this.getLastChild().setBody(type,option);
    },
    event_dropmenu:function(e){
        var btn=e.data.btn;
        this.addChild({
            type:"@.dropmenu",
            option:{
                top:btn.offset().top+45
            }
        });
    }
});
Module({
    name:"menu",
    className:"menu",
    extend:"view",
    template:T("<div class='menu-top'>",
                    "<div class='menu-top-icon' data-find='user'><img src='data/images/5.jpg'/></div>",
                    "<div class='menu-top-name'>brooder.js</div>",
                "</div>",
                "<div class='menu-lists'>",
                "<%for(var i in data.list){%>",
                "<div data-find='item' class='menu-list' type='<%=data.list[i].type;%>' option='<%=data.list[i].option;%>'>",
                    "<i class='<%=data.list[i].icon;%>'></i>",
                    "<span> <%=data.list[i].title;%></span>",
                "</div>",
                "<%}%>",
                "</div>",
                "<div class='copyright'>©2015 bjttsx by ttux</div>"),
    option:{
        width:240,
        list:[{name:"aa",title:"testA",icon:"fa fa-description"}]
    },
    init:function(option){
        this.dom.width(option.width);
        this.render(option);
    },
    find_user:function(dom){
        var ths=this;
        dom.button(function(){
            ths.dispatchEvent("addPage",{
                type:"",
                option:""
            });
        });
    },
    find_item:function(dom){
        var ths=this;
        dom.button(function(){
            this.parent().children().each(function(){
                $(this).removeClass("active");
            });
            this.addClass("active");
            ths.dispatchEvent("flip",{
                type:$(this).attr("type"),
                option:$(this).attr("option")
            });
        });
    }
});
Module({
    name:"win",
    className:"win",
    extend:"viewgroup",
    layout:T("<div class='win-head'>",
                "<div class='win-head-left'>",
                    "<%for(var i in data.option.lbtns){%>",
                        "<div data-find='btn' class='btn' name='<%=data.option.lbtns[i].name;%>'><i class='<%=data.option.lbtns[i].icon;%>'></i></div>",
                    "<%}%>",
                "</div>",
                "<%if(!data.option.large){%>",
                "<div class='win-head-title'><%=data.option.title;%></div>",
                "<%}%>",
                "<div class='win-head-right'>",
                    "<%for(var i in data.option.rbtns){%>",
                        "<div data-find='btn' class='btn' name='<%=data.option.rbtns[i].name;%>'><i class='<%=data.option.rbtns[i].icon;%>'></i></div>",
                    "<%}%>",
                "</div>",
             "</div>",
             "<%if(data.option.large){%>",
            "<div class='win-title'><%=data.option.title;%></div>",
            "<%}%>",
             "<div class='win-body<%=(data.option.large?\' withheader\':\'\');%>' data-find='body'><%=module(data.option.inner);%></div>"),
    option:{
        title:"this is title",
        large:false,
        lbtns:[{name:"toggle",icon:"fa fa-menu"}],
        rbtns:[{name:"dropmenu",icon:"fa fa-more-vert"}],
        inner:"@.statictab"
    },
    init:function(option){
    },
    find_btn:function(dom){
        var ths=this;
        dom.button(function(){
            ths.dispatchEvent($(this).attr("name"),{
                btn:$(this)
            });
        });
    },
    find_body:function(dom){
        var ths=this;
        dom.touch(function(e){
            if (e.action === "down") {
            } else if (e.action === "move") {
            }else if(e.action==="up"){
                ths.dispatchEvent("close");
            }
        });
    },
    setBody:function(type,option){
        this.getLastChild().remove();
        console.log(type);
        console.log(option);
        this.addChild({
            type:type,
            option:option,
            container:this.dom.children(1)
        });
    }
});
Module({
    name:"winkit",
    className:"winkit",
    extend:"@.win",
    init:function(){
        var ths=this;
        ths.dom.transition().set("-all-transform").transform().x(0);
        this.position=0;
        this.dom.touch(function(e){
            if(e.action==="down"){
                ths.position=ths.dom.transform().x();
                ths.dom.transition().removeAll();
            }else if(e.action==="move"){
                if(e.direction==="left"||e.direction==="right"){
                    var a=ths.position+e.offsetX;
                    ths.dom.transform().x(a);
                    e.preventDefault();
                    e.stopPropagation();
                }
            }else{
                if(Math.abs(e.offsetX)>100){
                    ths.close();
                    e.preventDefault();
                    e.stopPropagation();
                }else{
                    ths.dom.transition().set("-all-transform").transform().x(0);
                }
            }
        });
    },
    close:function(){
        var ths=this;
        this.dom.transition().set("-all-transform",function(){
            ths.dispatchEvent("winkitclose");
            this.remove();
        }).transform().x("100%");
    },
    event_close:function(e){
        this.close();
        e.stopPropagation();
    }
});
Module({
    name:"loadingscroll",
    extend:"viewgroup",
    className:"scroll",
    layout:T("<div class='scroll-head to-drag'>",
                "<div class='scroll-head-loading scroll-drag'>",
                    "<div class='scroll-head-arrow'><i class='fa fa-arrow-back'></i></div>",
                    "<div class='scroll-head-text'>drag down to refresh</div>",
                "</div>",
                "<div class='scroll-head-loading scroll-release'>",
                    "<div class='scroll-head-arrow release'><i class='fa fa-arrow-back'></i></div>",
                    "<div class='scroll-head-text'>release to refresh</div>",
                "</div>",
                "<div class='scroll-head-loading scroll-loading'>",
                    "<div class='scroll-head-arrow'><i class='fa fa-cached fa-spin'></i></div>",
                    "<div class='scroll-head-text'>loading</div>",
                "</div>",
            "</div>",
            "<div class='scroll-body'><%=module(data.option.inner);%></div>",
            "<div class='scroll-foot'>Loading...</div>"),
    option:{
        inner:"@.datalist"
    },
    init:function(){
        var ths=this;
        this.head=this.dom.find(".scroll-head");
        this.dom.bind("scroll",function(){
            var top=$(this).scrollTop();
            if(top===0){
                ths.istop=true;
                ths.dispatchEvent("scrollTop");
            }else if(top===$(this).children(1).height()-$(this).height()+40){
                ths.istop=false;
                ths.dispatchEvent("scrollBottom");
            }else{
                ths.istop=false;
            }
        });
        this.dot=this.dom.find(".scroll-body");
        this.dotposition=0;
        this.istop=true;
        this.isrefresh=false;
        this.dom.touch(function(e){
            if(e.action==="down"){
                ths.dotposition=ths.dot.transform().y();
                ths.dot.transition().removeAll();
            }else if(e.action==="move"){
                if(e.odirection==="bottom"||e.odirection==="top"){
                    if(e.direction==="bottom"){
                        if(ths.istop){
                            var a=ths.dotposition+e.offsetY/3;
                            ths.dot.transform().y(a);
                            if(a>60){
                                ths.head.addClass("to-drag").removeClass("to-release").removeClass("to-loading");
                            }else{
                                ths.head.removeClass("to-drag").addClass("to-release").removeClass("to-loading");
                            }
                            e.preventDefault();
                            e.stopPropagation();
                        }
                    }else if(e.direction==="top"&&ths.dot.transform().y()!==0){
                        if(!ths.isrefresh){
                            var a=ths.dotposition+e.offsetY/3;
                            ths.dot.transform().y(a);
                            if(a>60){
                                ths.head.addClass("to-drag").removeClass("to-release").removeClass("to-loading");
                            }else{
                                ths.head.removeClass("to-drag").addClass("to-release").removeClass("to-loading");
                            }
                            e.preventDefault();
                            e.stopPropagation();
                        }
                    }else if(e.direction==="left"||e.direction==="right"){
                        e.preventDefault();
                        e.stopPropagation();
                    }
                }
            }else{
                if(ths.dot.transform().y()<50){
                    ths.dom.find(".scroll-head-arrow").removeClass("release");
                    ths.dot.transition().set("-all-transform").transform().y(0);
                }else{
                    ths.isrefresh=true;
                    ths.dot.transition().set("-all-transform").transform().y(50);
                    ths.showRefresh();
                    ths.getFirstChild().refresh&&ths.getFirstChild().refresh(function(){
                        ths.isrefresh=false;
                        ths.hideRefresh();
                    });
                }
            }
        });
    },
    showRefresh:function(){
        this.head.removeClass("to-drag").removeClass("to-release").addClass("to-loading");
        this.dot.transition().set("-all-transform").transform().y(50);
    },
    hideRefresh:function(){
        this.head.addClass("to-drag").removeClass("to-release").removeClass("to-loading");
        this.dot.transition().set("-all-transform").transform().y(0);
    },
    event_scrollTop:function(){
        console.log("----top----");
    },
    event_scrollBottom:function(){
        console.log("----bottom----");
        this.getFirstChild().getData();
    }
});
Module({
    name:"scroll",
    className:"scroll",
    layout:"<div class='scroll-content'><%=module(data.option.inner);%></div>",
    extend:"viewgroup",
    option:{
        inner:"@.datalist"
    },
    init:function(){
        var ths=this;
        this.dom.bind("scroll",function(){
            var top=$(this).scrollTop();
            if(top===0){
                ths.istop=true;
                ths.isbottom=false;
                ths.dispatchEvent("scrollTop");
            }else if(top===$(this).children(0).height()-$(this).height()){
                ths.istop=false;
                ths.isbottom=true;
                ths.dispatchEvent("scrollBottom");
            }else{
                ths.istop=false;
                ths.isbottom=false;
            }
        });
        this.dot=this.dom.find(".scroll-content");
        this.dotposition=0;
        this.istop=true;
        this.isbottom=false;
        this.dom.touch(function(e){
            if(e.action==="down"){
                ths.dotposition=ths.dot.transform().y();
                ths.dot.transition().removeAll();
            }else if(e.action==="move"){
                if(e.odirection==="bottom"||e.odirection==="top"){
                    if(e.direction==="bottom"){
                        if(ths.istop){
                            var a=ths.dotposition+e.offsetY/3;
                            ths.dot.transform().y(a);
                            e.preventDefault();
                            e.stopPropagation();
                        }
                        if(ths.isbottom&&ths.dot.transform().y()!==0){
                            var a=ths.dotposition+e.offsetY/3;
                            ths.dot.transform().y(a);
                            e.preventDefault();
                            e.stopPropagation();
                        }
                    }else if(e.direction==="top"){
                        if(ths.istop&&ths.dot.transform().y()!==0){
                            var a=ths.dotposition+e.offsetY/3;
                            ths.dot.transform().y(a);
                            e.preventDefault();
                            e.stopPropagation();
                        }
                        if(ths.isbottom){
                            var a=ths.dotposition+e.offsetY/3;
                            ths.dot.transform().y(a);
                            e.preventDefault();
                            e.stopPropagation();
                        }
                    }else if(e.direction==="left"||e.direction==="right"){
                        e.preventDefault();
                        e.stopPropagation();
                    }
                }
            }else{
                ths.dot.transition().set("-all-transform").transform().y(0);
            }
        });
    },
    event_scrollTop:function(){
        console.log("----top----");
    },
    event_scrollBottom:function(){
        console.log("----bottom----");
    }
});
Module({
    name:"datalist",
    className:"datalist",
    extend:'view',
    option:{
        url:"data/scrolllist.json",
        template:T("<div class='test-list' data-find='item'>",
                        "<div class='img-con'><img src='<%=data.img;%>'/></div>",
                        "<div class='list-con'>",
                            "<div class='list-name'><%=data.name;%></div>",
                            "<div class='list-desc'><%=data.desc;%></div>",
                            "<div class='list-time'><%=data.time;%></div>",
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
                for(var i in data){
                    ths.dom.append($.template(ths.option.template).render(data[i]));
                }
                ths.delegateFind();
                fn&&fn();
            }
        });
    },
    find_item:function(dom){
        var ths=this;
        this.ismove=false;
        dom.button(function(){
            ths.dispatchEvent("addPage",{
                option:ths.option.option
            });
        });
    },
    refresh:function(fn){
        this.dom.empty();
        this.getData(fn);
    }
});
Module({
    name:"deallist",
    className:"deallist",
    extend:"view",
    option:{
        height:70,
        deal:[
            {action:"aa",title:"aa",icon:"fa fa-done"},
            {action:"bb",title:"bb",icon:"fa fa-thumb-up"},
            {action:"cc",title:"cc",icon:"fa fa-reply"}
        ]
    },
    init:function(){
        this.getData();
        this.maxWidth=55*this.option.deal.length;
    },
    getData:function(){
        for(var i=0;i<20;i++){
            var str="";
            str+="<div class='deallist-item' data-find='item' style='line-height:"+this.option.height+"px'>"+
                "<div class='deallist-btns'>";
                for(var t in this.option.deal){
                    str+="<div class='deallist-btn' style='line-height:"+this.option.height+"px'><i class='"+this.option.deal[t].icon+"'></i></div>";
                }
                str+="</div>";
                str+="<div class='deallist-content'>"+i+"</div>"+
            "</div>";
            this.dom.append(str);
        }
        this.delegateFind();
    },
    find_item:function(dom){
        var ths=this;
        ths.position=0;
        dom.touch(function(e){
            var dot=$(this).children(1);
            if(e.action==="down"){
                ths.position=dot.transform().x();
                dot.transition().removeAll();
            }else if(e.action==="move"){
                if(e.direction==="left"){
                    var a=ths.position+e.offsetX;
                    if(a<=-ths.maxWidth){
                        a=-ths.maxWidth;
                    }
                    dot.transform().x(a);
                    e.preventDefault();
                    e.stopPropagation();
                }else if(e.direction==="right"&&ths.position!==0){
                    var a=ths.position+e.offsetX;
                    if(a>=0){
                        a=0;
                    }
                    dot.transform().x(a);
                    e.preventDefault();
                    e.stopPropagation();
                }
            }else{
                if(e.direction==="left"){
                    dot.transition().set("-all-transform").transform().x(-ths.maxWidth);
                }else if(e.direction==="right"){
                    dot.transition().set("-all-transform").transform().x(0);
                }
            }
        });
    }
});
Module({
    name:"statictab",
    className:"statictab",
    extend:"viewgroup",
    layout:T("<div class='tab-contents'>",
                "<div class='tab-contentscon' style='width:<%=data.option.tabs.length*100;%>%'>",
                "<%for(var i in data.option.tabs){%>",
                    "<div class='tab-heads-content' style='width:<%=100/data.option.tabs.length;%>%'><%=module('@.loadingscroll');%></div>",
                "<%}%>",
                "</div>",
            "</div>",
            "<div class='tab-heads'>",
                "<div class='tab-headscon' style='width:100%'>",
                "<%for(var i in data.option.tabs){%>",
                    "<div data-find='title' num='<%=i;%>' class='tab-heads-title' style='width:<%=100/data.option.tabs.length;%>%'><%=data.option.tabs[i].title;%></div>",
                "<%}%>",
                "</div>",
            "</div>",
            "<div class='tab-line' style='width:<%=100/data.option.tabs.length;%>%'></div>"),
    option:{
        tabs:[{title:"aa",type:"",option:null},
            {title:"bb",type:"",option:null},
            {title:"cc",type:"",option:null}]
    },
    init:function(){
        var ths=this;
        this.content=this.dom.find(".tab-contentscon");
        this.head=this.dom.find(".tab-headscon");
        this.line=this.dom.find(".tab-line");
        this.postion=0;
        this.linePosition=0;
        this.current=0;
        this.currentNum=0;
        this.outer=false;
        this.dom.touch(function(e){
            if(e.action==="down"){
                ths.position=ths.content.transform().x();
                ths.linePosition=ths.line.transform().x();
                ths.content.transition().removeAll();
                ths.line.transition().removeAll();
            }else if(e.action==="move"){
                if(e.direction==="left"||e.direction==="right"){
                    var a=ths.position+e.offsetX;
                    if(a<=0&&a>-(ths.option.tabs.length-1)*ths.dom.width()){
                        ths.outer=false;
                        var b=ths.linePosition-e.offsetX/ths.dom.width()*ths.line.width();
                        ths.content.transform().x(a);
                        ths.line.transform().x(b);
                        e.preventDefault();
                        e.stopPropagation();
                    }else{
                        ths.outer=true;
                    }
                }
            }else{
                var v=Math.abs(e.offsetX/e.timeLast);
                if(e.odirection==="left"||e.odirection==="right"){
                    if(v>0.3&&v<1){
                        if(e.odirection==="left"){
                            ths.nextTab();
                        }else if(e.odirection==="right"){
                            ths.prevTab();
                        }
                    }else{
                        if(e.direction==="left"){
                            if(Math.abs(e.offsetX)>100){
                                ths.nextTab();
                            }else{
                                ths.gotoTab(ths.currentNum);
                            }
                        }else if(e.direction==="right"){
                            if(Math.abs(e.offsetX)>100){
                                ths.prevTab();
                            }else{
                                ths.gotoTab(ths.currentNum);
                            }
                        }
                    }
                    if(!ths.outer||v===0){
                        e.preventDefault();
                        e.stopPropagation();
                    }
                }
            }
        });
    },
    find_title:function(dom){
        var ths=this;
        dom.touch(function(e){
            if(e.action==="down"){
            }else if(e.action==="move"){
            }else{
                var num=$(this).attr("num");
                ths.gotoTab(num);
            }
        });
    },
    gotoTab:function(num){
        num=num/1;
        if(num>=0&&num<this.option.tabs.length){
            this.currentNum=num;
            var a=num*this.dom.width();
            this.content.transition().set("-all-transform").transform().x(-a);
            var b=num*this.dom.width()/this.option.tabs.length;
            this.line.transition().set("-all-transform").transform().x(b);
        }
    },
    nextTab:function(){
        this.gotoTab(this.currentNum+1);
    },
    prevTab:function(){
        this.gotoTab(this.currentNum-1);
    }
});
Module({
    name:"test",
    extend:"view",
    init:function(){
        var ths=this;
        this.dom.html("<div class='test'><i class='fa fa-autorenew fa-spin'></i> loading...</div>").children(0).button(function(){
            ths.dispatchEvent("close");
        });
    }
});

Module({
    name:"dropmenu",
    extend:'view',
    className:"dropmenu",
    template:T("<div data-find='mask' class='dropmenu-mask'></div>",
                "<%var a=data.left!==-1?'left:'+data.left+'px;':'';",
                "var b=data.top!==-1?'top:'+data.top+'px;':'';",
                "var c=data.right!==-1?'right:'+data.right+'px;':'';",
                "var d=data.bottom!==-1?'bottom:'+data.bottom+'px;':'';",
                "%>",
                "<div class='dropmenu-list' style='<%=a+b+c+d;%>'>",
                    "<%for(var i in data.list){%>",
                        "<div class='dropmenu-list-item'><%=data.list[i].title;%></div>",
                    "<%}%>",
                "</div>"),
    option:{
        left:-1,
        top:0,
        right:5,
        bottom:-1,
        width:200,
        list:[
            {action:"aa",title:"aaa"},
            {action:"bb",title:"aaabb"},
            {action:"cc",title:"aaacc"}
        ]
    },
    init:function(){
        this.render(this.option);
    },
    find_mask:function(dom){
        var ths=this;
        dom.touch(function(){
            ths.remove();
        });
    }
});

Module({
    name:"switchContainer",
    className:"switchContainer",
    extend:"viewgroup",
    option:{
        switchs:[
            {action:"aa",icon:"fa fa-dashboard",title:"aa",inner:"",option:""},
            {action:"bb",icon:"fa fa-extension",title:"aa",inner:"",option:""},
            {action:"cc",icon:"fa fa-settings",title:"aa",inner:"",option:""}
        ]
    },
    layout:T("<div class='switch-container'></div>",
            "<div class='switch-bar'>",
                "<%for(var i in data.option.switchs){%>",
                "<div data-find='btn' num='<%=i;%>' class='switch-bar-btn' style='width:<%=100/data.option.switchs.length;%>%'>",
                    "<div class='switch-bar-icon'><i class='<%=data.option.switchs[i].icon;%>'></i></div>",
                    "<div class='switch-bar-label'><%=data.option.switchs[i].title;%></div>",
                "</div>",
                "<%}%>",
            "</div>"),
    init:function(option){
        var k=option.switchs[0];
        if(k){
            this.addChild({
                type:k.inner,
                option:k.option,
                container:this.dom.children(0)
            });
        }
        this.dom.find(".switch-bar-btn").eq(0).addClass("active");
    },
    find_btn:function(dom){
        var ths=this;
        dom.button(function(){
            $(this).parent().children().each(function(){
                if($(this).hasClass("active")){
                    $(this).removeClass("active");
                }
            });
            var num=$(this).addClass("active").attr("num");
            var k=ths.option.switchs[num];
            ths.getFirstChild().remove();
            ths.addChild({
                type:k.inner,
                option:k.option,
                container:ths.dom.children(0)
            });
        });
    }
});

Module({
    name:"login",
    className:"login",
    extend:"viewgroup",
    layout:T("<div class='login-head' data-find='logo'></div>",
             "<div class='login-container form'>",
                    "<label class='field'>",
                        "<div class='text-icon'><i class='fa fa-person'></i></div>",
                        "<div class='text-input'>",
                            "<input type='text' placeholder='input your username'>",
                        "</div>",
                    "</label>",
                    "<label class='field'>",
                        "<div class='text-icon'><i class='fa fa-lock-outline'></i></div>",
                        "<div class='text-input'>",
                            "<input type='password' placeholder='input your password'>",
                        "</div>",
                    "</label>",
                "</div>",
                "<div class='btn-con'>",
                    "<div class='button' data-find='login'>Login</div>",
                "</div>",
                "<div class='copyright'>©2015 bjttsx by ttux</div>"),
    init:function(){
        this.dom.transition().set("-all-transform").transform().x(0);
    },
    close:function(){
        this.dom.transition().set("-all-transform",function(){
            this.remove();
        },600).transform().x("-100%");
    },
    find_logo:function(dom){
        dom.click(function(){
            $("body").fullScreen();
        });
    },
    find_login:function(dom){
        var ths=this;
        dom.button(function(){
            $("body").fullScreen();
            ths.dispatchEvent("loginend");
        });
    }
});