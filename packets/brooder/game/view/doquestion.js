/*!
 * @packet brooder.game.view.doquestion;
 * @require brooder.game.view.prase;
 * @require brooder.game.base;
 * @require brooder.game.util.touch;
 * @css brooder.game.css.question;
 * @dom brooder.game.layout.temp;
 */
Module({
    name: "doQuestion",
    extend: "@base.frame",
    className:"doQuestion",
    option: {
        frameName:"doQuestion",
        url:"packets/brooder/game/data/nextQuestion.json"
    },
    layout:domstr("@temp","doQuestion"),
    onoption: function (option) {
    },
    ondomready: function () {
    },
    init: function (option) {
        var ths = this;
        ths.count=3;
        this.option=option;
        console.log("--this.dom-----%o------",this.dom);
        this.regEvent();
        ths.getData(function(){
            var st="";
            st+="<div class='qmask'><div class='ttip'>您准备好了吗？<br>倒计时5秒开始答题</div><div class='num'>5<div></div>";
            ths.dom.append(st);
            var num=5,
            c=setInterval(function(){
                num--;
                if(num==0){
                    num="go";
                    ths.dom.find(".qmask .num").css("color","green");
                    c&&clearInterval(c);
                    setTimeout(function(){
                        ths.dom.find(".qmask").hide();
                        ths.owntime();
                    },1000);
                }
                ths.dom.find(".qmask .num").html(num);
            },1000);
        },0);
    },
    getData:function(fn,initf){
        var ths=this,answer=0;
        if(initf){
            answer=ths.collectData();
        }
        var data={
            userName:local.get("userInfo").userName,
            genreId:ths.dom.attr("genreId"),
            answer:answer
        };
        ths.postData({
            data:data,
            url: ths.option.url,
            back: function (data) {
                //alert("获取题目成功");
                if(data.status==1){
                    ths.next(data,fn);
                }else if(data.status==2){
                    alert("您没有权限答题");
                    data.msg&&(function(){
                        alert("msg"+data.msg);
                    })();
                    setTimeout(function(){
                        ths.parentView.gotoAndPlay("workgenre");
                    },1000);

                }else{
                    if(ths.parentView.dom.find(".prasecls").length){
                       ths.parentView.gotoAndPlay("prase");
                   }else{
                    ths.parentView.addChild({
                        type: "@prase.prase",
                        option:"@prase.prase",
                        container:ths.parentView.dom
                    });
                    ths.parentView.dom.find(".prase").attr("data",JSON.stringify(data));
                    ths.parentView.gotoAndPlay("prase");

                   }
                }
            },
            dataerror: function (e) {
                console.log("-----获取失败-----");
            },
            neterror: function (e) {
                console.log("------网络错误------");
            }
        });
    },
    next:function(data,fn){
        var ths=this,
            dom=ths.dom.find(".doQ"),
            section=dom.find("section"),
            box=dom.find(".qbox");
        dom.find("header .gen").html(data.genretype);
        section.find(".status .name").html(data.username);
        section.find(".status .powervalue").html(data.power);
        section.find(".status .workednum").html(data.workednum);
        section.find(".status .errornum").html(data.errornum);
        section.find(".status .rightnum").html(data.rightnum);
        section.find(".qtext .p").html(data.info[0].question);
        section.find(".qtext").attr("qid",data.info[0].qid)
            .attr("qtype",JSON.stringify(data.info[0].type))
            .attr("sequence",data.info[0].sequence);
        var str="",c="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for(var i=0,len=data.info[0].option.length;i<len;i++){
            var text=data.info[0].option[i].label,value=data.info[0].option[i].value;
            str+="<li class='item-list'><div class='serial'>";
            str+=c[i]+"</div><div class='conarea'><div class='content' value='"+value+"'>";
            str+=text+"</div></div></li>";
        }
        box.find(".cur").empty();
        box.find(".cur").append(str);
        var type=data.info[0].type.typenum;
        box.find(".cur li").each(function(){
            var thss=this;
            $(this).touch(function(e){
                if(e.action==="up"){console.log("-------e----%o--%o-",e.timeLast,e.direction);
                    if (!e.ismove&&e.timeLast < 200) {//上下滚动防止冒泡
                        ths.clickEffect(this,box,type);
                        e.preventDefault();//默认行为就是滚动
                        e.stopPropagation();
                    }
                }
            });
        });
        fn&&fn();
    },
    clickEffect:function(ths,box,type){
        var data={};
        if(ths.hasClass("disable")){
            return;
        }
        if(ths.hasClass("active")){
            box.find(".cur li").each(function(){
                $(this).removeClass("disable");
            });
            ths.removeClass("active");
            return;
        }
        if(type=="0"||type=="1"){//判断或者单选
            box.find(".cur li").each(function(){
                $(this).removeClass("active");
                if(type=="1"){
                    $(this).addClass("disable");
                }
            });
        }
       ths.addClass("active").removeClass("disable");
    },
    owntime:function(){
        var ths=this,num=30,step=1;
        ths.timeInterval=setInterval(function(){
            var timestatus=ths.dom.find(".timestatus.pw"),timenum=ths.dom.find(".owntime"),
                w=timestatus.width();
                if(w==50){
                    ths.dom.find(".dialog").html("剩余5秒了，要加油哦").show();
                    timenum.css("color","red");
                    setTimeout(function(){
                        ths.dom.find(".dialog").hide();
                    },2000);
                }else if(w<=0){
                    ths.timeInterval&&clearInterval(ths.timeInterval);
                    ths.dom.find(".dialog").html("下一题").show();
                    setTimeout(function(){
                        ths.dom.find(".dialog").hide();
                    },500);
                    ths.getData(function(){
                         timestatus.width(300);
                         timenum.html(30);
                         timenum.css("color","rgba(255, 255, 255, 0.85)");
                         ths.owntime();
                    },1);
                }
                timestatus.width(w-1);//width=280px;
                step++;
                if(step%10==0){
                    console.log(num--);
                    timenum.html(num);
                }
        },100);
    },
    regEvent:function(){
        var ths=this, data={},timestatus=ths.dom.find(".timestatus.pw"),timenum=ths.dom.find(".owntime");
        this.dom.find(".menu").touch(function(e){
            if (e.action === "up") {
                if (!e.ismove && e.timeLast < 120) {
                    var pw=ths.dom.find(".timestatus.pw"),em=ths.dom.find(".timestatus.em");
                    if(pw.width()==em.width()){
                        ths.dom.append("<div class='mask'><div class='popExit'><div class='y' style='border-bottom: 1px solid white;'>退出答题</div><div class='n'>返回</div></div></div>");
                    }/*else if(pw.width()==0){
                        ths.dom.append("<div class='mask'><div class='popExit'><div class='y' style='border-bottom: 1px solid white;'>退出登录</div><div class='n'>返回</div></div></div>");
                    }*/else{
                        ths.dom.append("<div class='mask'><div class='popExit'><div class='y' style='border-bottom: 1px solid white;'>退出答题</div><div class='n'>返回</div></div></div>");
                    }
                    ths.dom.find(".mask .y").tap(function(e){
                        ths.parentView.gotoAndPlay("workgenre");
                        e.stopPropagation();
                     });
                     ths.dom.find(".mask .n").tap(function(e){
                        ths.dom.find(".mask").remove();
                        e.stopPropagation();
                     });
                     ths.dom.find(".mask").tap(function(e){
                        if (e.action === "up") {
                            if (!e.ismove && e.timeLast < 120) {
                                ths.dom.find(".mask").remove();
                                e.stopPropagation();
                            }
                        }
                     });
                    e.stopPropagation();
                }
               e.stopPropagation();
            }
         });
        this.dom.find(".submitq").tap(function(){
            ths.dom.find(".dialog").html("下一题").show();
            setTimeout(function(){
                ths.dom.find(".dialog").hide();
            },500);
            ths.timeInterval&&clearInterval(ths.timeInterval);
            ths.getData(function(){
                 timestatus.width(300);
                 timenum.html(30);
                 timenum.css("color","rgba(255, 255, 255, 0.85)");
                 ths.owntime();
            },1);
        });
    },
    collectData:function(){
        var ths=this;
        qid=ths.dom.find("section .qtext").attr("qid"),value="",answer=[];
        ths.dom.find(".qbox ul li").each(function(){
            if($(this).hasClass("active")){
                value=$(this).find(".content").attr("value")+";,,;";
            }
        });
        answer.push({
            qid:qid,
            value:value
        });
        return answer;
    },
    submit:function(data){
        var ths=this;
        ths.postData({
            url: ths.option.url,
            back: function (data) {
                console.log("------提交成功---data--",data);
               if(ths.count==0){
                   if(ths.parentView.dom.find(".prasecls").length){
                       ths.parentView.gotoAndPlay("prase");
                   }else{
                    ths.parentView.addChild({
                        type: "@prase.prase",
                        option:"@prase.prase",
                        container:ths.parentView.dom
                    });
                    ths.parentView.gotoAndPlay("prase");
                   }
               }else{
                   ths.drowDom(data);
               }
               ths.parentView.dom.find(".doQuestion").show();
            },
            dataerror: function (e) {

                console.log("-----提交失败-----");
            },
            neterror: function (e) {
                console.log("------网络错误------");
            }
        });
    }
});
Option({
    name: "list" ,
    frameName:"list",
    override: {
        onenterframe: function () {
            //alert("您已经入答题页面，答题倒计时随即开始");
            console.log("-----enter2------");
        },
        onoutframe: function () {
            console.log("-----out2------");
        },
        find_userinfo:function(){
            //点击头像
        },
        find_item:function(dom){
            console.log("-------dom--%o-----",dom);
        },
        find_question:function(dom){
        }
    }
});
Option({
    name: "doQuestion" ,
    frameName:"doQuestion"
});