import { searchMeasChart } from "@/api/info";
import { useStationStoreWithOut } from "@/stores/modules/station";
import { LineOptions } from "./column";

const colors = ["#7cb5ec", "#434348", "#90ed7d", "#f7a35c", "#8085e9", "#f15c80", "#e4d354", "#8085e8", "#8d4653", "#91e8e1"];

export const processChartsData = (items: any, chartsDatas: any) => {
    let tempdata = [];
    // let tempstagger = [];
    // for (let i = 0; i < 9; i++) {
    //     chartsDatas[i] = [];
    // }
    for (let i = 0; i < items.length; i++) {
        const x = items[i];
        // console.log(x.distance_from_last_station_m,x.stagger,x.stagger_other);
        chartsDatas[0].push([x.distance_from_last_station_m, x.abrasion]);
        chartsDatas[1].push([x.distance_from_last_station_m, x.temperature_max]);

        chartsDatas[4].push([x.distance_from_last_station_m, x.abrasion_other]);
        chartsDatas[5].push([x.distance_from_last_station_m, x.stagger_other]);

        // data 3
        if (x.height_other) {
            // console.log('x.height_other',x.height_other);
            tempdata.push([x.distance_from_last_station_m, x.height]);
            chartsDatas[3].push([x.distance_from_last_station_m, x.height_other]);
        } else {
            if (tempdata.length > 0 && tempdata.length < 10) {
                tempdata.unshift([x.distance_from_last_station_m - 0.1, null]);
                // tempdata[0]=[tempdata[0][0], null)
                tempdata.push([x.distance_from_last_station_m, x.height]);

                tempdata.map((y) => {
                    chartsDatas[3].push(y);
                    return 0;
                });

                tempdata = [];
            } else {
                // let  a= [x.distance_from_last_station_m, x.height);
                chartsDatas[3].push([x.distance_from_last_station_m, x.height]);
            }
        }
        // data 2
        // if (x.stagger_other) {
        //     // console.log('x.stagger_other',x.stagger_other);
        //     // console.log('cc',);
        //     const endstagger = chartsDatas[2].slice(-1)[0][1];
        //     if (endstagger * x.stagger_other > 0) {
        //         tempstagger.push([x.distance_from_last_station_m, x.stagger]);
        //         chartsDatas[2].push([x.distance_from_last_station_m, x.stagger_other]);
        //     } else {
        //         tempstagger.push([x.distance_from_last_station_m, x.stagger_other]);
        //         chartsDatas[2].push([x.distance_from_last_station_m, x.stagger]);
        //     }

        //     // console.log('dd',chartsDatas[2]);
        // } else {
        //     if (tempstagger.length > 0 && tempstagger.length < 10) {
        //         tempstagger.unshift([x.distance_from_last_station_m - 0.1, null]);
        //         // if (4-tempstagger.length==2){
        //         //   tempstagger.push([x.distance_from_last_station_m-2.5, x.stagger+2])
        //         //   tempstagger.push([x.distance_from_last_station_m-1, x.stagger-3])
        //         // }
        //         // if (4-tempstagger.length==1){
        //         //   tempstagger.push([x.distance_from_last_station_m-2.5, x.stagger+2])
        //         // }
        //         tempstagger.push([x.distance_from_last_station_m, x.stagger]);

        //         tempstagger.map((y) => {
        //             chartsDatas[2].push(y);
        //             return 0;
        //         });

        //         tempstagger = [];
        //     } else {
        //         // let  a= [x.distance_from_last_station_m, x.height);
        //         chartsDatas[2].push([x.distance_from_last_station_m, x.stagger]);
        //     }
        // }
    }
    return chartsDatas;
};

