function randNum(){
    return ((Math.floor( Math.random()* (1+40-20) ) ) + 20)* 1200;
}

function randNum2(){
    return ((Math.floor( Math.random()* (1+40-20) ) ) + 20) * 500;
}

function randNum3(){
    return ((Math.floor( Math.random()* (1+40-20) ) ) + 20) * 300;
}

function randNum4(){
    return ((Math.floor( Math.random()* (1+40-20) ) ) + 20) * 100;
}

$(document).ready(function(){

    /* ---------- Chart with points ---------- */
    if($("#dotChart").length)
    {
        var likes = [[1, 5+randNum()], [2, 10+randNum()], [3, 40+randNum()], [4, 60+randNum()],[5, 90+randNum()],[6, 40+randNum()],[7, 25+randNum()],[8, 35+randNum()]];

        var plot = $.plot($("#dotChart"),
            [ { data: likes} ], {
                series: {
                    lines: { show: true,
                        lineWidth: 2,
                        fill: true, fillColor: { colors: [ { opacity: 0.1 }, { opacity: 0.2 } ] }
                    },
                    points: { show: true,
                        lineWidth: 3
                    },
                    shadowSize: 0
                },
                grid: { hoverable: true,
                    clickable: true,
                    tickColor: "#f9f9f9",
                    borderWidth: 0
                },
                xaxis: {ticks:20, tickDecimals: 0},
                yaxis: {ticks:7, tickDecimals: 0},
            });

        function showTooltip(x, y, contents) {
            $('<div id="tooltip">' + contents + '</div>').css( {
                position: 'absolute',
                display: 'none',
                top: y + 5,
                left: x + 5,
                border: '1px solid #fdd',
                padding: '2px',
                'background-color': '#dfeffc',
                opacity: 0.80
            }).appendTo("body").fadeIn(200);
        }

        var previousPoint = null;
        $("#dotChart").bind("plothover", function (event, pos, item) {
            $("#x").text(pos.x.toFixed(2));
            $("#y").text(pos.y.toFixed(2));

            if (item) {
                if (previousPoint != item.dataIndex) {
                    previousPoint = item.dataIndex;

                    $("#tooltip").remove();
                    var x = item.datapoint[0].toFixed(2),
                        y = item.datapoint[1].toFixed(2);

                    showTooltip(item.pageX, item.pageY,
                        item.series.label + " of " + x + " = " + y);
                }
            }
            else {
                $("#tooltip").remove();
                previousPoint = null;
            }
        });

    }

    /* ---------- Stack chart ---------- */
    if($("#stackchart").length)
    {
        var d1 = [];
        for (var i = 0; i <= 10; i += 1)
            d1.push([i, parseInt(Math.random() * 30)]);


        var stack = 0, bars = true, lines = false, steps = false;

        function plotWithOptions() {
            $.plot($("#stackchart"), [ d1 ], {
                series: {
                    stack: stack,
                    lines: { show: lines, fill: true, steps: steps },
                    bars: { show: bars, barWidth: 0.6 },
                },
                colors: ["#dfdfef"]
            });
        }

        plotWithOptions();

    }
});