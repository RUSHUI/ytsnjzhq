/*!
 * @packet brooder.test.ccc;
 * @require brooder.test.test:nn;
 * @require brooder.test.test.test:mm;
 */
Module({
    name:"test",
    extend:'view',
    init:function(){
        console.log("brooder.test.test");
        console.log("@.aa");
        console.log("@mm.aa");
        console.log("@nn.aa");
        console.log("@nn");
    }
});