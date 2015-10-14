<!DOCTYPE html>
<html>
    <head>
        <?php $basepath = "http://" . $_SERVER ['HTTP_HOST'] . "/brooder/packets/"; ?>
        <?php $rocpath = "http://" . $_SERVER ['HTTP_HOST'] . "/brooder/"; ?>
        <meta charset="UTF-8">
        <title></title>
        <link rel="stylesheet" href="<?php echo $basepath; ?>brooder/style/base.css"/>
        <script src="<?php echo $rocpath; ?>lib/jquery172.min.js"></script>
        <script src="<?php echo $rocpath; ?>core/site/jquery.brooder.js"></script>
        <!--<script src="<?php echo $basepath; ?>brooder/view/form.js"></script>-->
        <!--<script src="<?php echo $basepath; ?>brooder/view/group.js"></script>-->
        <script>
            $().ready(function(){
                $("body").Boot({basePath: "<?php echo "http://" .$_SERVER ['HTTP_HOST'] ."/brooder/";?>"},"option.sitetest.site");
            });
        </script>
    </head>
    <body>
        <div data-view="brooder.view.test.site" data-parent-view="root" data-view-id="a" data-option="option.sitetest.site">
            <div data-view="brooder.view.test.site" data-parent-view="a" data-view-id="b" data-option="option.sitetest.site">xxx</div>
            <div data-view="brooder.view.test.site" data-parent-view="a" data-view-id="c" data-option="option.sitetest.site">xxx</div>
            <div data-view="brooder.view.test.site" data-parent-view="a" data-view-id="d" data-option="option.sitetest.site">
                <div data-view="brooder.view.test.site" data-parent-view="d" data-view-id="e" data-option="option.sitetest.site">xxx</div>
                <div data-view="brooder.view.test.site" data-parent-view="d" data-view-id="f" data-option="option.sitetest.site">xxx</div>
            </div>
        </div>
    </body>
</html>
