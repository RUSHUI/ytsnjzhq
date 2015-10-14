<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, user-scalable=no" />
        <meta name="format-detection" content="telephone=no">
        <meta name="apple-mobile-web-app-status-bar-style" content="white">
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <title></title>
        <?php $basepath = "http://" . $_SERVER ['HTTP_HOST'] . "/brooder/packets/"; ?>
        <?php $rocpath = "http://" . $_SERVER ['HTTP_HOST'] . "/brooder/"; ?>
        <link rel="stylesheet" href="<?php echo $basepath; ?>brooder/style/base.css"/>
        <link rel="stylesheet" href="<?php echo $basepath; ?>brooder/style/font-awesome-min.css"/>
        <style>
            .kk{
                -webkit-perspective: 500px;
                width:300px;
                height:300px;
            }
            .kkk{
                width:300px;
                height:300px;
                background:green;
                /*-webkit-transform:skewX( 20deg) translateX(100%) translate3d(10px,20px,30px)  translateZ(2px ) rotateX(30deg) scale3d(1.1,1.2,1.3) rotate3d(1,1,1,20deg);*/
                /*-webkit-transform-origin:0 50% 0;*/
                /*-webkit-transition:width 2s ease-in;*/
            }
        </style>
        <script src="<?php echo $rocpath; ?>core/brooder.core.js"></script>
        <script>
//            $().ready(function(){
//                $(".kkk").html(navigator.userAgent.toLowerCase());
//                $("<div>"+$.browser.info.kernel+"</div>").appendTo("body");
//            });
            $.packetBasePath("<?php echo $basepath; ?>");
            $.require("brooder.util.math", function (history) {
                var a = false;
                $(".kkk").click(function () {
                    alert($(this).get(0).dataset.aa);
//                    if($(this).get(0).dataset){
//                        $(this).html("====no empty"+$(this).get(0).dataset);
//                    }else{
//                        $(this).html("====");
//                    }
//                    if (!a) {
//                        a = true;
//                        $(this).animate({
//                            width: "800px",
//                            height: "200px"
//                        }).done(function (a, b, c) {
//                            console.log("==========>>%o--%o---%o", this, a, b);
//                        });
//                    } else {
//                        a = false;
//                        $(this).animate({
//                            width: "300px",
//                            height: "300px"
//                        }, {
//                            duration: 300
//                        });
//                    }
                });
            });
        </script>
    </head>
    <body>
        <!--<div class="kk" style='width:300px;height:300px;background:yellow;'></div>-->
        <div class='kk'>
            <div class='kkk' data-aa='cccc'></div>
        </div>
    </body>
</html>
