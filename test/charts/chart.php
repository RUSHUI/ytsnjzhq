<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <?php $basepath = "http://" . $_SERVER ['HTTP_HOST'] . "/brooder/packets/"; ?>
        <?php $rocpath = "http://" . $_SERVER ['HTTP_HOST'] . "/brooder/"; ?>
        <script src="<?php echo $rocpath; ?>core/brooder.core.js"></script>
        <script>
            $().ready(function () {
                $("body").Boot({basePath: "<?php echo $basepath; ?>"}, {
                    packets: ["brooder.util.chart"],
                    override: {
                        layout: "<div class='aa' style='width:800px;height:500px;'></div><div class='bb' style='width:600px;height:400px;'></div>",
                        onendinit: function () {
                            var option = {
                                title: [
                                    {text: "业务违规数", fontSize: 14, color: "black", lineHeight: 15},
                                    {text: "this is subtitle", fontSize: 12, color: "black", lineHeight: 17}
                                ],
                                padding: {
                                    left: 50,
                                    right: 220,
                                    top: 70,
                                    bottom: 80
                                },
                                legend: {
                                    direction: "h", //h,v
                                    position: "m-r"//[t,m,b]-[l,m,r]
                                },
                                xAxis: {from: -20, to: 100, step: 5, title: "", unit: "", label: ["移动", "电信", "联通"], isnumber: true, islabel: false},
                                yAxis: [
                                    {from: -10, to: 200, step: 5, title: "", unit: "", label: ["A", "B", "C", "D", "E", "A", "B", "C", "D", "E"], isnumber: true, islabel: false, position: "left"},
//                                    {from: 10, to: 100, step: 5, title: "", unit: "", label: ["ee", "B", "C", "D", "E", "A", "B", "C", "D", "E"], isnumber: true, islabel: false, position: "right"},
//                                    {from: 0, to: 100, step: 5, title: "", unit: "", label: ["A", "B", "C", "D", "E", "A", "B", "C", "D", "E"], isnumber: true, islabel: false, position: "left"},
//                                    {from: -30, to: 100, step: 10, title: "", unit: "", label: ["A", "B", "C", "D", "E", "A", "B", "C", "D", "E"], isnumber: true, islabel: false, position: "right"}
                                ],
                                grid: {
                                    type: "x"//x,y,all
                                },
                                graph: {
                                    bar: [
                                        {id: "a", name: "违规数", width: 15, color: "primary", data: [50, 80, 20, 60, 40, 33, 25, 10, 5, 6], marginRight: 0, flip: false},
                                        {id: "b", name: "bar-two", width: 15, color: "warning", data: [5, -10, 50, 40, 20, 10, 20, 5, 20, 25], marginLeft: 17, flip: false}
                                    ],
//                                    multibar: [
//                                        {id: "b", name: "bar-three", width: 10, data: [
//                                                {color: "primary", data: [5, 25, 50, 55, 35, 44, 20, 20, 15, 16]},
//                                                {color: "warning", data: [-6, 10, 20, 10, 20, 20, 10, 5, 15, 16]},
//                                                {color: "primary", data: [-3, 10, 20, 10, 20, 20, 10, 5, 15, 16]}
//                                            ], marginLeft: 0, flip: false}
//                                    ],
//                                    line: [
//                                        {color: "success", data: [
//                                                [-20, 20], [10, 30], [20, 40], [26, 50], [60, 22]
//                                            ]},
//                                        {color: "danger", data: [
//                                                [-20, 50], [5, 80], [18, 70], [26, 90], [60, 30]
//                                            ]}
//                                    ],
//                                    area: [
//                                        {name: "name", color: "danger", data: [
//                                                [-20, 30], [5, 60], [18, 70], [26, 45], [60, 60]
//                                            ]},
//                                        {name: "name", color: "info", data: [
//                                                [-20, 5], [5, 30], [20, 40], [26, 20], [60, 22]
//                                            ]}
//                                    ]
                                }
                            };
                            var option2 = {
                                left: 100,
                                top: 50,
                                r: 150,
                                title: [
                                    {text: "", fontSize: 14, color: "black", lineHeight: 15},
                                    {text: "this is subtitle", fontSize: 12, color: "black", lineHeight: 17}
                                ],
                                legend: {
                                    direction: "h", //h,v
                                    position: "m-r"//[t,m,b]-[l,m,r]
                                },
                                pielabel: {
                                    r: 100,
                                    color: "#E9EFF8",
                                    title: [
                                        {text: "空号比例", color: "", fontSize: 14, lineHeight: 16},
                                        {text: "xxxxx", color: "", fontSize: 12, lineHeihgt: 14}
                                    ]
                                },
                                data: [
                                    {value: 20, rotate: 40, color: "primary", label: "移动", name: "移动", isclick: false},
                                    {value: 30, rotate: 30, color: "danger", label: "电信", name: "电信", isclick: false},
                                    {value: 50, rotate: 200, color: "info", label: "联通", name: "联通", isclick: false},
                                    {value: 60, rotate: 145, color: "success", label: "name", name: "", isclick: false},
                                    {value: 20, rotate: 90, color: "warning", label: "name", name: "", isclick: false},
                                    {value: 40, rotate: 60, color: "info", label: "name", name: "", isclick: false}
                                ]
                            };
                            $(".aa").axisChart(option);
                            $(".bb").pieChart(option2);
                        }
                    }
                });
            });
        </script>
    </head>
    <body></body>
</html>
