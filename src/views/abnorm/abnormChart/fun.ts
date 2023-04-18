import * as XLSX from "xlsx"; // Vue3 版本
// import { useTimeAgo, useNow, useDateFormat } from "@vueuse/core";
import { useStationStoreWithOut } from "@/stores/modules/station";
import { abnormType, colorType, TableColumn } from "./table";
import dayjs from "dayjs";
const colors = ["#5470C6", "#EE6666", "#EE6666"];

export const exportXlsx = (tableData: any, csvinfo: any) => {
    const time = useStationStoreWithOut().MeasSearchForm.timestamp;
    console.log(csvinfo);
    const now = dayjs().format("YYYY-MM-DD_HH:mm:ss").toString();
    const data = XLSX.utils.json_to_sheet(tableData);
    // 创建工作簿
    const wb = XLSX.utils.book_new();
    // 将工作表放入工作簿中
    XLSX.utils.book_append_sheet(wb, data, "data");
    // 生成文件并下载
    XLSX.writeFile(wb, csvinfo + "_杆号异常统计数据.xlsx");
};

export const processItems = (Data: any) => {
    const SeriesData = [];
    for (const key in Data) {
        SeriesData.push({
            name: abnormType[key],
            type: "bar",
            stack: "PC",
            data: Data[key],
            barWidth: "10",
            barGap: "2%",
            itemStyle: {
                color: colorType[key]
            }
        });

        // SeriesData.push({name:abnormType[key],data:Data[key]})
    }

    return SeriesData;
};
export const processStatics = (items: any) => {
    console.log(items);

    const dayslist = items.map((x: any) => {
        return dayjs(x.timestamp).subtract(1, "day").format("YYYY-MM-DD").toString();
    });
    const xAxisData = [
        {
            type: "category",
            axisTick: {
                alignWithLabel: true
            },
            data: dayslist
        }
    ];
    // console.log(xAxisData);
    const SeriesData = [];
    SeriesData.push({
        name: "燃弧次数",
        type: "bar",
        color: colors[0],
        barWidth: "20",
        data: items.map((x: any) => {
            return x.count;
        })
    });
    SeriesData.push({
        name: "燃弧率",
        type: "line",
        yAxisIndex: 1,
        color: colors[1],
        data: items.map((x: any) => {
            return (x.value / x.runtime_day) * 100;
        })
    });

    // console.log([xAxisData,SeriesData]);

    return [xAxisData, SeriesData];
};

// Parse the time to string
export const parseTime = (time?: object | string | number | null, cFormat?: string): string | any => {
    if (time === undefined || !time) {
        return null;
    }
    const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
    let date: Date;
    if (typeof time === "object") {
        date = time as Date;
    } else {
        if (typeof time === "string") {
            if (/^[0-9]+$/.test(time)) {
                // support "1548221490638"
                time = parseInt(time);
            } else {
                // support safari
                // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
                // eslint-disable-next-line prefer-regex-literals
                time = time.replace(new RegExp(/-/gm), "/");
            }
        }
        if (typeof time === "number" && time.toString().length === 10) {
            time = time * 1000;
        }
        date = new Date(time);
    }
    const formatObj: { [key: string]: number } = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    };
    const timeStr = format.replace(/{([ymdhisa])+}/g, (result, key) => {
        const value = formatObj[key];
        // Note: getDay() returns 0 on Sunday
        if (key === "a") {
            return ["日", "一", "二", "三", "四", "五", "六"][value];
        }
        return value.toString().padStart(2, "0");
    });
    return timeStr;
};
