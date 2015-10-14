/*!
 * @packet brooder.game.view.draw;
 * @require brooder.game.base;
 * @css brooder.game.css.item;
 * @dom brooder.game.layout.temp;
 */
Module({
    name: "draw",
    extend: "@base.frame",
    className:"drawcls",
    option: {
        frameName:"draw",
        url: "packets/brooder/game/data/drawinit.json"
    },
    layout:domstr("@temp","draw"),
    onoption: function (option) {
    },
    ondomready: function () {
    },
    init: function (option) {
        var ths = this;
        this.postData({
            url: ths.option.url,
           //url:"http://192.168.100.105:8080/turntable/mobile/getTurnInfo.do",
            back: function (data) {
                // alert("抽奖次数初始化成功");
                ths.dom.find(".drawbg .times i").html(data.times);
            },
            dataerror: function (e) {
                console.log("-----获取失败--%o---", e.msg);
            },
            neterror: function (e) {
                console.log("------网络错误--%o----", e.msg);
            }
        });
        ths.deg=-33;
        this.option=option;
        ths.rolling(50);
        ths.dom.find(".pointertext").tap(function(){
            ths.postData({
                url: "packets/brooder/game/data/drawstatus.json",
                back: function (data) {
                    //alert("抽奖状态获取成功");
                    if(data.drawstatus=="1"){
                        ths.rotate();
                    }else{
                        alert("活动已过期");
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
        ths.dom.swipeLeft(function(){
            ths.msgInterval&&clearInterval(ths.msgInterval);
            ths.rollInterval&&clearInterval(ths.rollInterval);
            ths.parentView.gotoAndPlay("workgenre");
            ths.parentView.dom.find(".draw").remove();
        });
        ths.dom.find(".pupwin .cancle").tap(function(){
            ths.dom.find(".pupwin").hide();
        });
        ths.msgInterval=setInterval(function(){
            ths.getmsgData();
        },15000);
    },
    rotate:function(){
        var ths=this,deg=ths.deg,step=5,time=50,v=step/time;
        ths.rotateInteval&&clearInterval(ths.rotateInteval);
        ths.rotateInteval=setInterval(function(){
            deg+=step;
            ths.dom.find(".pointer").css({
                transform:"rotate("+deg+"deg)"
            });
        },time);
        setTimeout(function(){
            time=1;
            ths.rotateInteval&&clearInterval(ths.rotateInteval);
            ths.rotateInteval=setInterval(function(){
                deg+=step;
                ths.dom.find(".pointer").css({
                    transform:"rotate("+deg+"deg)"
                });
            },time);
        },1000);
        setTimeout(function(){
            time=5;step=20;
            ths.rotateInteval&&clearInterval(ths.rotateInteval);
            ths.rotateInteval=setInterval(function(){
                deg+=step;
                ths.dom.find(".pointer").css({
                    transform:"rotate("+deg+"deg)"
                });
            },time);
        },2000);
        setTimeout(function(){
            time=10;step=10;
            ths.rotateInteval&&clearInterval(ths.rotateInteval);
            ths.rotateInteval=setInterval(function(){
                deg+=step;
                ths.dom.find(".pointer").css({
                    transform:"rotate("+deg+"deg)"
                });
            },time);
        },5500);
        setTimeout(function(){
            time=20;step=8;
            ths.rotateInteval&&clearInterval(ths.rotateInteval);
            ths.rotateInteval=setInterval(function(){
                deg+=step;
                ths.dom.find(".pointer").css({
                    transform:"rotate("+deg+"deg)"
                });
            },time);
        },7500);
        setTimeout(function(){
            time=40;step=3;
            ths.rotateInteval&&clearInterval(ths.rotateInteval);
            ths.rotateInteval=setInterval(function(){
                deg+=step;
                ths.dom.find(".pointer").css({
                    transform:"rotate("+deg+"deg)"
                });
                ths.deg=deg;
            },time);
        },9000);

        setTimeout(function(){
            ths.rotateInteval&&clearInterval(ths.rotateInteval);
            ths.popwin(deg);
        },11000);
    },
    popwin:function(deg){
        var ths=this;
        var dengji=deg%360;
        var win=ths.dom.find(".pupwin");
        win.show();
        if((dengji>330&&dengji<360)||(dengji>0&&dengji<30)){
            win.find(".boxfailure").show();
            win.find(".boxsuccess").hide();
            ths.drawpopup(win,0);
        }
        else if(dengji>=30&&dengji<90){
            ths.drawpopup(win,5);
        }
        else if(dengji>=90&&dengji<150){
            ths.drawpopup(win,4);
        }
        else if(dengji>=150&&dengji<210){
            ths.drawpopup(win,3);
        }
         else if(dengji>=210&&dengji<270){
            ths.drawpopup(win,2);
        }
         else if(dengji>=270&&dengji<330){
            ths.drawpopup(win,1);
         }
     },
    drawpopup:function(win,code){
        var ths=this;
        this.postData({
            data:{
                turnid:"0"
            },
            url:"packets/brooder/game/data/drawnum.json",
            back: function (data) {

                if(code){
                    win.find(".boxfailure").hide();
                    win.find(".boxsuccess").show();
                    win.find(".boxsuccess i").html(code);
                }else{
                    win.find(".boxfailure").show();
                    win.find(".boxsuccess").hide();
                } alert("抽奖结果获取成功");
            },
            dataerror: function (e) {
                console.log("-----获取失败--%o---", e.msg);
            },
            neterror: function (e) {
                console.log("------网络错误--%o----", e.msg);
            }
        });
    },
    getmsgData:function(){
        var ths=this;
        this.postData({
            data:{
                turnid:"0"
            },
            url:"packets/brooder/game/data/drawlist.json",
            back: function (data) {
                ths.appendUL(data);
               //alert("即时消息获取成功");
            },
            dataerror: function (e) {
                console.log("-----获取失败--%o---", e.msg);
            },
            neterror: function (e) {
                console.log("------网络错误--%o----", e.msg);
            }
        });
    },

    appendUL:function(data){
        var str="";
        for(var i=0,l=data.length;i<l;i++){
            str+="<li>"+data[i].text+"</li>";
        }
        this.dom.find(".rollingmsg ul").empty();
        this.dom.find(".rollingmsg ul").append(str);
    },
    rolling:function(time){
        var ths=this;
        ths.rollInterval&&clearInterval(ths.rollInterval);
        ths.rollInterval=setInterval(function(){
            var rBox=ths.dom.find(".rollingmsg"),
            outH=rBox.height(),rul=rBox.find("ul"),
            ulH=rul.height(),ulT=parseInt(rul.position().top);
            if(ulT<-ulH){  ulT=outH;  }
            rBox.find("ul").css({
                top:(ulT-1)+"px"
            });
        },time);
    }
});

Option({
    name: "draw" ,
    frameName:"draw"
});
