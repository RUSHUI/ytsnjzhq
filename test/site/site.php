<!DOCTYPE html>
<html>
    <head>
        <?php $basepath = "http://" . $_SERVER ['HTTP_HOST'] . "/brooder/"; ?>
        <meta charset="UTF-8">
        <title></title>
        <script src="<?php echo $basepath; ?>brooder/core/core.js"></script>
        <!--<script src="<?php echo $basepath; ?>brooder/view/override.js"></script>-->
        <link rel="stylesheet" href="<?php echo $basepath; ?>brooder/style/base.css"/>
        <script>
            $().ready(function(){
                $("body").Boot({basePath: "<?php echo "http://" .$_SERVER ['HTTP_HOST'] ."/brooder/";?>"},"option.test.site-root");
            });
        </script>
    </head>
    <body>
        <div data-view="brooder.view.test.site" data-parent-view="root" data-view-id="a" data-option="option.test.site">
            <div data-view="brooder.view.test.site" data-parent-view="a" data-view-id="b" data-option="option.test.site">xxx</div>
            <div data-view="brooder.view.test.site" data-parent-view="a" data-view-id="c" data-option="option.test.site">xxx</div>
            <div data-view="brooder.view.test.site" data-parent-view="a" data-view-id="d" data-option="option.test.site">
                <div data-view="brooder.view.test.site" data-parent-view="d" data-view-id="e" data-option="option.test.site">xxx</div>
                <div data-view="brooder.view.test.site" data-parent-view="d" data-view-id="f" data-option="option.test.site">xxx</div>
            </div>
        </div>
    </body>
</html>
