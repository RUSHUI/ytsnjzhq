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
                $("body").Boot({basePath: "<?php echo $basepath; ?>"}, {
                    override: {
                        onendinit: function () {
                            this.addChild({
                                type: "brooder.test.mvc.mvctest"
                            });
                        }
                    }
                });
            });
        </script>
    </head>
    <body>
        <div class="kk">
        </div>
    </body>
</html>