export const processTrueData = (truedata: any, chartsDatas: any) => {
    let temptruedata = [];
    const newtruedata = [];
    for (let i = 1; i < truedata.length - 1; ) {
        // let x_before=truedata[i-1].stagger
        const xi = truedata[i].stagger;
        const xafter = truedata[i + 1].stagger;
        // let diff_before=Math.abs(x_before-xi)
        const diffafter = Math.abs(xafter - xi);
        // 190--175
        if (diffafter > 160) {
            newtruedata.push(truedata[i]);
            temptruedata.push(truedata[i + 1]);
            i = i + 2;
        } else {
            if (temptruedata.length > 0) {
                const end = newtruedata.slice(-1)[0];
                const end2 = JSON.parse(JSON.stringify(end));
                Object.assign(end2, end);
                // console.log('end1',end);
                end2.stagger = null;
                end2.distance_from_last_station_m = end.distance_from_last_station_m + 8;
                // console.log('end2',end2);

                newtruedata.push(end2);

                for (let p = 0; p < temptruedata.length; p++) {
                    newtruedata.push(temptruedata[p]);
                }
                temptruedata = [];
            }
            newtruedata.push(truedata[i]);
            i++;
        }
    }
    // 真导高
    chartsDatas[6] = newtruedata.map((x) => {
        return [x.distance_from_last_station_m, x.height];
    });
    // 真拉出值
    chartsDatas[7] = newtruedata.map((x) => {
        return [x.distance_from_last_station_m, x.stagger];
    });
    // 竖线
    chartsDatas[8] = newtruedata.map((x) => {
        return {
            xAxis: x.distance_from_last_station_m, // 对于x轴中的一个值,
            label: {
                show: true, // 是否展示文字
                color: "#b1b3b8",
                fontSize: 12,
                formatter: x.name
            },
            lineStyle: {
                color: "#b1b3b8",
                width: 1, // 0 的时候可以隐藏线
                type: "dashed" // 实线，不写默认虚线
            }
        };
    });
    // return newtruedata;
    return chartsDatas;
};

export const chartsSeries = (chartsDatas: any) => {
    const dataSeries = [] as any;
    dataSeries[0] = {
        name: "磨耗",
        tooltip: {
            formatter: "{c1}mm"
        },
        type: "line",
        symbol: "none",
        yAxisIndex: 0,
        color: colors[0],
        data: chartsDatas[0]
        //  dataMap.list.map(x => {
        //   return [x.distance_from_last_station_m, x.abrasion);
        // })
    };
    dataSeries[1] = {
        name: "温度",
        tooltip: {
            formatter: "{c1}mm"
        },
        type: "line",
        symbol: "none",
        yAxisIndex: 1,
        color: colors[1],
        data: chartsDatas[1]
        // dataMap.list.map(x => {
        //   return [x.distance_from_last_station_m, x.temperature_avg);
        // })
    };
    dataSeries[2] = {
        name: "拉出值",
        tooltip: {
            formatter: "{c1}mm"
        },
        type: "line",
        symbol: "none",
        yAxisIndex: 2,
        color: colors[2],
        data: chartsDatas[2]
        // dataMap.list.map(x => {
        //   return [x.distance_from_last_station_m,x.stagger);
        // })
    };
    dataSeries[3] = {
        name: "导高",
        tooltip: {
            formatter: "{c1}mm"
        },
        type: "line",
        symbol: "none",
        yAxisIndex: 3,
        color: colors[3],
        data: chartsDatas[3]
    };
    // console.log('dataSeries[3]',dataSeries[3] );

    dataSeries[4] = {
        name: "导线残高",
        tooltip: {
            formatter: "{c1}mm"
        },
        type: "line",
        symbol: "none",
        yAxisIndex: 4,
        color: colors[4],
        data: chartsDatas[4]
    };
    dataSeries[5] = {
        name: "双线距离",
        tooltip: {
            formatter: "{c1}mm"
        },
        type: "line",
        symbol: "none",
        yAxisIndex: 5,
        color: colors[5],
        data: chartsDatas[5]
    };

    dataSeries[6] = {
        name: "True导高",
        tooltip: {
            formatter: "{c1}mm"
        },
        type: "line",
        symbol: "none",
        yAxisIndex: 3,
        color: colors[6],
        data: chartsDatas[6]
    };
    dataSeries[7] = {
        name: "True拉出值",
        tooltip: {
            formatter: "{c1}mm"
        },
        type: "line",
        symbol: "none",
        yAxisIndex: 2,
        color: colors[8],
        data: chartsDatas[7]
    };
    dataSeries[8] = {
        name: "杆号",
        type: "line", // 如果将 markLine 单独写在一个对象里，就必须加 type ，不然报错。
        markLine: {
            symbol: "none", // 相当于["none", "none"] [虚线，没有箭头]
            silent: true, // true 不响应鼠标事件
            data: chartsDatas[8]
        }
    };
    return dataSeries;
};
