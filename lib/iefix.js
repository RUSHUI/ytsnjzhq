(function($) {
    var hasfix=false;
    if (window.ActiveXObject) {
        try {
            if (new ActiveXObject('ChromeTab.ChromeFrame')) {
                hasfix = true;
            }
        } catch (e) {
        }
    }
    if(!hasfix){
        $().ready(function(){
            var str="<div style='z-index:999999999;position:absolute;left:0;top:0;right:0;bottom:0;background:#E6E6E6;'>"+
                        "<div style='width:500px;height:240px;background:white;border:1px solid #D7D7D7;position:absolute;left:50%;top:50%;margin-left:-250px;margin-top:-120px;'>"+
                            "<div style='padding:30px;'>"+
                                "<p>检测到您的浏览器版本过低，为保证给您提供优质的用户体验，您需要做下面三步中的任意一步继续使用<p>"+
                                "<ul>"+
                                    "<li>您可以升级您的浏览器，如果您使用的是IE6,7,8,9任意一款，请尝试直接升级到IE10+<li>"+
                                    "<li>您可以使用其他浏览器，如chrome，firefox等<li>"+
                                    "<li>若您无法升级或更换浏览器，请安装此<a href='brooder/lib/iefixcef.msi' title='点击下载并安装'>插件</a>，安装完成后请重启浏览器再试</li>"+
                                "</ul>"+
                            "</div>"+
                        "</div>"+
                    "</div>";
            $(str).appendTo("body");
        });
    }
})(jQuery);