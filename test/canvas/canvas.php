<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <?php $basepath = "http://" . $_SERVER ['HTTP_HOST'] . "/brooder/packets/"; ?>
        <?php $rocpath = "http://" . $_SERVER ['HTTP_HOST'] . "/brooder/"; ?>
        <script src="<?php echo $rocpath; ?>core/brooder.core.js"></script>
        <script>
            $().ready(function () {
                $("body").Boot({basePath: "<?php echo $basepath; ?>"}, {
                    override: {
                        layout: "<div class='xxx' style='width:300px;height:300px;'></div>",
                        onendinit: function () {
                            $.require("brooder.util.canvas", function (canvas) {
                                var a = $(".xxx").display();
                                console.log(a);
                                var b = canvas.create("SquartDisplay", {
                                    id: "aa",
                                    width: 100,
                                    height: 100,
                                    onMouseEvent: function () {
                                        console.log("---------------->>>");
                                    }
                                });
                                var m = canvas.create("DisplayObjectContainer", {
                                    id: "bbb",
                                    width: 100,
                                    height: 100,
                                    x: 10,
                                    y: 10,
                                    onenterframe: function () {
                                        if (this.x() > this.parent().width()) {
                                            this.x(0);
                                        }
                                        this.getChildAt(0).rotatePoint(15, 15).rotate(this.getChildAt(0).rotate() + 10);
                                        this.x(this.x() + 3);
                                    }
                                }).addChild({
                                    displayType: "SquartDisplay",
                                    id: "bb2",
                                    width: 30,
                                    height: 30,
                                    x: 40,
                                    y: 40,
                                    rotate: 0,
                                    backgroundColor: "red",
                                    onclick: function (e) {
                                        console.log("-------------wwwwwwwww%o", e);
                                    }
                                });
                                var e = canvas.create("DisplayObjectContainer", {
                                    id: "bb",
                                    width: 200,
                                    height: 200,
                                    alpha: 0.2,
                                    x: 150,
                                    y: 150,
                                    onclick: function (e) {
                                        console.log("-------------LLLLLLLLLLLL%o", e);
                                    }
                                }).addChild({
                                    displayType: "SquartDisplay",
                                    id: "bb1",
                                    width: 200,
                                    height: 200,
                                    backgroundColor: "black",
                                    opacity: 0.2,
                                    onenterframe: function () {
                                        console.log("----------");
                                        if (this.y() >= this.parent().height()) {
                                            this.y(0);
                                        } else {
                                            this.y(this.y() + 3);
                                        }
                                    }
                                }).addChild(m);
                                var c = canvas.create("SquartDisplay", {
                                    id: "cc",
                                    width: 50,
                                    height: 50,
                                    x: 50,
                                    y: 50,
                                    rotate: 45,
                                    backgroundColor: "yellow"
                                });
                                a.addChild(b).addChild(c).addChild({
                                    displayType: "SquartDisplay",
                                    id: "dd",
                                    width: 30,
                                    height: 30,
                                    x: 80,
                                    y: 80,
                                    rotate: 30,
                                    backgroundColor: "green"
                                }).addChild(e);
                                window.bigsquart = e;
                                window.root = a;
                            });
                        }
                    }
                });
            });
        </script>
    </head>
    <body></body>
</html>
