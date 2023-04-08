import * as XLSX from "xlsx"; // Vue3 版本
// import { useTimeAgo, useNow, useDateFormat } from "@vueuse/core";
import { useStationStoreWithOut } from "@/stores/modules/station";
import { abnormType, TableColumn } from "./table";
import dayjs from "dayjs";

export const exportXlsx = (tableData: any) => {
    // console.log("tableData", tableData);
    const head: any = {
        id: "序号",
        timestamp: "日期",
        direction: "方向",
        id_station_next: "下一站",
        anchor_name: "定位点编号 ",
        anchor_distance_m: "距离杆位置(m)",
        velocity_km_per_h: "车速(km/h) ",
        distance_from_last_station_m: " 距离上一站距离(m)",
        abrasion: "磨耗(mm)",
        height: "导高(mm) ",
        stagger: "拉出值(mm)",
        temperature_max: "温度",
        abrasion_other: "导线残高(mm)",
        voltage: "双线距离(mm)"
    };

    const list = tableData.map((item: any) => {
        const obj: any = {};
        for (const k in head) {
            if (item[k]) {
                obj[head[k]] = item[k];
            }
        }
        // for (const k in item) {
        //     if (head[k]) {
        //         obj[head[k]] = item[k];
        //     }
        // }
        return obj;
    });
    const time = useStationStoreWithOut().MeasSearchForm.timestamp;
    // console.log(time);

    const now = dayjs().format("YYYY-MM-DD_HH:mm:ss").toString();
    const data = XLSX.utils.json_to_sheet(list);
    // 创建工作簿
    const wb = XLSX.utils.book_new();
    // 将工作表放入工作簿中
    XLSX.utils.book_append_sheet(wb, data, "data");
    // 生成文件并下载
    XLSX.writeFile(wb, time + "测量数据.xlsx");
};

export const processItems = (items: any[]) => {
    items.map((x) => {
        x.timestamp = parseTime(x.timestamp);
        x.id_station_next = useStationStoreWithOut().StationList[x.id_station_next - 1].label;
        x.direction = x.direction > 0 ? "上行" : x.direction < 0 ? "下行" : "未知";
        // x.file_img = "https://127.0.0.1/"+ x.file_img;
        x.file_img = "https://i.328888.xyz/2023/02/28/eu4MP.jpeg";
        x.file_video = "https://media.vued.vanthink.cn/sparkle_your_name_am360p.mp4";

        x.type = abnormType[x.type];
        return null;
    });
    return items;
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
                // time = time.replace(new RegExp(/-/gm), "/");
                time = time.replace(/-/gm, "/");
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
