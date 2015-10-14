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
            .aa{
                height:300px;
                background:yellow;
            }
        </style>
        <script src="<?php echo $rocpath; ?>core/brooder.core.js"></script>
        <script>
            $().ready(function () {
                var a = $().create("video").css({
                    width:"100%"
                }).appendTo(".cc").get(0);
                a.src = "aa.mp4";
                $(".play").click(function () {
                    a.play();
                });
//                var b = $().create("canvas").css({
//                    width: "300px",
//                    height: "300px"
//                }).appendTo("body").get(0);
//                setInterval(function(){
//                    b.getContext("2d").drawImage(a, 0, 0, 300, 300);
//                },30);
            });
        </script>
    </head>
    <body>
        <div class="cc"></div>
        <div class="aa"></div>
    </body>
</html>