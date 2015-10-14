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
                    packets: ["brooder.test.ccc"],
                    override: {
                        onendinit: function () {
                            this.addChild({
                                type:"brooder.test.ccc.test"
                            });
                        }
                    }
                });
            });
        </script>
    </head>
    <body></body>
</html>
