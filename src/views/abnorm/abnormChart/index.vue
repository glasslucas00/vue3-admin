<template>
    <div>
        <base-box title="数据查询">
            <base-filter :columns="FormColumn" :search-info="options" @search="search" @excel="exportExcel" show-open> </base-filter>
        </base-box>

        <base-box title="统计图表">
            <el-row :gutter="24">
                <el-col class="chart2" :span="24">
                    <base-box title="异常统计">
                        <base-charts type="bar" :height="600" :options="BarOptions" />
                    </base-box>
                </el-col>
            </el-row>

            <el-row class="chart2">
                <el-col :span="24">
                    <base-box title="燃弧统计">
                        <base-charts :height="600" :options="LineBarOptions" />
                    </base-box>
                </el-col>
            </el-row>
        </base-box>
    </div>
</template>

<script lang="ts" setup>
import { searchAbnormS1, searchAbnormS2 } from "@/api/info";
import { FormColumn, BarOptions, LineBarOptions } from "./column";
import type { Column } from "element-plus";
import { parseTime, exportXlsx, processItems, processStatics } from "./fun";
import { useStationStoreWithOut } from "@/stores/modules/station";
import { loadStationStore } from "@/utils/storage";
import { TableColumn, tableData } from "./table";

const search = (searchForm: any): void => {
    // console.log(header);
    const MetroName = loadStationStore("MetroName");
    searchForm.metro_name = MetroName;
    console.log("anchor异常统计:", searchForm);
    const data = searchAbnormS1(searchForm);
    data.then((value) => {
        const OptionsList = processItems(value.data.items);
        BarOptions.value.xAxis = OptionsList[0];
        BarOptions.value.series = OptionsList[1];
        // tableData.value=tableData
        // console.log(BarOptions.value.series);
    });
    search2(searchForm);
};
const search2 = (searchForm: any): void => {
    // console.log(header);
    const MetroName = loadStationStore("MetroName");
    searchForm.metro_name = MetroName;
    console.log("燃弧异常统计：", searchForm);
    const data = searchAbnormS2(searchForm);
    data.then((value) => {
        const OptionsList = processStatics(value.data.items);
        LineBarOptions.value.xAxis = OptionsList[0];
        LineBarOptions.value.series = OptionsList[1];
        console.log(LineBarOptions.value.series);
    });
};

const exportExcel = (): void => {
    console.log("导出EXCEl中...");

    if (tableData.value) {
        exportXlsx(tableData.value);
    }

    // console.log(MetroStore.MetroName);
};
const options = reactive({});
</script>
<style lang="scss" scoped>
.chart2 {
    top: 20px;
}
// .player-container {
//   /* width: 1500; */
//   height: 800px;
// //   background-color: #fff;
// //   border-radius: 5px;
// //   border: 1px solid #ccc;
// }
</style>
