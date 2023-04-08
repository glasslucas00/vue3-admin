import { defineStore } from "pinia";
import { store } from "../index";
export type BasicType = {
    label: number | string;
    value: number | string;
};
export const StationData: BasicType[] = [
    // { label: "* 车辆段 *", value: 0 },
    { label: "浦沿", value: 1 },
    { label: "杨家墩", value: 2 },
    { label: "中医药大学", value: 3 },
    { label: "联庄", value: 4 },
    { label: "水澄桥", value: 5 },
    { label: "复兴路", value: 6 },
    { label: "南星桥", value: 7 },
    { label: "甬江路", value: 8 },
    { label: "近江", value: 9 },
    { label: "城星路", value: 10 },
    { label: "市民中心", value: 11 },
    { label: "江锦路", value: 12 },
    { label: "钱江路", value: 13 },
    { label: "景芳", value: 14 },
    { label: "新塘", value: 15 },
    { label: "新风", value: 16 },
    { label: "火车东站", value: 17 },
    { label: "彭埠", value: 18 },
    { label: "明石路", value: 19 },
    { label: "黎明", value: 20 },
    { label: "觉桥老街", value: 21 },
    { label: "华中南路", value: 22 },
    { label: "新天地街", value: 23 },
    { label: "皋亭坝", value: 24 },
    { label: "桃源街", value: 25 },
    { label: "吴家角港", value: 26 },
    { label: "独城生态公园", value: 27 },
    { label: "平安桥", value: 28 },
    { label: "储运路", value: 29 },
    { label: "杭行路", value: 30 },
    { label: "好运街", value: 31 },
    { label: "金家渡", value: 32 },
    { label: "池华街", value: 33 }
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
