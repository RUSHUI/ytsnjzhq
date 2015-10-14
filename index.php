<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <script src="core/brooder.core.js"></script>
        <script src="packets/brooder/view/override.js"></script>
        <script>
            $().ready(function(){
                $("body").Boot({basePath: "<?php echo "http://" .$_SERVER ['HTTP_HOST'] ."/rs/brooder/packets/";?>"},"option.root.root");
            });
        </script>
    </head>
    <body></body>
</html>
