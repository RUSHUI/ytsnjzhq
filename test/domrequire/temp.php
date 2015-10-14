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
                $.ajax({
                    url: "<?php echo $rocpath; ?>test/domrequire/temp.html",
                    dataType: "text"
                }).done(function (a) {
                    var _a=new Date().getTime();
                    var b = a.split("\r\n"), c = {};
                    var current = [],before="";
                    b.forEach(function (w,i) {
                        if (w.indexOf("<!--") === 0) {
                            if(current.length!==0){
                                c[before] = current.join("");
                                current = [];
                                before=w.substring(4, w.length - 3);
                            }else{
                                before=w.substring(4, w.length - 3);
                            }
                        } else {
                            current.push(w.trim());
                        }
                        if(i===b.length-1){
                            c[before] = current.join("");
                        }
                    });
                    console.log(c);
                    console.log((new Date().getTime())-_a);
                });
            });
        </script>
    </head>
    <body>
        <div class="kk">
        </div>
    </body>
</html>
