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
                width:100px;
                /*height:50px;*/
                display:-webkit-flex;
                -webkit-flex-flow: row nowrap;
            }
            .kkk{
                width:50px;
                height:50px;
                background:green;
                /*float:left;*/
            }
            .kkk2{
                -webkit-flex:1;
                height:50px;
                background:yellow;
            }
        </style>
        <script src="<?php echo $rocpath; ?>core/brooder.core.js"></script>
        <script>
            $.packetBasePath("<?php echo $basepath; ?>");
            $.require("brooder.util.math", function (history) {
            });
        </script>
    </head>
    <body>
        <div class='kk'>
            <div class='kkk'></div>
            <input class="kkk2" type="text"/>
        </div>
    </body>
</html>
