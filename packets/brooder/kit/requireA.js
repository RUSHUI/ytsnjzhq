/*!
 * @packet brooder.kit.requireA;
 * @require brooder.kit.requireB;
 */
var a={
    name:"testAA"
};
module.exports={
    data:a,
    mm:require("brooder.kit.requireB")
};