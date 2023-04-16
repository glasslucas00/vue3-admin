import { defineStore } from "pinia";
import { store } from "../index";
export type BasicType = {
    label: number | string;
    value: number | string;
};
export const StationData: BasicType[] = [
    // { label: "* 车辆段 *", value: 0 },
    { label: "黄龙体育中心", value: 1 },
    { label: "文三路", value: 2 },
    { label: "学院路", value: 3 },
    { label: "翠柏路", value: 4 },
    { label: "北大桥", value: 5 },
    { label: "和睦", value: 6 },
    { label: "花园岗", value: 7 },
    { label: "渡驾桥", value: 8 },
    { label: "祥园路", value: 9 },
    { label: "杭行路", value: 10 },
    { label: "金德路", value: 11 },
    { label: "逸盛路", value: 12 }
];

export const useStationStore = defineStore({
    id: "station",
    persist: true,
    state: () => {
        return { MetroName: "", StationList: StationData, MeasSearchForm: { timestamp: "" }, AbnormSearchForm: {} };
    },
    actions: {
        setRoute(val: string) {
            this.MetroName = val;
            console.log(this.MetroName);
        },
        setMeasSearchForm(val: any) {
            this.MeasSearchForm = val;
            console.log(this.MeasSearchForm);
            console.log("store save MeasSearchForm:", this.MeasSearchForm);
        },
        setAbnormSearchForm(val: any) {
            this.AbnormSearchForm = val;
            console.log("store save AbnormSearchForm:", this.AbnormSearchForm);
        }
    }
});

// 便于外部使用
export const useStationStoreWithOut = () => {
    return useStationStore(store);
};
