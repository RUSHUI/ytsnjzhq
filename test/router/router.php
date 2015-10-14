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
            $.packetBasePath("<?php echo $basepath; ?>");
            $.require("brooder.util.router", function (history) {
                history.init("<?php echo $rocpath; ?>").bind({
                    "test/test1": function (e) {
                        console.log("-----test/test1-----%o", e);
                    },
                    "test/test2": function (e) {
                        console.log("-----test/test2-----%o", e);
                    },
                    "test/{key}": function (e) {
                        console.log("-----test/{key}-----%o", e);
                    }
                });
                window.hs = history;
            });
        </script>
    </head>
    <body>
        <div class="kk">
        </div>
    </body>
</html>
