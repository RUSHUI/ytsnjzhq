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
                $("body").Boot({
                    basePath:"<?php echo $basepath; ?>"
                },{
                    override:{
                        onendinit:function(){
                            this.addChild({
                                type:"brooder.util.mediawrapper.audio",
                                option:{
                                    music:"aa.mp3"
                                }
                            });
                        }
                    }
                });
            });
        </script>
    </head>
    <body>
        <div class='progress'>
            <div class='bar'></div>
            <div class='bar2'></div>
        </div>
        <div>
            <div class='play'>play</div>
            <div class='pause'>pause</div>
        </div>
        <div>
            <input type="range" min="1" max="100" class="vol"/>
            <input type="range" min="1" max="100" class="vol2"/>
        </div>
        <div>
            loadstart   //客户端开始请求数据 
            progress    //客户端正在请求数据 
            suspend     //延迟下载 
            abort       //客户端主动终止下载（不是因为错误引起）， 
            error       //请求数据时遇到错误 
            stalled     //网速失速 
            play       //play()和autoplay开始播放时触发 
            pause       //pause()触发 
            loadedmetadata  //成功获取资源长度 
            loadeddata  // 
            waiting     //等待数据，并非错误 
            playing     //开始回放 
            canplay     //可以播放，但中途可能因为加载而暂停 
            canplaythrough //可以播放，歌曲全部加载完毕 
            seeking     //寻找中 
            seeked      //寻找完毕 
            timeupdate  //播放时间改变 
            ended       //播放结束 
            ratechange  //播放速率改变 
            durationchange  //资源长度改变 
            volumechange    //音量改变 
        </div>
    </body>
</html>