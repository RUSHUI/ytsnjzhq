<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, user-scalable=no" />
        <meta name="format-detection" content="telephone=no">
        <meta name="apple-mobile-web-app-status-bar-style" content="white">
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <title></title>
        <style>
            .bg{
                position: absolute;
                left:0;
                top:0;
                right:0;
                bottom:0;
                background:url(packets/brooder/mobi/images/brooder.png) no-repeat center 100px white;
            }
        </style>
        <script src="core/brooder.core.js"></script>
        <!--<script src="packets/brooder/view/override.js"></script>-->
        <script>
            $().ready(function(){
                $("body").Boot({basePath: "<?php echo "http://" .$_SERVER ['HTTP_HOST'] ."/rs/brooder/packets/";?>"},"brooder.mobi.option.root.root");
            });
        </script>
    </head>
    <body><div class="bg"></div></body>
</html>
