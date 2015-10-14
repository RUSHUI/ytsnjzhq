/*!
 * @packet brooder.view.test;
 * @require brooder.kit.requireA;
 * @require brooder.kit.requireB;
 */
var md={
    name:0
};
Module({
    name:"testrequire",
    extend:"view",
    init:function(){
        this.dom.html("<div class='btn'>test</div>").children(0).click(function(){
            console.log(require("brooder.kit.requireB"));
            console.log(require("brooder.kit.requireA"));
        });
    }
});
Module({
    name:'testscope',
    extend:"view",
    init:function(){
        this.dom.html("<div>testscope</div>").children(0).click(function(){
            md.name=md.name+1;
            console.log(md.name);
        });
    }
});
Module({
    name:"site",
    extend:'viewgroup',
    init:function(option){
        console.log("---------------id-%o-----option-%o----dom-%o---",this.getId(),option,this.dom);
    }
});