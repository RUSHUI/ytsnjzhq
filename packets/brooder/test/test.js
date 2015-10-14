/*!
 * @packet brooder.test.test;
 * @require brooder.test.test.test;
 */
Module({
    name:"test",
    extend:'view',
    init:function(){
        console.log("brooder.test.test");
        console.log("@.aa");
        console.log("@test.aa");
    }
});
Module({
    name:"delegateEvent",
    extend:"view",
    template:"<div data-find='kk' data-event='click:isclick'>xxxxx</div>"+
                "<div data-event='click:isclick2'>2xxxxx</div>"+
                "<div data-event='click:isclick3'>3xxxxx</div>",
    init:function(){
        this.render();
    },
    onbeforerender:function(){
        console.log("----before render---");
    },
    onendrender:function(){
        console.log("----end render---");
    },
    find_kk:function(){
        console.log(this);
    },
    bind_isclick:function(){
        console.log("----isclick----");
    },
    bind_isclick2:function(){
        console.log("----isclick2----");
    },
    bind_isclick3:function(){
        console.log("----isclick3----");
    }
});
Module({
    name:"delegateEventgroup",
    extend:"viewgroup",
    layout:"<div><%=module('@.delegateEvent');%></div>"+
            "<div data-event='click:tt'>mmmmm</div>",
    init:function(){
        
    },
    bind_tt:function(){
        console.log("----isclick----xx");
    }
});