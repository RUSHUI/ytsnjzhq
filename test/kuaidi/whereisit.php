<?php

$url = "http://www.kuaidi100.com/query?type=" .$_POST['type'] ."&postid=" .$_POST['code'];
$contents = file_get_contents($url);
//$getcontent = iconv("gb2312", "utf-8",$contents); 
echo $contents;
?> 