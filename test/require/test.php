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
                    packets: ["brooder.view.test"],
                    override: {
                        onendinit: function () {
                            this.addChild({
                                type:"brooder.view.test.testscope"
                            });
                            this.addChild({
                                type:"brooder.view.test.testscope"
                            });
                        }
                    }
                });
//                $.packet({
//                    basepath: "<?php echo $basepath; ?>",
//                    packetName: "brooder.kit.requireA",
//                    back: function () {
//                        console.log($.require("brooder.kit.requireA"));
//                    }
//                });
//                $.packetBasePath("<?php echo $basepath; ?>");
//                $.require("brooder.kit.requireA",function(exports,require){
//                    console.log(exports);
//                    console.log(require("brooder.kit.requireA"));
//                });
            });
        </script>
    </head>
    <body></body>
</html>
