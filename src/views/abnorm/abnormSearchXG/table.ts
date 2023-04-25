import { Column } from "@/components/base-table/src/types";
import { deleteAbnormXG } from "@/api/info";
import { local } from "@/utils";
const router = useRouter();
const columnsWidth = 90;
export const TableColumn: Column[] = [
    {
        fieldName: "timestamp",
        fieldDesc: "日期"
    },
    {
        fieldName: "direction",
        fieldDesc: "方向"
    },
    {
        fieldName: "id_station_next",
        fieldDesc: "下一站"
    },
    {
        fieldName: "type",
        fieldDesc: "异常类型"
        // formType: "tag"
    },
    {
        fieldName: "velocity_km_per_h",
        fieldDesc: "速度(km/h)"
    },
    {
        fieldName: "distance_from_last_station_m",
        fieldDesc: "距离上一站距离(m)"
    },
    {
        fieldName: "level",
        fieldDesc: "告警等级"
        // formType: "tag"
    },
    {
        fieldName: "anchor_name",
        fieldDesc: "定位点编号"
    },
    {
        fieldName: "anchor_distance_m",
        fieldDesc: "定位点距离"
    },
    {
        fieldName: "value",
        fieldDesc: "数值"
    },
    {
        fieldName: "file_img",
        fieldDesc: "图片",
        formType: "slot"
    }
    // {
    //     fieldName: "#",
    //     fieldDesc: "删除",
    //     formType: "operation",
    //     width: 155,
    //     fixed: "right",
    //     operation: [
    //         // {
    //         //     icon: "edit",
    //         //     label: "编辑",
    //         //     callFunction: () => {}
    //         // },
    //         {
    //             icon: "delete",
    //             label: "删除",
    //             confirm: true,
    //             callFunction: (e) => {
    //                 console.log("delete",e.row.file_img);
    //                 // deleteAbnormXG({file_img:e.row.file_img});
    //                 router.push({
    //                     path: "/abnorm/searchXG"
    //                 });
    //                 // setTimeout(() => {

    //                 // }, 100);
    //                 // location.reload();

    //             }
    //         },
    //         // {
    //         //     label: "新增",
    //         //     callFunction: () => {}
    //         // },
    //         // {
    //         //     label: "修改",
    //         //     callFunction: () => {}
    //         // }
    //     ]
    // }
];
export const tableData: any = ref([
    // {
    //     id: "12",
    //     direction: "上行",
    //     file_img: "https://i.328888.xyz/2023/02/28/eu4MP.jpeg",
    //     sss:'dd'
    // },
    // {
    //     id: "124",
    //     direction: "成功,Nice",
    //     file_img: "https://i.328888.xyz/2023/02/28/euUmt.jpeg",
    //     file_video:"https://media.vued.vanthink.cn/sparkle_your_name_am360p.mp4"
    // }
]);

export const abnormType: any = {
    1: "导高异常",
    2: "拉出值异常",
    3: "磨耗异常",
    10: "燃弧异常",
    11: "温度异常",
    20: "受电弓异常",
    21: "羊角异常",
    30: "悬挂异常",
    41: "硬点"
};

export const head: any = {
    id: "序号",
    timestamp: "日期",
    direction: "方向",
    id_station_next: "下一站",
    type: "异常类型",
    anchor_name: "定位点编号 ",
    anchor_distance_m: "距离杆位置(m)",
    velocity_km_per_h: "车速(km/h) ",
    distance_from_last_station_m: " 距离上一站距离(m)",
    level: "告警等级",
    value: "数值",
    file_img: "图片",
    temperature_max: "温度"
};
