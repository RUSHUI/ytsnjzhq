<!DOCTYPE html>
<html lang="en">
    <link rel="stylesheet" href="packets/brooder/style/font-awesome-min.css"/>
    <link rel="stylesheet" href="packets/brooder/style/base.css"/>
    <style>
        ul{
            list-style: none;
        }
        .icon{
            width:120px;
            height:120px;
            display: inline-block;
            background:white;
            margin:5px;
            border:1px solid #E8E7E8;
        }
        .icon .ico{
            width:120px;
            font-size:35px;
            line-height:100px;
            text-align: center;
            color:#333333;
            -webkit-user-select: none;
        }
        .icon .name{
            width:120px;
            font-size:12px;
            text-align: center;
            line-height:20px;
            height:20px;
            background:#F2F2F2;
            text-overflow: ellipsis;
            overflow: hidden;
        }
        h2{
            line-height:40px;
            font-size:18px;
            padding:0 5px 0 5px;
        }
        .a{
            line-height:40px;
            border-bottom: 1px solid #D7D7D7;
            padding:0 10px 0 10px;
            background:#2ABF9F;
            color:white;
            z-index: 99999;
            position: absolute;
            left:0;
            right:0;
            top:0;
        }
        .b{
            position: absolute;
            right:0;
            left:300px;
            top:41px;
            bottom:44px;
            overflow: auto;
            background:#FAFAFA;
            -webkit-transition:all .5s ease-out;
            z-index:999;
        }
        .c{
            position: absolute;
            left:300px;
            right:0;
            bottom:0;
            padding:5px;
            text-align: center;
            border-top:1px solid #D7D7D7;
            background:white;
            -webkit-transition:all .5s ease-out;
            z-index: 1000;
        }
        .d{
            position: absolute;
            left:0;
            top:41px;
            bottom:0;
            width:289px;
            background:white;
            overflow: auto;
            border-right:1px solid #D7D7D7;
            -webkit-transition:all .5s ease-out;
        }
        .e{
            position: absolute;
            top:41px;
            bottom:0;
            left:290px;
            width:9px;
            border-right:1px solid #D7D7D7;
            -webkit-transition:all .5s ease-out;
            -webkit-box-shadow: 0 0 10px #D7D7D7;
            font-size: 12px;
        }
        .e i{
            position: absolute;
            left:0;
            right:0;
            top:50%;
        }
        .e:hover{
            background:#E9EFF8;
        }
        .close .b{
            left:10px;
        }
        .close .c{
            left:10px;
        }
        .close .d{
        }
        .close .e{
            left:0;
        }
        .close .e i{
            -webkit-transform:rotate(180deg);
        }
    </style>
    <script src="core/brooder.core.js"></script>
    <script>
        var w3select = {
            paper: null,
            paperdoc: null,
            getSelection: function () {
                var selection = null;
                selection = this.paper.getSelection();
                return selection;
            },
            getRanges: function () {
                var storedSelections = [];
                var currSelection = this.paper.getSelection();
                for (var i = 0; i < currSelection.rangeCount; i++) {
                    storedSelections.push(currSelection.getRangeAt(i));
                }
                return storedSelections;
            },
            resetRange: function (storedSelections) {
                var currSelection = this.paper.getSelection();
                currSelection.removeAllRanges();
                for (var i = 0; i < storedSelections.length; i++) {
                    currSelection.addRange(storedSelections[i]);
                }
                return this;
            },
            getRange: function () {
                return this.getSelection().getRangeAt(0);
            },
            cleanSelection: function () {
                this.getSelection().removeAllRanges();
            },
            refreshSelect: function (range) {
                this.paper.focus();
                if (range) {
                    var selection = this.getSelection();
                    selection.removeAllRanges();
                    selection.addRange(range);
                }
                return this;
            },
            selectNode: function (node) {
                var range = this.getSelection().getRangeAt(0);
                range.selectNode(node);
                this.refreshSelect(range);
                return this;
            }
        };
        $().ready(function () {
            $('.sortlist').click(function () {
                $(this).toggleClass("open");
            });
            $(".droplist div").each(function () {
                $(this).click(function () {
                    var target = $(this).attr("target");
                    $(".b").scrollingTop($("#" + target).get(0).offsetTop);
                });
            });
            $(".searchinput").bind("keyup", function () {
                var val = $(this).val();
                $(".name").each(function () {
                    if ($(this).html().indexOf(val) !== -1) {
                        $(this).parent().show();
                    } else {
                        $(this).parent().hide();
                    }
                });
            });
            $(".e").click(function () {
                $("body").toggleClass("close");
            });
            w3select.paper = window;
            $(".icon").each(function () {
                $(this).click(function () {
                    w3select.selectNode($(this).find(".name").get(0));
                });
            });
        });
    </script>
    <body class='close'>
        <div class="a"><a style="color:white;" target="_blank" href="http://fortawesome.github.io/Font-Awesome/icons/">Fontawesome</a> The complete set of 479 icons in Font Awesome 4.2.0</div>
        <div class='d'>
            <ul>
                <li><i class="fa fa-camera-retro fa-lg"></i> fa-lg</li>
                <li><i class="fa fa-camera-retro fa-2x"></i> fa-2x</li>
                <li><i class="fa fa-camera-retro fa-3x"></i> fa-3x</li>
                <li><i class="fa fa-camera-retro fa-4x"></i> fa-4x</li>
                <li><i class="fa fa-camera-retro fa-5x"></i> fa-5x</li>
            </ul>
            <ul>
                <li><i class="fa fa-spinner fa-spin"></i> fa fa-spinner fa-spin</li>
                <li><i class="fa fa-circle-o-notch fa-spin"></i> fa fa-circle-o-notch fa-spin</li>
                <li><i class="fa fa-refresh fa-spin"></i> fa fa-refresh fa-spin</li>
                <li><i class="fa fa-cog fa-spin"></i> fa fa-cog fa-spin</li>
            </ul>
            <ul>
                <li><i class="fa fa-shield"></i> normal</li>
                <li><i class="fa fa-shield fa-rotate-90"></i> fa-rotate-90</li>
                <li><i class="fa fa-shield fa-rotate-180"></i> fa-rotate-180</li>
                <li><i class="fa fa-shield fa-rotate-270"></i> fa-rotate-270</li>
                <li><i class="fa fa-shield fa-flip-horizontal"></i> fa-flip-horizontal</li>
                <li><i class="fa fa-shield fa-flip-vertical"></i> icon-flip-vertical</li>
            </ul>
            <ul>
                <li><i class="fa fa-quote-left fa-3x pull-left fa-border"></i> fa-3x pull-left fa-border</li>
            </ul>
        </div>
        <div class="b">
            <section id="new">
                <h2 class="page-header">40 New Icons in 4.2</h2>
                <div class="row fontawesome-icon-list">
                    <div class="icon"><div class='ico'><i class="fa fa-angellist"></i></div><div class='name'>fa-angellist</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-area-chart"></i></div><div class='name'>fa-area-chart</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-at"></i></div><div class='name'>fa-at</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-bell-slash"></i></div><div class='name'>fa-bell-slash</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-bell-slash-o"></i></div><div class='name'>fa-bell-slash-o</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-bicycle"></i></div><div class='name'>fa-bicycle</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-binoculars"></i></div><div class='name'>fa-binoculars</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-birthday-cake"></i></div><div class='name'>fa-birthday-cake</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-bus"></i></div><div class='name'>fa-bus</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-calculator"></i></div><div class='name'>fa-calculator</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-cc"></i></div><div class='name'>fa-cc</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-cc-amex"></i></div><div class='name'>fa-cc-amex</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-cc-discover"></i></div><div class='name'>fa-cc-discover</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-cc-mastercard"></i></div><div class='name'>fa-cc-mastercard</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-cc-paypal"></i></div><div class='name'>fa-cc-paypal</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-cc-stripe"></i></div><div class='name'>fa-cc-stripe</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-cc-visa"></i></div><div class='name'>fa-cc-visa</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-copyright"></i></div><div class='name'>fa-copyright</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-eyedropper"></i></div><div class='name'>fa-eyedropper</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-futbol-o"></i></div><div class='name'>fa-futbol-o</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-google-wallet"></i></div><div class='name'>fa-google-wallet</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-ils"></i></div><div class='name'>fa-ils</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-ioxhost"></i></div><div class='name'>fa-ioxhost</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-lastfm"></i></div><div class='name'>fa-lastfm</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-lastfm-square"></i></div><div class='name'>fa-lastfm-square</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-line-chart"></i></div><div class='name'>fa-line-chart</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-meanpath"></i></div><div class='name'>fa-meanpath</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-newspaper-o"></i></div><div class='name'>fa-newspaper-o</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-paint-brush"></i></div><div class='name'>fa-paint-brush</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-paypal"></i></div><div class='name'>fa-paypal</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-pie-chart"></i></div><div class='name'>fa-pie-chart</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-plug"></i></div><div class='name'>fa-plug</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-shekel"></i></div><div class='name'>fa-shekel <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-sheqel"></i></div><div class='name'>fa-sheqel <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-slideshare"></i></div><div class='name'>fa-slideshare</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-soccer-ball-o"></i></div><div class='name'>fa-soccer-ball-o <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-toggle-off"></i></div><div class='name'>fa-toggle-off</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-toggle-on"></i></div><div class='name'>fa-toggle-on</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-trash"></i></div><div class='name'>fa-trash</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-tty"></i></div><div class='name'>fa-tty</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-twitch"></i></div><div class='name'>fa-twitch</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-wifi"></i></div><div class='name'>fa-wifi</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-yelp"></i></div><div class='name'>fa-yelp</div></div>
                </div>
            </section>

            <section id="web-application">
                <h2 class="page-header">Web Application Icons</h2>
                <div class="row fontawesome-icon-list">
                    <div class="icon"><div class='ico'><i class="fa fa-adjust"></i></div><div class='name'>fa-adjust</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-anchor"></i></div><div class='name'>fa-anchor</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-archive"></i></div><div class='name'>fa-archive</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-area-chart"></i></div><div class='name'>fa-area-chart</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-arrows"></i></div><div class='name'>fa-arrows</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-arrows-h"></i></div><div class='name'>fa-arrows-h</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-arrows-v"></i></div><div class='name'>fa-arrows-v</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-asterisk"></i></div><div class='name'>fa-asterisk</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-at"></i></div><div class='name'>fa-at</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-automobile"></i></div><div class='name'>fa-automobile <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-ban"></i></div><div class='name'>fa-ban</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-bank"></i></div><div class='name'>fa-bank <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-bar-chart"></i></div><div class='name'>fa-bar-chart</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-bar-chart-o"></i></div><div class='name'>fa-bar-chart-o <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-barcode"></i></div><div class='name'>fa-barcode</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-bars"></i></div><div class='name'>fa-bars</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-beer"></i></div><div class='name'>fa-beer</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-bell"></i></div><div class='name'>fa-bell</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-bell-o"></i></div><div class='name'>fa-bell-o</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-bell-slash"></i></div><div class='name'>fa-bell-slash</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-bell-slash-o"></i></div><div class='name'>fa-bell-slash-o</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-bicycle"></i></div><div class='name'>fa-bicycle</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-binoculars"></i></div><div class='name'>fa-binoculars</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-birthday-cake"></i></div><div class='name'>fa-birthday-cake</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-bolt"></i></div><div class='name'>fa-bolt</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-bomb"></i></div><div class='name'>fa-bomb</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-book"></i></div><div class='name'>fa-book</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-bookmark"></i></div><div class='name'>fa-bookmark</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-bookmark-o"></i></div><div class='name'>fa-bookmark-o</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-briefcase"></i></div><div class='name'>fa-briefcase</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-bug"></i></div><div class='name'>fa-bug</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-building"></i></div><div class='name'>fa-building</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-building-o"></i></div><div class='name'>fa-building-o</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-bullhorn"></i></div><div class='name'>fa-bullhorn</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-bullseye"></i></div><div class='name'>fa-bullseye</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-bus"></i></div><div class='name'>fa-bus</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-cab"></i></div><div class='name'>fa-cab <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-calculator"></i></div><div class='name'>fa-calculator</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-calendar"></i></div><div class='name'>fa-calendar</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-calendar-o"></i></div><div class='name'>fa-calendar-o</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-camera"></i></div><div class='name'>fa-camera</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-camera-retro"></i></div><div class='name'>fa-camera-retro</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-car"></i></div><div class='name'>fa-car</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-caret-square-o-down"></i></div><div class='name'>fa-caret-square-o-down</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-caret-square-o-left"></i></div><div class='name'>fa-caret-square-o-left</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-caret-square-o-right"></i></div><div class='name'>fa-caret-square-o-right</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-caret-square-o-up"></i></div><div class='name'>fa-caret-square-o-up</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-cc"></i></div><div class='name'>fa-cc</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-certificate"></i></div><div class='name'>fa-certificate</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-check"></i></div><div class='name'>fa-check</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-check-circle"></i></div><div class='name'>fa-check-circle</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-check-circle-o"></i></div><div class='name'>fa-check-circle-o</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-check-square"></i></div><div class='name'>fa-check-square</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-check-square-o"></i></div><div class='name'>fa-check-square-o</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-child"></i></div><div class='name'>fa-child</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-circle"></i></div><div class='name'>fa-circle</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-circle-o"></i></div><div class='name'>fa-circle-o</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-circle-o-notch"></i></div><div class='name'>fa-circle-o-notch</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-circle-thin"></i></div><div class='name'>fa-circle-thin</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-clock-o"></i></div><div class='name'>fa-clock-o</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-close"></i></div><div class='name'>fa-close <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-cloud"></i></div><div class='name'>fa-cloud</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-cloud-download"></i></div><div class='name'>fa-cloud-download</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-cloud-upload"></i></div><div class='name'>fa-cloud-upload</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-code"></i></div><div class='name'>fa-code</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-code-fork"></i></div><div class='name'>fa-code-fork</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-coffee"></i></div><div class='name'>fa-coffee</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-cog"></i></div><div class='name'>fa-cog</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-cogs"></i></div><div class='name'>fa-cogs</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-comment"></i></div><div class='name'>fa-comment</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-comment-o"></i></div><div class='name'>fa-comment-o</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-comments"></i></div><div class='name'>fa-comments</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-comments-o"></i></div><div class='name'>fa-comments-o</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-compass"></i></div><div class='name'>fa-compass</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-copyright"></i></div><div class='name'>fa-copyright</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-credit-card"></i></div><div class='name'>fa-credit-card</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-crop"></i></div><div class='name'>fa-crop</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-crosshairs"></i></div><div class='name'>fa-crosshairs</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-cube"></i></div><div class='name'>fa-cube</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-cubes"></i></div><div class='name'>fa-cubes</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-cutlery"></i></div><div class='name'>fa-cutlery</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-dashboard"></i></div><div class='name'>fa-dashboard <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-database"></i></div><div class='name'>fa-database</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-desktop"></i></div><div class='name'>fa-desktop</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-dot-circle-o"></i></div><div class='name'>fa-dot-circle-o</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-download"></i></div><div class='name'>fa-download</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-edit"></i></div><div class='name'>fa-edit <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-ellipsis-h"></i></div><div class='name'>fa-ellipsis-h</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-ellipsis-v"></i></div><div class='name'>fa-ellipsis-v</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-envelope"></i></div><div class='name'>fa-envelope</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-envelope-o"></i></div><div class='name'>fa-envelope-o</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-envelope-square"></i></div><div class='name'>fa-envelope-square</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-eraser"></i></div><div class='name'>fa-eraser</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-exchange"></i></div><div class='name'>fa-exchange</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-exclamation"></i></div><div class='name'>fa-exclamation</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-exclamation-circle"></i></div><div class='name'>fa-exclamation-circle</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-exclamation-triangle"></i></div><div class='name'>fa-exclamation-triangle</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-external-link"></i></div><div class='name'>fa-external-link</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-external-link-square"></i></div><div class='name'>fa-external-link-square</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-eye"></i></div><div class='name'>fa-eye</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-eye-slash"></i></div><div class='name'>fa-eye-slash</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-eyedropper"></i></div><div class='name'>fa-eyedropper</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-fax"></i></div><div class='name'>fa-fax</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-female"></i></div><div class='name'>fa-female</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-fighter-jet"></i></div><div class='name'>fa-fighter-jet</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-file-archive-o"></i></div><div class='name'>fa-file-archive-o</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-file-audio-o"></i></div><div class='name'>fa-file-audio-o</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-file-code-o"></i></div><div class='name'>fa-file-code-o</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-file-excel-o"></i></div><div class='name'>fa-file-excel-o</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-file-image-o"></i></div><div class='name'>fa-file-image-o</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-file-movie-o"></i></div><div class='name'>fa-file-movie-o <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-file-pdf-o"></i></div><div class='name'>fa-file-pdf-o</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-file-photo-o"></i></div><div class='name'>fa-file-photo-o <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-file-picture-o"></i></div><div class='name'>fa-file-picture-o <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-file-powerpoint-o"></i></div><div class='name'>fa-file-powerpoint-o</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-file-sound-o"></i></div><div class='name'>fa-file-sound-o <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-file-video-o"></i></div><div class='name'>fa-file-video-o</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-file-word-o"></i></div><div class='name'>fa-file-word-o</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-file-zip-o"></i></div><div class='name'>fa-file-zip-o <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-film"></i></div><div class='name'>fa-film</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-filter"></i></div><div class='name'>fa-filter</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-fire"></i></div><div class='name'>fa-fire</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-fire-extinguisher"></i></div><div class='name'>fa-fire-extinguisher</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-flag"></i></div><div class='name'>fa-flag</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-flag-checkered"></i></div><div class='name'>fa-flag-checkered</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-flag-o"></i></div><div class='name'>fa-flag-o</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-flash"></i></div><div class='name'>fa-flash <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-flask"></i></div><div class='name'>fa-flask</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-folder"></i></div><div class='name'>fa-folder</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-folder-o"></i></div><div class='name'>fa-folder-o</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-folder-open"></i></div><div class='name'>fa-folder-open</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-folder-open-o"></i></div><div class='name'>fa-folder-open-o</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-frown-o"></i></div><div class='name'>fa-frown-o</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-futbol-o"></i></div><div class='name'>fa-futbol-o</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-gamepad"></i></div><div class='name'>fa-gamepad</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-gavel"></i></div><div class='name'>fa-gavel</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-gear"></i></div><div class='name'>fa-gear <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-gears"></i></div><div class='name'>fa-gears <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-gift"></i></div><div class='name'>fa-gift</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-glass"></i></div><div class='name'>fa-glass</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-globe"></i></div><div class='name'>fa-globe</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-graduation-cap"></i></div><div class='name'>fa-graduation-cap</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-group"></i></div><div class='name'>fa-group <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-hdd-o"></i></div><div class='name'>fa-hdd-o</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-headphones"></i></div><div class='name'>fa-headphones</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-heart"></i></div><div class='name'>fa-heart</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-heart-o"></i></div><div class='name'>fa-heart-o</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-history"></i></div><div class='name'>fa-history</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-home"></i></div><div class='name'>fa-home</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-image"></i></div><div class='name'>fa-image <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-inbox"></i></div><div class='name'>fa-inbox</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-info"></i></div><div class='name'>fa-info</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-info-circle"></i></div><div class='name'>fa-info-circle</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-institution"></i></div><div class='name'>fa-institution <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-key"></i></div><div class='name'>fa-key</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-keyboard-o"></i></div><div class='name'>fa-keyboard-o</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-language"></i></div><div class='name'>fa-language</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-laptop"></i></div><div class='name'>fa-laptop</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-leaf"></i></div><div class='name'>fa-leaf</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-legal"></i></div><div class='name'>fa-legal <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-lemon-o"></i></div><div class='name'>fa-lemon-o</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-level-down"></i></div><div class='name'>fa-level-down</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-level-up"></i></div><div class='name'>fa-level-up</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-life-bouy"></i></div><div class='name'>fa-life-bouy <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-life-buoy"></i></div><div class='name'>fa-life-buoy <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-life-ring"></i></div><div class='name'>fa-life-ring</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-life-saver"></i></div><div class='name'>fa-life-saver <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-lightbulb-o"></i></div><div class='name'>fa-lightbulb-o</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-line-chart"></i></div><div class='name'>fa-line-chart</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-location-arrow"></i></div><div class='name'>fa-location-arrow</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-lock"></i></div><div class='name'>fa-lock</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-magic"></i></div><div class='name'>fa-magic</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-magnet"></i></div><div class='name'>fa-magnet</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-mail-forward"></i></div><div class='name'>fa-mail-forward <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-mail-reply"></i></div><div class='name'>fa-mail-reply <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-mail-reply-all"></i></div><div class='name'>fa-mail-reply-all <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-male"></i></div><div class='name'>fa-male</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-map-marker"></i></div><div class='name'>fa-map-marker</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-meh-o"></i></div><div class='name'>fa-meh-o</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-microphone"></i></div><div class='name'>fa-microphone</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-microphone-slash"></i></div><div class='name'>fa-microphone-slash</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-minus"></i></div><div class='name'>fa-minus</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-minus-circle"></i></div><div class='name'>fa-minus-circle</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-minus-square"></i></div><div class='name'>fa-minus-square</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-minus-square-o"></i></div><div class='name'>fa-minus-square-o</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-mobile"></i></div><div class='name'>fa-mobile</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-mobile-phone"></i></div><div class='name'>fa-mobile-phone <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-money"></i></div><div class='name'>fa-money</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-moon-o"></i></div><div class='name'>fa-moon-o</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-mortar-board"></i></div><div class='name'>fa-mortar-board <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-music"></i></div><div class='name'>fa-music</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-navicon"></i></div><div class='name'>fa-navicon <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-newspaper-o"></i></div><div class='name'>fa-newspaper-o</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-paint-brush"></i></div><div class='name'>fa-paint-brush</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-paper-plane"></i></div><div class='name'>fa-paper-plane</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-paper-plane-o"></i></div><div class='name'>fa-paper-plane-o</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-paw"></i></div><div class='name'>fa-paw</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-pencil"></i></div><div class='name'>fa-pencil</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-pencil-square"></i></div><div class='name'>fa-pencil-square</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-pencil-square-o"></i></div><div class='name'>fa-pencil-square-o</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-phone"></i></div><div class='name'>fa-phone</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-phone-square"></i></div><div class='name'>fa-phone-square</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-photo"></i></div><div class='name'>fa-photo <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-picture-o"></i></div><div class='name'>fa-picture-o</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-pie-chart"></i></div><div class='name'>fa-pie-chart</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-plane"></i></div><div class='name'>fa-plane</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-plug"></i></div><div class='name'>fa-plug</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-plus"></i></div><div class='name'>fa-plus</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-plus-circle"></i></div><div class='name'>fa-plus-circle</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-plus-square"></i></div><div class='name'>fa-plus-square</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-plus-square-o"></i></div><div class='name'>fa-plus-square-o</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-power-off"></i></div><div class='name'>fa-power-off</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-print"></i></div><div class='name'>fa-print</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-puzzle-piece"></i></div><div class='name'>fa-puzzle-piece</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-qrcode"></i></div><div class='name'>fa-qrcode</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-question"></i></div><div class='name'>fa-question</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-question-circle"></i></div><div class='name'>fa-question-circle</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-quote-left"></i></div><div class='name'>fa-quote-left</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-quote-right"></i></div><div class='name'>fa-quote-right</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-random"></i></div><div class='name'>fa-random</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-recycle"></i></div><div class='name'>fa-recycle</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-refresh"></i></div><div class='name'>fa-refresh</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-remove"></i></div><div class='name'>fa-remove <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-reorder"></i></div><div class='name'>fa-reorder <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-reply"></i></div><div class='name'>fa-reply</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-reply-all"></i></div><div class='name'>fa-reply-all</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-retweet"></i></div><div class='name'>fa-retweet</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-road"></i></div><div class='name'>fa-road</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-rocket"></i></div><div class='name'>fa-rocket</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-rss"></i></div><div class='name'>fa-rss</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-rss-square"></i></div><div class='name'>fa-rss-square</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-search"></i></div><div class='name'>fa-search</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-search-minus"></i></div><div class='name'>fa-search-minus</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-search-plus"></i></div><div class='name'>fa-search-plus</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-send"></i></div><div class='name'>fa-send <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-send-o"></i></div><div class='name'>fa-send-o <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-share"></i></div><div class='name'>fa-share</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-share-alt"></i></div><div class='name'>fa-share-alt</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-share-alt-square"></i></div><div class='name'>fa-share-alt-square</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-share-square"></i></div><div class='name'>fa-share-square</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-share-square-o"></i></div><div class='name'>fa-share-square-o</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-shield"></i></div><div class='name'>fa-shield</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-shopping-cart"></i></div><div class='name'>fa-shopping-cart</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-sign-in"></i></div><div class='name'>fa-sign-in</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-sign-out"></i></div><div class='name'>fa-sign-out</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-signal"></i></div><div class='name'>fa-signal</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-sitemap"></i></div><div class='name'>fa-sitemap</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-sliders"></i></div><div class='name'>fa-sliders</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-smile-o"></i></div><div class='name'>fa-smile-o</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-soccer-ball-o"></i></div><div class='name'>fa-soccer-ball-o <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-sort"></i></div><div class='name'>fa-sort</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-sort-alpha-asc"></i></div><div class='name'>fa-sort-alpha-asc</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-sort-alpha-desc"></i></div><div class='name'>fa-sort-alpha-desc</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-sort-amount-asc"></i></div><div class='name'>fa-sort-amount-asc</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-sort-amount-desc"></i></div><div class='name'>fa-sort-amount-desc</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-sort-asc"></i></div><div class='name'>fa-sort-asc</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-sort-desc"></i></div><div class='name'>fa-sort-desc</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-sort-down"></i></div><div class='name'>fa-sort-down <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-sort-numeric-asc"></i></div><div class='name'>fa-sort-numeric-asc</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-sort-numeric-desc"></i></div><div class='name'>fa-sort-numeric-desc</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-sort-up"></i></div><div class='name'>fa-sort-up <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-space-shuttle"></i></div><div class='name'>fa-space-shuttle</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-spinner"></i></div><div class='name'>fa-spinner</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-spoon"></i></div><div class='name'>fa-spoon</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-square"></i></div><div class='name'>fa-square</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-square-o"></i></div><div class='name'>fa-square-o</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-star"></i></div><div class='name'>fa-star</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-star-half"></i></div><div class='name'>fa-star-half</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-star-half-empty"></i></div><div class='name'>fa-star-half-empty <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-star-half-full"></i></div><div class='name'>fa-star-half-full <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-star-half-o"></i></div><div class='name'>fa-star-half-o</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-star-o"></i></div><div class='name'>fa-star-o</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-suitcase"></i></div><div class='name'>fa-suitcase</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-sun-o"></i></div><div class='name'>fa-sun-o</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-support"></i></div><div class='name'>fa-support <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-tablet"></i></div><div class='name'>fa-tablet</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-tachometer"></i></div><div class='name'>fa-tachometer</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-tag"></i></div><div class='name'>fa-tag</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-tags"></i></div><div class='name'>fa-tags</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-tasks"></i></div><div class='name'>fa-tasks</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-taxi"></i></div><div class='name'>fa-taxi</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-terminal"></i></div><div class='name'>fa-terminal</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-thumb-tack"></i></div><div class='name'>fa-thumb-tack</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-thumbs-down"></i></div><div class='name'>fa-thumbs-down</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-thumbs-o-down"></i></div><div class='name'>fa-thumbs-o-down</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-thumbs-o-up"></i></div><div class='name'>fa-thumbs-o-up</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-thumbs-up"></i></div><div class='name'>fa-thumbs-up</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-ticket"></i></div><div class='name'>fa-ticket</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-times"></i></div><div class='name'>fa-times</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-times-circle"></i></div><div class='name'>fa-times-circle</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-times-circle-o"></i></div><div class='name'>fa-times-circle-o</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-tint"></i></div><div class='name'>fa-tint</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-toggle-down"></i></div><div class='name'>fa-toggle-down <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-toggle-left"></i></div><div class='name'>fa-toggle-left <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-toggle-off"></i></div><div class='name'>fa-toggle-off</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-toggle-on"></i></div><div class='name'>fa-toggle-on</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-toggle-right"></i></div><div class='name'>fa-toggle-right <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-toggle-up"></i></div><div class='name'>fa-toggle-up <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-trash"></i></div><div class='name'>fa-trash</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-trash-o"></i></div><div class='name'>fa-trash-o</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-tree"></i></div><div class='name'>fa-tree</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-trophy"></i></div><div class='name'>fa-trophy</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-truck"></i></div><div class='name'>fa-truck</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-tty"></i></div><div class='name'>fa-tty</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-umbrella"></i></div><div class='name'>fa-umbrella</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-university"></i></div><div class='name'>fa-university</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-unlock"></i></div><div class='name'>fa-unlock</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-unlock-alt"></i></div><div class='name'>fa-unlock-alt</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-unsorted"></i></div><div class='name'>fa-unsorted <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-upload"></i></div><div class='name'>fa-upload</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-user"></i></div><div class='name'>fa-user</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-users"></i></div><div class='name'>fa-users</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-video-camera"></i></div><div class='name'>fa-video-camera</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-volume-down"></i></div><div class='name'>fa-volume-down</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-volume-off"></i></div><div class='name'>fa-volume-off</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-volume-up"></i></div><div class='name'>fa-volume-up</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-warning"></i></div><div class='name'>fa-warning <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-wheelchair"></i></div><div class='name'>fa-wheelchair</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-wifi"></i></div><div class='name'>fa-wifi</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-wrench"></i></div><div class='name'>fa-wrench</div></div>
                </div>
            </section>

            <section id="file-type">
                <h2 class="page-header">File Type Icons</h2>
                <div class="row fontawesome-icon-list">
                    <div class="icon"><div class='ico'><i class="fa fa-file"></i></div><div class='name'>fa-file</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-file-archive-o"></i></div><div class='name'>fa-file-archive-o</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-file-audio-o"></i></div><div class='name'>fa-file-audio-o</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-file-code-o"></i></div><div class='name'>fa-file-code-o</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-file-excel-o"></i></div><div class='name'>fa-file-excel-o</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-file-image-o"></i></div><div class='name'>fa-file-image-o</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-file-movie-o"></i></div><div class='name'>fa-file-movie-o <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-file-o"></i></div><div class='name'>fa-file-o</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-file-pdf-o"></i></div><div class='name'>fa-file-pdf-o</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-file-photo-o"></i></div><div class='name'>fa-file-photo-o <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-file-picture-o"></i></div><div class='name'>fa-file-picture-o <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-file-powerpoint-o"></i></div><div class='name'>fa-file-powerpoint-o</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-file-sound-o"></i></div><div class='name'>fa-file-sound-o <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-file-text"></i></div><div class='name'>fa-file-text</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-file-text-o"></i></div><div class='name'>fa-file-text-o</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-file-video-o"></i></div><div class='name'>fa-file-video-o</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-file-word-o"></i></div><div class='name'>fa-file-word-o</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-file-zip-o"></i></div><div class='name'>fa-file-zip-o <span class="text-muted">(alias)</span></div></div>
                </div>
            </section>

            <section id="spinner">
                <h2 class="page-header">Spinner Icons</h2>
                <div class="row fontawesome-icon-list">
                    <div class="icon"><div class='ico'><i class="fa fa-circle-o-notch"></i></div><div class='name'>fa-circle-o-notch</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-cog"></i></div><div class='name'>fa-cog</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-gear"></i></div><div class='name'>fa-gear <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-refresh"></i></div><div class='name'>fa-refresh</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-spinner"></i></div><div class='name'>fa-spinner</div></div>
                </div>
            </section>

            <section id="form-control">
                <h2 class="page-header">Form Control Icons</h2>
                <div class="row fontawesome-icon-list">
                    <div class="icon"><div class='ico'><i class="fa fa-check-square"></i></div><div class='name'>fa-check-square</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-check-square-o"></i></div><div class='name'>fa-check-square-o</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-circle"></i></div><div class='name'>fa-circle</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-circle-o"></i></div><div class='name'>fa-circle-o</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-dot-circle-o"></i></div><div class='name'>fa-dot-circle-o</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-minus-square"></i></div><div class='name'>fa-minus-square</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-minus-square-o"></i></div><div class='name'>fa-minus-square-o</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-plus-square"></i></div><div class='name'>fa-plus-square</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-plus-square-o"></i></div><div class='name'>fa-plus-square-o</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-square"></i></div><div class='name'>fa-square</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-square-o"></i></div><div class='name'>fa-square-o</div></div>
                </div>
            </section>

            <section id="payment">
                <h2 class="page-header">Payment Icons</h2>
                <div class="row fontawesome-icon-list">
                    <div class="icon"><div class='ico'><i class="fa fa-cc-amex"></i></div><div class='name'>fa-cc-amex</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-cc-discover"></i></div><div class='name'>fa-cc-discover</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-cc-mastercard"></i></div><div class='name'>fa-cc-mastercard</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-cc-paypal"></i></div><div class='name'>fa-cc-paypal</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-cc-stripe"></i></div><div class='name'>fa-cc-stripe</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-cc-visa"></i></div><div class='name'>fa-cc-visa</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-credit-card"></i></div><div class='name'>fa-credit-card</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-google-wallet"></i></div><div class='name'>fa-google-wallet</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-paypal"></i></div><div class='name'>fa-paypal</div></div>
                </div>
            </section>

            <section id="chart">
                <h2 class="page-header">Chart Icons</h2>
                <div class="row fontawesome-icon-list">
                    <div class="icon"><div class='ico'><i class="fa fa-area-chart"></i></div><div class='name'>fa-area-chart</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-bar-chart"></i></div><div class='name'>fa-bar-chart</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-bar-chart-o"></i></div><div class='name'>fa-bar-chart-o <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-line-chart"></i></div><div class='name'>fa-line-chart</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-pie-chart"></i></div><div class='name'>fa-pie-chart</div></div>
                </div>
            </section>

            <section id="currency">
                <h2 class="page-header">Currency Icons</h2>
                <div class="row fontawesome-icon-list">
                    <div class="icon"><div class='ico'><i class="fa fa-bitcoin"></i></div><div class='name'>fa-bitcoin <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-btc"></i></div><div class='name'>fa-btc</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-cny"></i></div><div class='name'>fa-cny <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-dollar"></i></div><div class='name'>fa-dollar <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-eur"></i></div><div class='name'>fa-eur</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-euro"></i></div><div class='name'>fa-euro <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-gbp"></i></div><div class='name'>fa-gbp</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-ils"></i></div><div class='name'>fa-ils</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-inr"></i></div><div class='name'>fa-inr</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-jpy"></i></div><div class='name'>fa-jpy</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-krw"></i></div><div class='name'>fa-krw</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-money"></i></div><div class='name'>fa-money</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-rmb"></i></div><div class='name'>fa-rmb <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-rouble"></i></div><div class='name'>fa-rouble <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-rub"></i></div><div class='name'>fa-rub</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-ruble"></i></div><div class='name'>fa-ruble <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-rupee"></i></div><div class='name'>fa-rupee <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-shekel"></i></div><div class='name'>fa-shekel <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-sheqel"></i></div><div class='name'>fa-sheqel <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-try"></i></div><div class='name'>fa-try</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-turkish-lira"></i></div><div class='name'>fa-turkish-lira <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-usd"></i></div><div class='name'>fa-usd</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-won"></i></div><div class='name'>fa-won <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-yen"></i></div><div class='name'>fa-yen <span class="text-muted">(alias)</span></div></div>
                </div>
            </section>

            <section id="text-editor">
                <h2 class="page-header">Text Editor Icons</h2>
                <div class="row fontawesome-icon-list">
                    <div class="icon"><div class='ico'><i class="fa fa-align-center"></i></div><div class='name'>fa-align-center</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-align-justify"></i></div><div class='name'>fa-align-justify</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-align-left"></i></div><div class='name'>fa-align-left</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-align-right"></i></div><div class='name'>fa-align-right</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-bold"></i></div><div class='name'>fa-bold</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-chain"></i></div><div class='name'>fa-chain <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-chain-broken"></i></div><div class='name'>fa-chain-broken</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-clipboard"></i></div><div class='name'>fa-clipboard</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-columns"></i></div><div class='name'>fa-columns</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-copy"></i></div><div class='name'>fa-copy <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-cut"></i></div><div class='name'>fa-cut <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-dedent"></i></div><div class='name'>fa-dedent <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-eraser"></i></div><div class='name'>fa-eraser</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-file"></i></div><div class='name'>fa-file</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-file-o"></i></div><div class='name'>fa-file-o</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-file-text"></i></div><div class='name'>fa-file-text</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-file-text-o"></i></div><div class='name'>fa-file-text-o</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-files-o"></i></div><div class='name'>fa-files-o</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-floppy-o"></i></div><div class='name'>fa-floppy-o</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-font"></i></div><div class='name'>fa-font</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-header"></i></div><div class='name'>fa-header</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-indent"></i></div><div class='name'>fa-indent</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-italic"></i></div><div class='name'>fa-italic</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-link"></i></div><div class='name'>fa-link</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-list"></i></div><div class='name'>fa-list</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-list-alt"></i></div><div class='name'>fa-list-alt</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-list-ol"></i></div><div class='name'>fa-list-ol</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-list-ul"></i></div><div class='name'>fa-list-ul</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-outdent"></i></div><div class='name'>fa-outdent</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-paperclip"></i></div><div class='name'>fa-paperclip</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-paragraph"></i></div><div class='name'>fa-paragraph</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-paste"></i></div><div class='name'>fa-paste <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-repeat"></i></div><div class='name'>fa-repeat</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-rotate-left"></i></div><div class='name'>fa-rotate-left <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-rotate-right"></i></div><div class='name'>fa-rotate-right <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-save"></i></div><div class='name'>fa-save <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-scissors"></i></div><div class='name'>fa-scissors</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-strikethrough"></i></div><div class='name'>fa-strikethrough</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-subscript"></i></div><div class='name'>fa-subscript</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-superscript"></i></div><div class='name'>fa-superscript</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-table"></i></div><div class='name'>fa-table</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-text-height"></i></div><div class='name'>fa-text-height</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-text-width"></i></div><div class='name'>fa-text-width</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-th"></i></div><div class='name'>fa-th</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-th-large"></i></div><div class='name'>fa-th-large</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-th-list"></i></div><div class='name'>fa-th-list</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-underline"></i></div><div class='name'>fa-underline</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-undo"></i></div><div class='name'>fa-undo</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-unlink"></i></div><div class='name'>fa-unlink <span class="text-muted">(alias)</span></div></div>
                </div>
            </section>
            <section id="directional">
                <h2 class="page-header">Directional Icons</h2>
                <div class="row fontawesome-icon-list">
                    <div class="icon"><div class='ico'><i class="fa fa-angle-double-down"></i></div><div class='name'>fa-angle-double-down</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-angle-double-left"></i></div><div class='name'>fa-angle-double-left</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-angle-double-right"></i></div><div class='name'>fa-angle-double-right</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-angle-double-up"></i></div><div class='name'>fa-angle-double-up</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-angle-down"></i></div><div class='name'>fa-angle-down</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-angle-left"></i></div><div class='name'>fa-angle-left</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-angle-right"></i></div><div class='name'>fa-angle-right</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-angle-up"></i></div><div class='name'>fa-angle-up</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-arrow-circle-down"></i></div><div class='name'>fa-arrow-circle-down</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-arrow-circle-left"></i></div><div class='name'>fa-arrow-circle-left</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-arrow-circle-o-down"></i></div><div class='name'>fa-arrow-circle-o-down</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-arrow-circle-o-left"></i></div><div class='name'>fa-arrow-circle-o-left</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-arrow-circle-o-right"></i></div><div class='name'>fa-arrow-circle-o-right</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-arrow-circle-o-up"></i></div><div class='name'>fa-arrow-circle-o-up</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-arrow-circle-right"></i></div><div class='name'>fa-arrow-circle-right</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-arrow-circle-up"></i></div><div class='name'>fa-arrow-circle-up</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-arrow-down"></i></div><div class='name'>fa-arrow-down</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-arrow-left"></i></div><div class='name'>fa-arrow-left</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-arrow-right"></i></div><div class='name'>fa-arrow-right</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-arrow-up"></i></div><div class='name'>fa-arrow-up</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-arrows"></i></div><div class='name'>fa-arrows</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-arrows-alt"></i></div><div class='name'>fa-arrows-alt</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-arrows-h"></i></div><div class='name'>fa-arrows-h</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-arrows-v"></i></div><div class='name'>fa-arrows-v</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-caret-down"></i></div><div class='name'>fa-caret-down</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-caret-left"></i></div><div class='name'>fa-caret-left</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-caret-right"></i></div><div class='name'>fa-caret-right</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-caret-square-o-down"></i></div><div class='name'>fa-caret-square-o-down</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-caret-square-o-left"></i></div><div class='name'>fa-caret-square-o-left</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-caret-square-o-right"></i></div><div class='name'>fa-caret-square-o-right</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-caret-square-o-up"></i></div><div class='name'>fa-caret-square-o-up</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-caret-up"></i></div><div class='name'>fa-caret-up</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-chevron-circle-down"></i></div><div class='name'>fa-chevron-circle-down</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-chevron-circle-left"></i></div><div class='name'>fa-chevron-circle-left</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-chevron-circle-right"></i></div><div class='name'>fa-chevron-circle-right</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-chevron-circle-up"></i></div><div class='name'>fa-chevron-circle-up</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-chevron-down"></i></div><div class='name'>fa-chevron-down</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-chevron-left"></i></div><div class='name'>fa-chevron-left</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-chevron-right"></i></div><div class='name'>fa-chevron-right</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-chevron-up"></i></div><div class='name'>fa-chevron-up</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-hand-o-down"></i></div><div class='name'>fa-hand-o-down</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-hand-o-left"></i></div><div class='name'>fa-hand-o-left</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-hand-o-right"></i></div><div class='name'>fa-hand-o-right</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-hand-o-up"></i></div><div class='name'>fa-hand-o-up</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-long-arrow-down"></i></div><div class='name'>fa-long-arrow-down</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-long-arrow-left"></i></div><div class='name'>fa-long-arrow-left</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-long-arrow-right"></i></div><div class='name'>fa-long-arrow-right</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-long-arrow-up"></i></div><div class='name'>fa-long-arrow-up</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-toggle-down"></i></div><div class='name'>fa-toggle-down <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-toggle-left"></i></div><div class='name'>fa-toggle-left <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-toggle-right"></i></div><div class='name'>fa-toggle-right <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-toggle-up"></i></div><div class='name'>fa-toggle-up <span class="text-muted">(alias)</span></div></div>
                </div>
            </section>

            <section id="video-player">
                <h2 class="page-header">Video Player Icons</h2>
                <div class="row fontawesome-icon-list">
                    <div class="icon"><div class='ico'><i class="fa fa-arrows-alt"></i></div><div class='name'>fa-arrows-alt</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-backward"></i></div><div class='name'>fa-backward</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-compress"></i></div><div class='name'>fa-compress</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-eject"></i></div><div class='name'>fa-eject</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-expand"></i></div><div class='name'>fa-expand</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-fast-backward"></i></div><div class='name'>fa-fast-backward</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-fast-forward"></i></div><div class='name'>fa-fast-forward</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-forward"></i></div><div class='name'>fa-forward</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-pause"></i></div><div class='name'>fa-pause</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-play"></i></div><div class='name'>fa-play</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-play-circle"></i></div><div class='name'>fa-play-circle</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-play-circle-o"></i></div><div class='name'>fa-play-circle-o</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-step-backward"></i></div><div class='name'>fa-step-backward</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-step-forward"></i></div><div class='name'>fa-step-forward</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-stop"></i></div><div class='name'>fa-stop</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-youtube-play"></i></div><div class='name'>fa-youtube-play</div></div>

                </div>

            </section>

            <section id="brand">
                <h2 class="page-header">Brand Icons</h2>
                <div class="row fontawesome-icon-list">
                    <div class="icon"><div class='ico'><i class="fa fa-adn"></i></div><div class='name'>fa-adn</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-android"></i></div><div class='name'>fa-android</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-angellist"></i></div><div class='name'>fa-angellist</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-apple"></i></div><div class='name'>fa-apple</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-behance"></i></div><div class='name'>fa-behance</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-behance-square"></i></div><div class='name'>fa-behance-square</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-bitbucket"></i></div><div class='name'>fa-bitbucket</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-bitbucket-square"></i></div><div class='name'>fa-bitbucket-square</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-bitcoin"></i></div><div class='name'>fa-bitcoin <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-btc"></i></div><div class='name'>fa-btc</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-cc-amex"></i></div><div class='name'>fa-cc-amex</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-cc-discover"></i></div><div class='name'>fa-cc-discover</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-cc-mastercard"></i></div><div class='name'>fa-cc-mastercard</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-cc-paypal"></i></div><div class='name'>fa-cc-paypal</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-cc-stripe"></i></div><div class='name'>fa-cc-stripe</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-cc-visa"></i></div><div class='name'>fa-cc-visa</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-codepen"></i></div><div class='name'>fa-codepen</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-css3"></i></div><div class='name'>fa-css3</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-delicious"></i></div><div class='name'>fa-delicious</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-deviantart"></i></div><div class='name'>fa-deviantart</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-digg"></i></div><div class='name'>fa-digg</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-dribbble"></i></div><div class='name'>fa-dribbble</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-dropbox"></i></div><div class='name'>fa-dropbox</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-drupal"></i></div><div class='name'>fa-drupal</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-empire"></i></div><div class='name'>fa-empire</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-facebook"></i></div><div class='name'>fa-facebook</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-facebook-square"></i></div><div class='name'>fa-facebook-square</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-flickr"></i></div><div class='name'>fa-flickr</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-foursquare"></i></div><div class='name'>fa-foursquare</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-ge"></i></div><div class='name'>fa-ge <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-git"></i></div><div class='name'>fa-git</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-git-square"></i></div><div class='name'>fa-git-square</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-github"></i></div><div class='name'>fa-github</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-github-alt"></i></div><div class='name'>fa-github-alt</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-github-square"></i></div><div class='name'>fa-github-square</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-gittip"></i></div><div class='name'>fa-gittip</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-google"></i></div><div class='name'>fa-google</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-google-plus"></i></div><div class='name'>fa-google-plus</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-google-plus-square"></i></div><div class='name'>fa-google-plus-square</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-google-wallet"></i></div><div class='name'>fa-google-wallet</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-hacker-news"></i></div><div class='name'>fa-hacker-news</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-html5"></i></div><div class='name'>fa-html5</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-instagram"></i></div><div class='name'>fa-instagram</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-ioxhost"></i></div><div class='name'>fa-ioxhost</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-joomla"></i></div><div class='name'>fa-joomla</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-jsfiddle"></i></div><div class='name'>fa-jsfiddle</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-lastfm"></i></div><div class='name'>fa-lastfm</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-lastfm-square"></i></div><div class='name'>fa-lastfm-square</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-linkedin"></i></div><div class='name'>fa-linkedin</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-linkedin-square"></i></div><div class='name'>fa-linkedin-square</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-linux"></i></div><div class='name'>fa-linux</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-maxcdn"></i></div><div class='name'>fa-maxcdn</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-meanpath"></i></div><div class='name'>fa-meanpath</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-openid"></i></div><div class='name'>fa-openid</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-pagelines"></i></div><div class='name'>fa-pagelines</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-paypal"></i></div><div class='name'>fa-paypal</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-pied-piper"></i></div><div class='name'>fa-pied-piper</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-pied-piper-alt"></i></div><div class='name'>fa-pied-piper-alt</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-pinterest"></i></div><div class='name'>fa-pinterest</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-pinterest-square"></i></div><div class='name'>fa-pinterest-square</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-qq"></i></div><div class='name'>fa-qq</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-ra"></i></div><div class='name'>fa-ra <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-rebel"></i></div><div class='name'>fa-rebel</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-reddit"></i></div><div class='name'>fa-reddit</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-reddit-square"></i></div><div class='name'>fa-reddit-square</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-renren"></i></div><div class='name'>fa-renren</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-share-alt"></i></div><div class='name'>fa-share-alt</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-share-alt-square"></i></div><div class='name'>fa-share-alt-square</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-skype"></i></div><div class='name'>fa-skype</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-slack"></i></div><div class='name'>fa-slack</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-slideshare"></i></div><div class='name'>fa-slideshare</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-soundcloud"></i></div><div class='name'>fa-soundcloud</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-spotify"></i></div><div class='name'>fa-spotify</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-stack-exchange"></i></div><div class='name'>fa-stack-exchange</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-stack-overflow"></i></div><div class='name'>fa-stack-overflow</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-steam"></i></div><div class='name'>fa-steam</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-steam-square"></i></div><div class='name'>fa-steam-square</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-stumbleupon"></i></div><div class='name'>fa-stumbleupon</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-stumbleupon-circle"></i></div><div class='name'>fa-stumbleupon-circle</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-tencent-weibo"></i></div><div class='name'>fa-tencent-weibo</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-trello"></i></div><div class='name'>fa-trello</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-tumblr"></i></div><div class='name'>fa-tumblr</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-tumblr-square"></i></div><div class='name'>fa-tumblr-square</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-twitch"></i></div><div class='name'>fa-twitch</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-twitter"></i></div><div class='name'>fa-twitter</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-twitter-square"></i></div><div class='name'>fa-twitter-square</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-vimeo-square"></i></div><div class='name'>fa-vimeo-square</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-vine"></i></div><div class='name'>fa-vine</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-vk"></i></div><div class='name'>fa-vk</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-wechat"></i></div><div class='name'>fa-wechat <span class="text-muted">(alias)</span></div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-weibo"></i></div><div class='name'>fa-weibo</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-weixin"></i></div><div class='name'>fa-weixin</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-windows"></i></div><div class='name'>fa-windows</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-wordpress"></i></div><div class='name'>fa-wordpress</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-xing"></i></div><div class='name'>fa-xing</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-xing-square"></i></div><div class='name'>fa-xing-square</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-yahoo"></i></div><div class='name'>fa-yahoo</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-yelp"></i></div><div class='name'>fa-yelp</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-youtube"></i></div><div class='name'>fa-youtube</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-youtube-play"></i></div><div class='name'>fa-youtube-play</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-youtube-square"></i></div><div class='name'>fa-youtube-square</div></div>
                </div>
            </section>
            <section id="medical">
                <h2 class="page-header">Medical Icons</h2>
                <div class="row fontawesome-icon-list">
                    <div class="icon"><div class='ico'><i class="fa fa-ambulance"></i></div><div class='name'>fa-ambulance</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-h-square"></i></div><div class='name'>fa-h-square</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-hospital-o"></i></div><div class='name'>fa-hospital-o</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-medkit"></i></div><div class='name'>fa-medkit</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-plus-square"></i></div><div class='name'>fa-plus-square</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-stethoscope"></i></div><div class='name'>fa-stethoscope</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-user-md"></i></div><div class='name'>fa-user-md</div></div>

                    <div class="icon"><div class='ico'><i class="fa fa-wheelchair"></i></div><div class='name'>fa-wheelchair</div></div>
                </div>
            </section>
        </div>
        <div class="c">
            <label class="group">
                <div class="addon"><i class='fa fa-search'></i></div>
                <input type="text" class='searchinput'/>
                <div class='btn sortlist'>
                    <i class='fa fa-bars'></i>
                    <div class='droplist top-b'>
                        <div target='new'>40 New Icons in 4.2</div>
                        <div target='web-application'>Web Application Icons</div>
                        <div target='file-type'>File Type Icons</div>
                        <div target='spinner'>Spinner Icons</div>
                        <div target='form-control'>Form Control Icons</div>
                        <div target='payment'>Payment Icons</div>
                        <div target='chart'>Chart Icons</div>
                        <div target='currency'>Currency Icons</div>
                        <div target='text-editor'>Text Editor Icons</div>
                        <div target='directional'>Directional Icons</div>
                        <div target='video-player'>Video Player Icons</div>
                        <div target='brand'>Brand Icons</div>
                        <div target='medical'>Medical Icons</div>
                    </div>
                </div>
            </label>
        </div>
        <div class='e'><i class='fa fa-chevron-left'></i></div>
    </body>
</html>