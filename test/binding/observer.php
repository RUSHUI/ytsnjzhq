<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <?php $basepath = "http://" . $_SERVER ['HTTP_HOST'] . "/brooder/packets/"; ?>
        <?php $rocpath = "http://" . $_SERVER ['HTTP_HOST'] . "/brooder/"; ?>
        <link rel="stylesheet" href="<?php echo $basepath; ?>brooder/style/base.css"/>
        <link rel="stylesheet" href="<?php echo $basepath; ?>brooder/style/font-awesome-min.css"/>
        <script src="<?php echo $rocpath; ?>core/brooder.core.js"></script>
        <script>
            $().ready(function () {
                var appppp="eeeeeeeeeeeeeeeeeeeppp";
                $("body").Boot({basePath: "<?php echo $basepath; ?>"}, {
                    override: {
                        onendinit: function () {
                            $.require("brooder.suger.observer", function (b) {
                                var data={
                                    aa: "aaaaa",
                                    bb: "bbbbb",
                                    ee:"gggg",
                                    dd: {
                                        aa: "xxxx",
                                        ee: "cccc"
                                    },
                                    cc: [
                                        {aa: "xxxaa1", bb: [
                                                {aa: "eeeee11", bb: "rrrrrr"},
                                                {aa: "eeeee12", bb: "rrrrrr"},
                                                {aa: "eeeee13", bb: "rrrrrr"}
                                            ], nn: "xxxxx"},
                                        {aa: "xxxbb2", bb: [
                                                {aa: "eeeee21", bb: "rrrrrr"},
                                                {aa: "eeeee22", bb: "rrrrrr"},
                                                {aa: "eeeee23", bb: "rrrrrr"}
                                            ], nn: "xxxxx"},
                                        {aa: "xxxbb3", bb: [
                                                {aa: "eeeee31", bb: "rrrrrr"},
                                                {aa: "eeeee32", bb: "rrrrrr"},
                                                {aa: "eeeee33", bb: "rrrrrr"}
                                            ], nn: "xxxxx"}
                                    ]
                                };
                                var temp2 = "<div class='k:aa'><%=data.aa;%></div>" +
                                        "<div class='k:dd.aa'><%=data.dd.aa;%></div>"+
                                        "<div class='group'>"+
                                            "<input type='text' data-event='change:xchange'>"+
                                            "<div class='btn' data-event='click:xclick'>xxxxxxxxxx</div>"+
                                        "</div>"+
                                        "<div class='a:cc*'>" +
                                            "<%for(var i in data.cc){%>" +
                                            "<div class='pp' num='<%=i;%>'>"+
                                                "<div class='k:cc*.aa' data-setter='validate:setter|fn:setter' data-getter='cc*' data-event='click:tclick,ttclick' style='line-height:40px;'><%=data.cc[i].aa;%></div>" +
//                                                "<div data-event='click:tclick,ttclick' data-getter='cc*.aa'></div>"+
                                                "<div class='a:cc*.bb*'>"+
                                                    "<%for(var j in data.cc[i].bb){%>"+
                                                        "<div num='<%=j;%>'>"+
                                                        "<div data-event='click:ttclick' class='k:cc*.bb*.aa' style='margin-left:30px;'><%=data.cc[i].bb[j].aa;%></div>"+
                                                        "</div>"+
                                                    "<%}%>"+
                                                "</div>"+
                                            "</div>"+
                                            "<%}%>" +
                                        "</div>" +
                                        "<div class='group'>"+
                                        "<select class='a:cc*'>" +
                                            "<%for(var i in data.cc){%>" +
                                            "<option class='k:cc*.aa'><%=data.cc[i].aa;%></option>" +
                                            "<%}%>" +
                                        "</select>"+
                                        "<select class='a:cc*'>" +
                                            "<%for(var i in data.cc){%>" +
                                            "<option class='o:cc*' data-setter='html|attr:mm'><%=data.cc[i].aa;%></option>" +
                                            "<%}%>" +
                                        "</select>"+
                                        "</div>";
                                var a=$(".kk").autobind({
                                    template:temp2,
                                    data:data,
                                    validate:{
                                        setter:function(a){
                                            console.log(a);
                                            return true;
                                        }
                                    },
                                    setter:{
                                        setter:function(a,b){
//                                            console.log("----%o-----%o-----",a,b);
                                            if(a==="2"){
                                                this.css("background","yellow");
                                            }else{
                                                this.css("background","red");
                                            }
                                        }
                                    },
                                    events:{
                                        xchange:function(data){
                                            data.ee=$(this).val();
                                        },
                                        xclick:function(getter,data){
                                            data.cc.push({aa: data.ee, bb: [
                                                {aa: "eeeee31", bb: "rrrrrr"},
                                                {aa: "eeeee32", bb: "rrrrrr"},
                                                {aa: "eeeee33", bb: "rrrrrr"}
                                            ], nn: "xxxxx"});
                                        },
                                        tclick:function(getter,data,e){
                                            console.log(appppp);
                                            for(var i in data.cc){
                                                if(data.cc[i]===getter){
                                                    data.cc[i].aa="1";
                                                }else{
                                                    data.cc[i].aa="2";
                                                }
                                            }
                                        },
                                        ttclick:function(){
                                            console.log("=============>>>");
                                        },
                                        mclick:function(){}
                                    }
                                });
                                window.a = a.getModelView();
                            });
                        }
                    }
                });
            });
            //callback no dom
            //hook with dom
        </script>
    </head>
    <body>
        <div class="kk">
        </div>
        <!--{aa: "2222222", bb: [{aa: "11111", bb: "33333"}], nn: "44444"}-->
    </body>
</html>
