import { FormColumnType } from "@/components/base-form";
import { FormTypeEnum } from "@/enums/componentEnum";
// import { Column } from "@/components/base-table/src/types";
import { getAllRoleList } from "@/api/system/role";
import { StatusData } from "@/constant/basic";
import { useStationStoreWithOut } from "@/stores/modules/station";
import type { Column } from "element-plus";
import dayjs from "dayjs";

const columnsWidth = 0;
export const TableColumn: Column<any>[] = [
    {
        key: "timestamp",
        dataKey: "timestamp",
        title: "日期",
        width: columnsWidth
    },
    {
        key: "direction",
        dataKey: "direction",
        title: "方向",
        width: columnsWidth
    },
    {
        key: "id_station_next",
        dataKey: "id_station_next",
        title: "下一站",
        width: columnsWidth
    },
    {
        key: "anchor_distance_m",
        dataKey: "anchor_distance_m",
        title: "最近定位点距离",
        width: columnsWidth
    },
    // {
    //     key: "velocity_km_per_h",
    //     dataKey: "velocity_km_per_h",
    //     title: "速度(km/h)",
    //     width: columnsWidth
    // },
    {
        key: "distance_from_last_station_m",
        dataKey: "distance_from_last_station_m",
        title: "距离上一站距离(m)",
        width: columnsWidth
    },
    {
        key: "abrasion",
        dataKey: "abrasion",
        title: "磨耗(mm)",
        width: columnsWidth
    },
    {
        key: "height",
        dataKey: "height",
        title: "导高(mm)",
        width: columnsWidth
    },
    {
        key: "stagger",
        dataKey: "stagger",
        title: "拉出值(mm)",
        width: columnsWidth
    },
    {
        key: "temperature_max",
        dataKey: "temperature_max",
        title: "温度(℃)",
        width: columnsWidth
    },
    {
        key: "h",
        dataKey: "h",
        title: "导线残高(mm)",
        width: columnsWidth
    },
    {
        key: "stagger_distance",
        dataKey: "stagger_distance",
        title: "双线距离(mm)",
        width: columnsWidth
    }
];

export const Data = [
    {
        timestamp: 1995552,
        direction: 1,
        id_station_next: 15,
        anchor_distance_m: 11,
        velocity_km_per_h: 78.5,
        distance_from_last_station_m: 1152,
        abrasion: 23,
        height: 5452,
        stagger: 256,
        temperature_max: 75,
        h: 12,
        stagger_distance: 250
    }
];

export type BasicType = {
    label: number | string;
    value: number | string;
};
export const StationData: BasicType[] = useStationStoreWithOut().StationList;
export const DirectionData: BasicType[] = [
    {
        label: "上行",
        value: 1
    },
    {
        label: "下行",
        value: -1
    }
];
export const WarmTypes: BasicType[] = [
    {
        label: "导高异常",
        value: 1
    },
    {
        label: "拉出值异常",
        value: 2
    },
    {
        label: "磨耗异常",
        value: 3
    },
    {
        label: "燃弧异常",
        value: 10
    },
    {
        label: "温度异常",
        value: 11
    }
];
export const WarmLevel: BasicType[] = [
    {
        label: "一级",
        value: 1
    },
    {
        label: "二级",
        value: 2
    },
    {
        label: "三级",
        value: 3
    }
];

// console.log(counterStore.StationList);

export const FormColumn: FormColumnType[] = [
    {
        fieldName: "type",
        fieldDesc: "告警类型",
        fieldType: FormTypeEnum.SELECT,
        show: false,
        config: {
            options: WarmTypes,
            multiple: true
        }
    },
    {
        fieldName: "timestamp",
        fieldDesc: "日期选择",
        fieldType: FormTypeEnum.DATER
    },

    {
        fieldName: "id_station_pre",
        fieldDesc: "起始站",
        fieldType: FormTypeEnum.SELECT,
        config: {
            options: StationData
        }
    },
    {
        fieldName: "id_station_next",
        fieldDesc: "截至站",
        fieldType: FormTypeEnum.SELECT,
        config: {
            options: StationData
        }
    },
    {
        fieldName: "direction",
        fieldDesc: "方向",
        fieldType: FormTypeEnum.SELECT,
        config: {
            options: DirectionData,
            multiple: true
        }
    },
    // {
    //     fieldName: "level",
    //     fieldDesc: "告警等级",
    //     fieldType: FormTypeEnum.SELECT,
    //     config: {
    //         options: WarmLevel,
    //         multiple: true
    //     }
    // },
    {
        fieldName: "distance",
        fieldDesc: "距离",
        fieldType: FormTypeEnum.INPUT
    }
    // {
    //     fieldName: "role",
    //     fieldDesc: "ApiSelect",
    //     fieldType: FormTypeEnum.SELECT,
    //     config: {
    //         api: getAllRoleList,
    //         labelKey: "roleName",
    //         valueKey: "role"
    //     }
    // },

    // {
    //     fieldName: "slot",
    //     fieldDesc: "自定义slot",
    //     fieldType: FormTypeEnum.SLOT
    // }
];
