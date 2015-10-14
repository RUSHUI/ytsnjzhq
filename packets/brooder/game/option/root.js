/*!
 * @packet brooder.game.option.root;
 * @require brooder.game.base;
 * @require brooder.game.view.workgenre;
 * @css brooder.game.css.icons;
 * @css brooder.game.css.defaults;
 * @dom brooder.game.layout.temp;
 */
 Option({
    name: "login",
    frameName: "login",
    url: "packets/brooder/game/data/login.json",
    override: {
        layout:domstr("@temp","login"),
        find_btn:function(dom){
            var ths=this;
            dom.find(".submit").tap(function () {
                var username = ths.dom.find(".iusername").val(),
                password=ths.dom.find(".ipassword").val();
                if(username===""){alert("用户名不能为空");return ;}
                if(password===""){alert("密码值不能为空");return ;}
                ths.postData({
                    url: ths.option.url,
                    data:{
                        username:username,
                        password:password
                    },
                    back: function (data) {
                        console.log("------登录成功---data：%o--", data);
                        //alert("登录成功");
                        local.set("userInfo",JSON.stringify(data));
                        ths.parentView.addChild({
                            type: "@workgenre.workgenre",
                            option: "@workgenre.workgenre",
                            container: ths.parentView.dom
                        });
                        ths.parentView.gotoAndPlay("workgenre");
                    },
                    dataerror: function (e) {
                        console.log("-----获取失败--%o---", e.msg);
                    },
                    neterror: function (e) {
                        console.log("------网络错误--%o----", e.msg);
                    }
                });
            });
        }
    }
});

Option({
    name: "main",
    frames: [
        Option("@.login")
    ]
});

Option({
    name: "root",
    override: {
        onendinit: function () {
            this.addChild({
                type: "@base.frames",
                option: "@.main",
                container: this.dom
            });
        }
    }
});
