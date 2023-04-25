import { FormColumnType } from "@/components/base-form";
import { FormTypeEnum } from "@/enums/componentEnum";
// import { Column } from "@/components/base-table/src/types";
import { getAllRoleList } from "@/api/system/role";
import { StatusData } from "@/constant/basic";
import { useStationStoreWithOut } from "@/stores/modules/station";
import type { Column } from "element-plus";
import dayjs from "dayjs";
import { isEmpty } from "@/utils/is";

const columnsWidth = 90;

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
export const MeasTypes: BasicType[] = [
    {
        label: "导高",
        value: "height"
    },
    {
        label: "拉出值",
        value: "stagger"
    },
    {
        label: "磨耗",
        value: "abrasion"
    },
    {
        label: "温度",
        value: "temperature_max"
    }
];

// console.log(counterStore.StationList);

export const FormColumn: FormColumnType[] = [
    {
        fieldName: "timestamp",
        fieldDesc: "日期选择",
        fieldType: FormTypeEnum.DATE
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
            options: DirectionData
        }
    },
    {
        fieldName: "meastypes",
        fieldDesc: "测量类型",
        fieldType: FormTypeEnum.SELECT,
        config: {
            options: MeasTypes,
            multiple: true
        }
    },
    {
        fieldName: "height",
        fieldDesc: "导高",
        fieldType: FormTypeEnum.SLIDER,
        config: {
            max: 4200,
            min: 4000,
            step: 1
            // modelValue: [4000, 4200]
        },
        show: (params: any) => {
            console.log(params);
            if (!isEmpty(params.model.meastypes)) {
                if (params.model.meastypes.includes("height")) {
                    return true;
                }
            }
        }
    },
    {
        fieldName: "stagger",
        fieldDesc: "拉出值",
        fieldType: FormTypeEnum.SLIDER,
        config: {
            max: 400,
            min: -400,
            step: 1
            // modelValue: [-400, 400]
        },
        show: (params: any) => {
            console.log(params);
            if (!isEmpty(params.model.meastypes)) {
                if (params.model.meastypes.includes("stagger")) {
                    return true;
                }
            }
        }
    },
    {
        fieldName: "abrasion",
        fieldDesc: "磨耗",
        fieldType: FormTypeEnum.SLIDER,
        config: {
            max: 5,
            min: 0,
            step: 0.1
            // modelValue: [0, 15]
        },
        show: (params: any) => {
            console.log(params);
            if (!isEmpty(params.model.meastypes)) {
                if (params.model.meastypes.includes("abrasion")) {
                    return true;
                }
            }
        }
    },
    {
        fieldName: "temperature_max",
        fieldDesc: "温度",
        fieldType: FormTypeEnum.SLIDER,
        config: {
            max: 60,
            min: 0,
            step: 1
            // modelValue: [0, 60]
        },
        show: (params: any) => {
            console.log(params);
            if (!isEmpty(params.model.meastypes)) {
                if (params.model.meastypes.includes("temperature_max")) {
                    return true;
                }
            }
        }
    }
];
export const TableColumn: Column<any>[] = [
    {
        key: "timestamp",
        dataKey: "timestamp",
        title: "日期",
        width: 150
    },
    {
        key: "direction",
        dataKey: "direction",
        title: "方向",
        width: columnsWidth
        // cellRenderer: ({ cellData: direction }) => (direction > 0 ? "上行" : direction < 0 ? "下行" : "未知")
    },
    {
        key: "id_station_next",
        dataKey: "id_station_next",
        title: "下一站",
        width: columnsWidth + 10
        // cellRenderer: ({ cellData: id_station_next }) => MetroStore.StationList[id_station_next - 1].label
    },
    {
        key: "anchor_name",
        dataKey: "anchor_name",
        title: "定位点编号",
        width: columnsWidth
    },
    // {
    //     key: "anchor_distance_m",
    //     dataKey: "anchor_distance_m",
    //     title: "最近定位点距离(m)",
    //     width: columnsWidth
    // },
    {
        key: "velocity_km_per_h",
        dataKey: "velocity_km_per_h",
        title: "速度(km/h)",
        width: columnsWidth
    },
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
        key: "abrasion_other",
        dataKey: "abrasion_other",
        title: "导线残高(mm)",
        width: columnsWidth
    },
    {
        key: "stagger_other",
        dataKey: "stagger_other",
        title: "双线距离(mm)",
        width: columnsWidth
    }
];
export const FormColumn2: FormColumnType[] = [
    {
        fieldName: "status",
        fieldDesc: "select下拉",
        fieldType: FormTypeEnum.SELECT,
        config: {
            options: StatusData
        }
    },
    {
        fieldName: "导高",
        fieldDesc: "图标选择",
        fieldType: FormTypeEnum.ICON,
        show: (params: any) => {
            return params.model.status === 1;
        }
    },
    {
        fieldName: "slot",
        fieldDesc: "自定义slot",
        fieldType: FormTypeEnum.SLOT,
        show: (params: any) => {
            return params.model.status === 0;
        }
    }
];
