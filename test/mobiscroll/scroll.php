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
        <style>
            .con{
                /*background:#5F5858;*/
            }
            .cell{
                border-bottom: 1px solid #D7D7D7;
                background:white;
            }
            .pic{
                display: inline-block;
                vertical-align: top;
                padding:5px;
                width:300px;
                height:350px;
                margin:10px;
                background-size: cover;
            }
            .n{
                display: inline-block;
                margin:10px 0 10px 0;
            }
            .a{
                line-height: 30px;
                font-size: 13px;
            }
            .b{
                line-height: 20px;
                font-size: 12px;
            }
        </style>
        <script src="<?php echo $rocpath; ?>core/brooder.core.js"></script>
        <script>
            $().ready(function () {
                var load=function(){
                    $.ajax({
                        url:"<?php echo $rocpath;?>data/scroll.json?tp="+new Date().getTime(),
                        dataType:"json",
                        success:function(e){
                            for(var i in e.data){
                                $("<div class='cell'>"+
                                        "<div class='pic' style='background-image:url(<?php echo $rocpath;?>"+e.data[i].icon+")'></div>"+
                                        "<div class='n'>"+
                                            "<div class='a'>"+e.data[i].name+"</div>"+
                                            "<div class='b'>"+e.data[i].time+"</div>"+
                                        "</div>"+
                                    "</div>").appendTo(".conn");
                            }
                        }
                    });
                };
                $(".con").bind("scroll",function(){
                    if($(this).scrollTop()===$(this).children(0).height()-$(this).height()){
                        $(this).scrollTop(0);
//                        load();
                    }
                });
                load();
            });
        </script>
    </head>
    <body>
        <div class="con" style="position: absolute;left:0;top:50px;right:0;bottom:0;overflow-x: hidden;overflow-y: auto;-webkit-overflow-scrolling:touch">
            <div class="conn"></div>
        </div>
    </body>
</html>
