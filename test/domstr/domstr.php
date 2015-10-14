<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, user-scalable=no" />
        <meta name="format-detection" content="telephone=no">
        <meta name="apple-mobile-web-app-status-bar-style" content="white">
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <?php $basepath = "http://" . $_SERVER ['HTTP_HOST'] . "/brooder/packets/"; ?>
        <?php $rocpath = "http://" . $_SERVER ['HTTP_HOST'] . "/brooder/"; ?>
        <link rel="stylesheet" href="<?php echo $basepath; ?>brooder/style/base.css"/>
        <link rel="stylesheet" href="<?php echo $basepath; ?>brooder/style/font-awesome-min.css"/>
        <script src="<?php echo $rocpath; ?>core/brooder.core.js"></script>
        <script>
            $().ready(function () {
                $.packetBasePath("<?php echo $basepath; ?>");
                $.require("brooder.suger.domstr", function () {
                    $(".conn").templater("<div class='btn' data-event='click:btn1'><%=data.btnname;%></div>" +
                            "<div class='btn' data-event='click:btn2'><%=data.btnname2;%></div>" +
                            "<div class='btn' data-event='click:btn3'><%=data.btnname3;%></div>", {
                                oninit: function () {
                                    console.log("---init---");
                                },
                                onbeforerender: function () {
                                    console.log("---before render---");
                                },
                                onendrender: function () {
                                    console.log("---end render---");
                                },
                                event_btn1: function () {
                                    console.log("---btn1---");
                                },
                                event_btn2: function () {
                                    console.log("---btn2---");
                                },
                                event_btn3: function () {
                                    console.log("---btn3---");
                                }
                            }).render({btnname: "xxxxx", btnname2: "xxxxx2", btnname3: "xxxxx3"});
                });
            });
        </script>
    </head>
    <body>
        <div class="conn"></div>
    </body>
</html>
