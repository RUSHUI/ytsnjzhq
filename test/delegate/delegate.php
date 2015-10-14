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
                $("body").Boot({basePath: "<?php echo $basepath; ?>"}, {
                    override: {
                        onendinit: function () {
//                            this.addChild({
//                                type: "brooder.test.test.delegateEvent"
//                            });
                            this.addChild({
                                type:"brooder.test.test.delegateEventgroup"
                            });
                        }
                    }
                });
            });
        </script>
    </head>
    <body>
        <div class="conn"></div>
    </body>
</html>
