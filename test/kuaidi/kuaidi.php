<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <script src="brooder/core/core.js"></script>
        <script src="brooder/view/override.js"></script>
        <link rel="stylesheet" href="brooder/style/base.css"/>
        <link rel="stylesheet" href="brooder/style/font-awesome-min.css"/>
        <style>
            .kd{
                border:1px solid #D7D7D7;
                background:white;
                margin:5px;
            }
            .kd>div:first-child{
                line-height:30px;
                padding:0 10px 0 10px;
            }
            .kd>div:last-child{
                background:#F5FAF5;
                border-top:1px solid #D7D7D7;
            }
            .row{
                padding:0 10px 0 10px;
                margin:5px 0 5px 0;
                line-height: 30px;
            }
            .time{
                font-size: 12px;
                margin-left:20px;
            }
            .loading{
                text-align: center;
                line-height: 30px;
            }
        </style>
        <script>
            $().ready(function(){
                $(".kd").each(function(){
                    $(this).children(0).click(function(){
                        var ths=$(this);
                        ths.parent().find(".content").html("<div class='loading'><i class='fa fa-refresh fa-spin'></i></div>");
                        $.ajax({
                            url:"whereisit.php",
                            dataType:"json",
                            data:{
                                type:$(this).attr("type"),
                                code:$(this).attr("code"),
                                temp:new Date().getTime()
                            },
                            success:function(e){
                                var a="";
                                if(e.data){
                                    for(var i in e.data){
                                        a+="<div class='row'>"+
                                                "<div class='context'>"+e.data[i].context+"</div>"+
                                                "<div class='time'>"+e.data[i].time+"</div>"+
                                            "</div>";
                                    }
                                }
                                ths.parent().find(".content").html(a);
                            }
                        });
                    });
                });
            });
        </script>
    </head>
    <body>
        <div class='kd'>
            <div type='yuantong' code='800134418694'>800134418694</div>
            <div class='content'></div>
        </div>
        <div class='kd'>
            <div type='ems' code='5150490053301'>5150490053301</div>
            <div class='content'></div>
        </div>
        <div class='kd'>
            <div type='yuantong' code='880005780959440759'>880005780959440759</div>
            <div class='content'></div>
        </div>
        <div class='kd'>
            <div type='shentong' code='968001077419'>968001077419</div>
            <div class='content'></div>
        </div>
    </body>
</html>
