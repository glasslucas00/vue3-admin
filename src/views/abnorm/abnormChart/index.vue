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
// import { useMessage } from "@/hooks";
import { messageSuccess, messageError, messageInfo, messageWarning, messageBox } from "@/utils/message";

// const { success, warning, error, info } = useMessage();
const tableData = ref([]);
const MetroStore = useStationStoreWithOut();
// const csvInfo=ref('');
const search = (searchForm: any): void => {
    // console.log(header);
    const MetroName = loadStationStore("MetroName");
    if (!MetroName) {
        messageError("请先选择车次");
    }
    searchForm.metro_name = MetroName;

    console.log("anchor异常统计:", searchForm);
    MetroStore.setAbnormSearchForm(searchForm);
    const data = searchAbnormS1(searchForm);
    data.then((value) => {
        tableData.value = value.data.table;
        console.log(tableData.value);
        BarOptions.value.xAxis = [{ data: value.data.dict.anchorname }];
        BarOptions.value.series = processItems(value.data.dict.abnorm);
    }).catch(() => {
        console.log("error");
        messageError("查询失败");
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
        // console.log(LineBarOptions.value.series);
    }).catch(() => {
        console.log("error");
        messageError("查询失败");
    });
};

const exportExcel = (): void => {
    if (tableData.value.length) {
        console.log("导出EXCEl中...");
        const MetroName = loadStationStore("MetroName");
        const csvInfo = MetroName + "_" + options.timestamp[0] + "_" + options.timestamp[1];
        exportXlsx(tableData.value, csvInfo);
    } else {
        messageError("请先查询数据");
    }

    // console.log(MetroStore.MetroName);
};
const options = reactive(loadStationStore("AbnormSearchForm"));
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
