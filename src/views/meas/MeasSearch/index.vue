<template>
    <div>
        <base-box title="数据查询">
            <base-filter :columns="FormColumn" :search-info="options" @search="search" @excel="exportExcel" show-open> </base-filter>
        </base-box>

        <base-box title="数据查询">
            <div style="height: 800px">
                <el-auto-resizer>
                    <template #default="{ height, width }">
                        <el-table-v2 :columns="columns" :data="Data" :width="width" :height="height" fixed />
                    </template>
                </el-auto-resizer>
            </div>
        </base-box>
    </div>
</template>

<script lang="ts" setup>
import { searchMeasTable } from "@/api/info";
import { FormColumn, TableColumn } from "./column";
import type { Column } from "element-plus";
import { parseTime, exportXlsx, processItems } from "./fun";
import { useStationStoreWithOut } from "@/stores/modules/station";
import { loadStationStore } from "@/utils/storage";

// console.log(MetroStore.StationList);
const Data: any = ref([]);
const MetroStore = useStationStoreWithOut();
// const { StationList, MetroName,MeasSearchForm  } = storeToRefs(MetroStore);
const search = (searchForm: any): void => {
    // console.log(MetroStore.MetroName);

    // const storeinfo:any = localStorage.getItem("station");
    // console.log(storeinfo);
    const MetroName = loadStationStore("MetroName");
    searchForm.metro_name = MetroName;
    console.log("查询条件：", searchForm);
    MetroStore.setMeasSearchForm(searchForm);
    const data = searchMeasTable(searchForm);
    data.then((value) => {
        Data.value = processItems(value.data.items);
        console.log(Data.value);

        // console.log(value.data);
        // MetroStore.MetroName=selectvalue.value;
        // console.log('select metro:',MetroStore.MetroName);
        // console.log(options);
    });
};
const exportExcel = (): void => {
    console.log("导出EXCEl中...");

    if (Data.value) {
        exportXlsx(Data.value);
    }

    // console.log(MetroStore.MetroName);
};
const options = reactive({});

const columns = TableColumn;
</script>
