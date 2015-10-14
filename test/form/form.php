<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, user-scalable=no" />
        <meta name="format-detection" content="telephone=no">
        <meta name="apple-mobile-web-app-status-bar-style" content="white">
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <title></title>
        <?php $basepath = "http://" . $_SERVER ['HTTP_HOST'] . "/brooder/packets/"; ?>
        <?php $rocpath = "http://" . $_SERVER ['HTTP_HOST'] . "/brooder/"; ?>
        <link rel="stylesheet" href="<?php echo $basepath; ?>brooder/style/font-awesome-min.css"/>
        <link rel="stylesheet" href="<?php echo $basepath; ?>brooder/style/form.css"/>
        <script src="<?php echo $rocpath; ?>core/brooder.core.js"></script>
        <script>
            $.packetBasePath("<?php echo $basepath; ?>");
            $.require("brooder.util.math", function (history) {});
        </script>
    </head>
    <body>
        <label class='input-multi' style="width:100%;">
            <div class='input-label'>label</div>
            <div class='input-multicon'>
                <div class='input-icon'><i class='fa fa-ils'></i></div>
                <div class='input-box'>
                    <input type="text" placeholder="username"/>
                    <div class='input-msg'>
                        <div class='input-msg-text'>xxxxxxxxxxxxx</div><div class='input-msg-icon'><i class='fa fa-bolt'></i></div>
                    </div>
                </div>
                <div class='input-icon'><i class='fa fa-ils'></i></div>
            </div>
        </label>
        <label class='input' style="width:100%;">
            <div class='input-label'>label</div>
            <input type="text" placeholder="username"/>
            <div class='input-msg'>
                <div class='input-msg-text'>xxxxxxxxxxxxx</div><div class='input-msg-icon'><i class='fa fa-bolt'></i></div>
            </div>
        </label>
        <label class='input' style="width:100%;">
            <div class='input-label'>label</div>
            <input type="text" placeholder="username"/>
            <div class='input-msg'>
                <div class='input-msg-text'>xxxxxxxxxxxxx</div><div class='input-msg-icon'><i class='fa fa-bolt'></i></div>
            </div>
        </label>
        <label class='input'>
            <div class='input-label'>label</div>
            <select>
                <option>hello world</option>
                <option>hello world</option>
                <option>hello world</option>
                <option>hello world</option>
            </select>
            <div class='input-msg'>
                <div class='input-msg-text'>xxxxxxxxxxxxx</div><div class='input-msg-icon'><i class='fa fa-bolt'></i></div>
            </div>
        </label>
        <label class='input'>
            <div class='input-label'>label</div>
            <textarea placeholder="text"></textarea>
            <div class='input-msg'>
                <div class='input-msg-text'>xxxxxxxxxxxxx</div><div class='input-msg-icon'><i class='fa fa-bolt'></i></div>
            </div>
        </label>
    </body>
</html>
