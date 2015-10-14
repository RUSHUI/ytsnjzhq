<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <base href="http://localhost/brooder/" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, user-scalable=no" />
        <meta name="format-detection" content="telephone=no">
        <meta name="apple-mobile-web-app-status-bar-style" content="white">
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <title>game</title>
        <style  type="text/css">
            body,html{
                height: 100%;
                margin: 0;
                padding: 0;
            }
            .startpage {
                background: #ffc3c3 url(packets/brooder/game/imgs/loading.jpg) center center;
                height: 100%;
                background-size: cover;
                position: relative;
            }
            .startpage .progress {
                width: 80%;
                position: fixed;
                height: 200px;
                left: 10%;
                bottom: 5px;
            }
            .startpage .loading {
                position: absolute;
                width: 100%;
                height: 20px;
                left: 0px;
                bottom: 82px;
                border-radius: 20px;
                background: rgb(42, 78, 103);
                z-index: 1;
            }
            .startpage .loading.progressnum {
                background: rgb(111, 174, 236);
                z-index: 2;
            }
            .startpage .progressnum .people {
                background-image: url(packets/brooder/game/imgs/loading_head_03.png);
                background-size: cover;
                width: 60px;
                height: 100px;
                right: -30px;
                bottom: 20px;
                display: inline-block;
            }
            .startpage .progressnum div {
                position: absolute;
            }
            .startpage .loadingtext{
                text-align: center;
                position: absolute;
                width: 100%;
                height: 25px;
                left: 0px;
                bottom: 45px;
                color: #777;
            }
        </style>
        <script src="core/brooder.core.js"></script>
        <script src="packets/brooder/game/util/local.js"></script>
        <script src="packets/brooder/game/util/touch.js"></script>
        <script>
            var list=[
                    { "genreName":"核心价值观", "genreId":"1000",x:0,y:720},
                    { "genreName":"党知识",     "genreId":"1001",x:0,y:960},
                    { "genreName":"计算机",     "genreId":"1002",x:0,y:320},
                    {"genreName":"质量",        "genreId":"1003",x:0,y:560},
                    {"genreName":"办公",        "genreId":"1004",x:0,y:160},
                    {"genreName":"知识产权",    "genreId":"1005",x:0,y:0},
                    {"genreName":"医疗",        "genreId":"1006",x:0,y:80},
                    {"genreName":"运动休闲",    "genreId":"1007",x:0,y:400},
                    {"genreName":"工会",        "genreId":"1008",x:0,y:240},
                    {"genreName":"共青团",      "genreId":"1009",x:0,y:880},
                    {"genreName":"计生",        "genreId":"1010",x:0,y:800},
                    {"genreName":"女工",        "genreId":"1011",x:0,y:640},
                    {"genreName":"英语",        "genreId":"1012",x:0,y:480}
                ];
                local.set("workgenrelist",list);
            $().ready(function () {
                $.loader().load({//load方法的参数一，要加载的资源
                    image: ["packets/brooder/game/imgs/Q&A_03.png", "packets/brooder/game/imgs/Q&A_p_03.png",
                        "packets/brooder/game/imgs/Q&Abg_03.png", "packets/brooder/game/imgs/gzchoice.png",
                        "packets/brooder/game/imgs/gzlist.png", "packets/brooder/game/imgs/head_03.jpg",
                        "packets/brooder/game/imgs/hero_02.jpg", "packets/brooder/game/imgs/icons.png",
                        "packets/brooder/game/imgs/loading.jpg", "packets/brooder/game/imgs/loading_head_03.png",
                        "packets/brooder/game/imgs/login_03.png", "packets/brooder/game/imgs/popup.png"
                    ]
                }, function () {//参数二，加载完执行的方法
                    setTimeout(function () {
                        $("body").empty();
                        $("body").Boot({basePath: "packets/"}, "brooder.game.option.root.root");
                    }, 500);
                }, function (e) {//参数三，提供加载进度回调函数
                    $(".progressnum").width(e.progress + "%");
                    var loadTipEle = $(".loadingtext");
                    e.progress === 100 ? loadTipEle.html("加载完成") : loadTipEle.html("加载中，完成<span style='width:50px;'>" + e.progress + "%</span>");
                });
            });
        </script>
    </head>
    <body>
        <div class="startpage">
            <div class="progress">
                <div class="loading progressnum"><div class="people"></div></div>
                <div class="loading"></div>
                <div class="loadingtext"></div>
            </div>
        </div>
    </body>
</html>
