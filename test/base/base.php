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
            });
        </script>
    </head>
    <body>
        <div style="position: absolute;left:20px;top:20px;right:20px;bottom:10px;overflow: auto;padding:10px;">
            <div class="input">
                <input type="text" placeholder="Input"/>
                <input type="password" placeholder="Password"/>
                <input type="password" placeholder="Password" class="error"/>
                <input type="password" placeholder="Password" class="warning"/>
                <input type="password" placeholder="Password" class="success"/>
                <input type="text" class="disabled" disabled="disabled" placeholder="disabled"/>
                <div style="height:20px;"></div>
                <label class="">
                    <div class="label">xxxxxxxx</div><input type="text"/><div class="inline"><i class="fa fa-check-circle"></i> some words...</div>
                </label>
                <div style="height:20px;"></div>
                <label class="">
                    <div class="label">xxxxxxxx</div><textarea></textarea><div class="inline"><i class="fa fa-check-circle"></i> some words...</div>
                </label>
                <div style="height:20px;"></div>
                <label class="">
                    <div class="label">xxxxxxxx</div><select>
                        <option>xxx</option>
                        <option>xxddx</option>
                        <option>xxgggx</option>
                        <option>xxx</option>
                    </select><div class="inline"><i class="fa fa-check-circle"></i> some words...</div>
                </label>
                <div style="height:20px;"></div>
                <label class="flex">
                    <div class="label">xxxxxxxx</div><input type="text"/>
                </label>
                <div style="height:20px;"></div>
                <label class="flex">
                    <div class="label">xxxxxxxx</div><textarea></textarea>
                </label>
                <div style="height:20px;"></div>
                <label class="flex">
                    <div class="label">xxxxxxxx</div><select>
                        <option>xxx</option>
                        <option>xxddx</option>
                        <option>xxgggx</option>
                        <option>xxx</option>
                    </select>
                </label>
                <div style="height:20px;"></div>
                <label class="">
                    <div class="label-block">xxxxxxxx</div><input type="text"/><div class="block"><i class="fa fa-check-circle"></i> some words...</div>
                </label>
                <div style="height:20px;"></div>
                <label class="">
                    <div class="label-block">xxxxxxxx</div><textarea></textarea><div class="block"><i class="fa fa-check-circle"></i> some words...</div>
                </label>
                <div style="height:20px;"></div>
                <div>
                    <label class="">
                        <div class="inline"><input type="checkbox" disabled="disabled"/>Input with warning</div>
                    </label>
                    <label class="">
                        <div class="inline"><input type="checkbox"/>xxxxxxxx</div>
                    </label>
                    <label class="">
                        <div class="inline"><input type="checkbox"/>xxxxxxxx</div>
                    </label>
                    <label class="">
                        <div class="inline"><input type="radio" disabled="disabled"/>xxxxxxxx</div>
                    </label>
                    <label class="">
                        <div class="inline"><input type="radio"/>xxxxxxxx</div>
                    </label>
                    <label class="">
                        <div class="inline"><input type="radio"/>xxxxxxxx</div>
                    </label>
                </div>
            </div>
            <div style="height:20px;"></div>
            <div class="btns">
                <div class="btn">button</div>
                <div class="btn disabled">button</div>
                <div class="btn success"><i class="fa fa-trash-o fa-lg"></i> Delete</div>
                <div class="btn success disabled"><i class="fa fa-trash-o fa-lg"></i> Delete</div>
                <div class="btn primary">button</div>
                <div class="btn primary disabled">button</div>
                <div class="btn info">button</div>
                <div class="btn info disabled">button</div>
                <div class="btn warning">button</div>
                <div class="btn warning disabled">button</div>
                <div class="btn danger">button</div>
                <div class="btn danger disabled">button</div>
                <div class="apart"></div>
                <div class="title_4">btns in group</div>
                <div class="group">
                    <div class="btn">button</div>
                    <div class="btn success"><i class="fa fa-trash-o fa-lg"></i> Delete</div>
                    <div class="btn primary">button</div>
                    <div class="btn info">button</div>
                    <div class="btn warning">button</div>
                    <div class="btn danger">button</div>
                </div>
            </div>
            <div style="height:20px;"></div>
            <div style="margin-top: 20px;">
                <div class="group">
                    <div class="group open">
                        <div class="btn">button <i class="fa fa-angle-down"></i></div>
                        <div class="droplist">
                            <div>radiusSame button</div>
                            <div class="right">
                                <div>radiusSame<i class="fa fa-angle-right"></i></div>
                                <div class="droplist">
                                    <div>radiusSame button</div>
                                    <div class="left">
                                        <div><i class="fa fa-angle-right"></i>radiusSame</div>
                                        <div class="droplist">
                                            <div>radiusSame button</div>
                                            <div>radiusSame</div>
                                            <div>radiusSame button</div>
                                            <div class="line"></div>
                                            <div>radiusSame</div>
                                        </div>
                                    </div>
                                    <div>radiusSame button</div>
                                    <div class="line"></div>
                                    <div>radiusSame</div>
                                </div>
                            </div>
                            <div>radiusSame button</div>
                            <div class="line"></div>
                            <div>radiusSame</div>
                        </div>
                    </div>
                    <div class="btn success">button</div>
                    <div class="btn primary">button</div>
                    <div class="btn info">button</div>
                    <div class="btn warning">button</div>
                    <div class="btn danger">button</div>
                    <div class="group open">
                        <div class="btn">button</div>
                        <div class="droplist right-b">
                            <div>radiusSame button</div>
                            <div class="right">
                                <div>radiusSame<i class="fa fa-angle-right"></i></div>
                                <div class="droplist">
                                    <div>radiusSame button</div>
                                    <div>
                                        <div><i class="fa fa-angle-right"></i>radiusSame</div>
                                        <div class="droplist">
                                            <div>radiusSame button</div>
                                            <div>radiusSame</div>
                                            <div>radiusSame button</div>
                                            <div class="line"></div>
                                            <div>radiusSame</div>
                                        </div>
                                    </div>
                                    <div>radiusSame button</div>
                                    <div class="line"></div>
                                    <div>radiusSame</div>
                                </div>
                            </div>
                            <div>radiusSame button</div>
                            <div class="line"></div>
                            <div>radiusSame</div>
                        </div>
                        <div class="btn less"><i class="fa fa-angle-down"></i></div>
                    </div>
                </div>
            </div>
            <div style="height:200px;"></div>
            <div class="group flex" style="width:400px;">
                <div class="btn wrap">@</div>
                <div class="btn">xxxx</div>
                <div class="btn wrap">@</div>
                <select>
                    <option>xxx</option>
                    <option>xxddx</option>
                    <option>xxgggx</option>
                    <option>xxx</option>
                </select>
            </div>
            <div style="height:20px;"></div>
            <div class="group flex" style="width:700px;">
                <label class="addon wrap"><input type="radio"/></label>
                <div class="btn wrap">@</div>
                <label class="addon wrap"><input type="checkbox"/></label>
                <input type="text"/>
                <div class="group wrap">
                    <div class="btn">@</div>
                    <div class="btn">xxxx</div>
                    <div class="btn">@</div>
                    <div class="btn">@</div>
                </div>
                <input type="text"/>
                <div class="btn wrap">@</div>
            </div>
            <div style="height:20px;"></div>
            <div class="group">
                <span class="addon"><i class="fa fa-envelope-o fa-fw"></i></span>
                <input type="text" placeholder="Email address">
            </div>
            <div class="group">
                <span class="addon"><i class="fa fa-key fa-fw"></i></span>
                <input type="text" placeholder="Password">
            </div>
            <div style="height:20px;"></div>
            <div class="open" style="margin-top: 20px;position: relative">
                <div class="group">
                    <div class="btn">button</div>
                    <div class="btn less"><i class="fa fa-angle-down"></i></div>
                </div>
                <div class="droplist">
                    <div>radiusSame button</div>
                    <div class="right">
                        <div>radiusSame<i class="fa fa-angle-right"></i></div>
                        <div class="droplist">
                            <div>radiusSame button</div>
                            <div class="left">
                                <div><i class="fa fa-angle-right"></i>radiusSame</div>
                                <div class="droplist">
                                    <div>radiusSame button</div>
                                    <div>radiusSame</div>
                                    <div>radiusSame button</div>
                                    <div class="line"></div>
                                    <div>radiusSame</div>
                                </div>
                            </div>
                            <div>radiusSame button</div>
                            <div class="line"></div>
                            <div>radiusSame</div>
                        </div>
                    </div>
                    <div>radiusSame button</div>
                    <div class="line"></div>
                    <div>radiusSame</div>
                </div>
            </div>
            <div style="height:150px;"></div>
            <div class="row">
                <div class="span1-3">
                    <label class="flex">
                        <div class="label">xxxxxxxx</div>
                        <input type="text"/>
                    </label>
                </div>
                <div class="span1-3">
                    <label class="flex">
                        <div class="label">xxxxxxxx</div>
                        <div class="tip">nnnnnnn</div>
                        <input type="text"/>
                    </label>
                </div>
                <div class="span1-3">
                    <label class="flex"><div class="label">xxxxxxxx</div><input type="text"/></label>
                </div>
            </div>
            <div class="row">
                <div class="span1-4">
                    <label class="flex">
                        <div class="label">xxxxxxxx</div>
                        <input type="text"/>
                    </label>
                </div>
                <div class="span1-4">
                    <label class="flex">
                        <div class="label">xxxxxxxx</div>
                        <div class="tip">nnnnnnn</div>
                        <input type="text"/>
                    </label>
                </div>
                <div class="span1-4">
                    <label class="flex"><div class="label">xxxxxxxx</div><input type="text"/></label>
                </div>
                <div class="span1-4">
                    <label class="flex"><div class="label">xxxxxxxx</div><input type="text"/></label>
                </div>
            </div>
            <div style="height:10px;"></div>
            <div class="linkgroup">
                <div class="link active">bbbbbb</div>
                <div class="link">bbbbbb</div>
                <div class="link">bbbbbb</div>
                <div class="link">bbbbbb</div>
            </div>
            <div style="height:10px;"></div>
            <div class="linkgroup-line">
                <div class="link active">bbbbbb</div>
                <div class="link">bbbbbb</div>
                <div class="link open">bbbbbb <i class="fa fa-angle-down"></i>
                    <div class="droplist">
                        <div>radiusSame button</div>
                        <div class="right">
                            <div>radiusSame<i class="fa fa-angle-right"></i></div>
                            <div class="droplist">
                                <div>radiusSame button</div>
                                <div class="left">
                                    <div><i class="fa fa-angle-right"></i>radiusSame</div>
                                    <div class="droplist">
                                        <div>radiusSame button</div>
                                        <div>radiusSame</div>
                                        <div>radiusSame button</div>
                                        <div class="line"></div>
                                        <div>radiusSame</div>
                                    </div>
                                </div>
                                <div>radiusSame button</div>
                                <div class="line"></div>
                                <div>radiusSame</div>
                            </div>
                        </div>
                        <div>radiusSame button</div>
                        <div class="line"></div>
                        <div>radiusSame</div>
                    </div></div>
                <div class="link">bbbbbb</div>
            </div>
        </div>
    </body>
</html>
