/*!
 * @packet brooder.mobi.form;
 * @css brooder.mobi.css.form;
 */
Module({
    name:"field",
    className:"field",
    extend:"view",
    option:{
        label:"",
        name:"",
        value:"",
        kk:""
    },
    getValue:function(){},
    setValue:function(a){},
    check:function(){},
    reset:function(){},
    disable:function(){},
    showError:function(){},
    hideError:function(){}
});
Module({
    name:"text",
    extend:"@.field",
    tagName:"label",
    template:"<div class='text-label'><%=data.label;%></div><input placeholder='<%=data.option.holder;%>' type='text' value='<%=data.value;%>' data-bind='keyup:change'/>",
    option:{
        holder:""
    },
    init:function(option){
        this.render(option);
    },
    bind_change:function(e){
        console.log(e);
    }
});
Module({
    name:"icontext",
    extend:"@.field",
    tagName:"label",
    template:T("<div class='text-icon'><i class='<%=data.option.icon;%>'></i></div>",
                "<div class='text-input'>",
                    "<input placeholder='<%=data.option.holder;%>' type='text' value='<%=data.value;%>' data-bind='keyup:change'/>",
                "</div>"),
    option:{
        icon:"fa fa-person"
    },
    init:function(option){
        this.render(option);
    },
    bind_chage:function(e){
        
    }
});
Module({
    name:"baseform",
    extend:"viewgroup",
    className:"form",
    option:{
        fields:[]
    },
    layout:T("<%for(var i in data.option.fields){%>",
                "<%=module(data.option.fields[i].type,'','field_'+i);%>",
            "<%}%>"),
    onoption:function(option,type,id){
        return this.option.fields[id.split("_")[1]];
    }
});