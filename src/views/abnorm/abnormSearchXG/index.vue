<template>
    <div>
        <base-box title="数据查询">
            <base-filter :columns="FormColumn" :search-info="options" @search="search" @excel="exportExcel" show-open> </base-filter>
        </base-box>

        <base-box title="数据表格">
            <template #extra>
                <base-column-setting v-model:table-columns="table3Config.columns" :show-filter="true" />
            </template>
            <base-table
                :columns="table3Config.columns"
                :data="tableData"
                show-setting
                :pagination="pagination"
                :length="datatotal"
                @pagination-change="paginationChange"
            >
                <template #tableColumn2="{ scope, column }">
                    <div v-if="column.fieldName === 'file_img'">
                        <el-image
                            :src="scope.row.file_img"
                            :zoom-rate="1.2"
                            :preview-src-list="imgList"
                            preview-teleported
                            fit="cover"
                            style="width: 120px; height: 80px"
                            lazy
                        />
                    </div>
                </template>
                <template #tableColumn="{ scope, column }">
                    <div v-if="column.fieldName === 'file_video'">
                        <el-button v-show="scope.row.file_video" type="text" @click="openVideo(scope.$index, scope.row)">查看视频 </el-button>
                    </div>
                </template>
            </base-table>
        </base-box>
        <base-dialog ref="baseDialogRef" modal-type="blur" destroy-on-close title="视频"> <base-video :src="videosrc"></base-video></base-dialog>
    </div>
</template>

<script lang="ts" setup>
import { VideoPlayer } from "@videojs-player/vue";
import "video.js/dist/video-js.css";
import { searchAbnormXG, deleteAbnormXG } from "@/api/info";
import { FormColumn, Data } from "./column";
import type { Column } from "element-plus";
import { parseTime, exportXlsx, processItems } from "./fun";
import { useStationStoreWithOut } from "@/stores/modules/station";
import { loadStationStore } from "@/utils/storage";
import { tableData } from "./table";

const TableColumn: any[] = [
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
    },
    {
        fieldName: "#",
        fieldDesc: "删除",
        formType: "operation",
        width: 155,
        fixed: "right",
        operation: [
            {
                icon: "delete",
                label: "删除",
                confirm: true,
                callFunction: (e: any) => {
                    tableData.value.splice(e.$index, 1);
                    deleteAbnormXG({ file_img: e.row.file_img });
                    pagination.value.total = pagination.value.total - 1;
                    console.log(pagination.value.total);
                }
            }
        ]
    }
];

const table3Config: any = reactive({
    columns: TableColumn
});

const imgList = [
    "https://i.328888.xyz/2023/02/28/eu4MP.jpeg",
    "https://i.328888.xyz/2023/02/28/euUmt.jpeg",
    "https://i.328888.xyz/2023/02/28/euDtX.jpeg"
];
// console.log(MetroStore.StationList);
const baseDialogRef = ref();
const MetroStore = useStationStoreWithOut();
// const tableData:any=ref([]);
const pagination: any = ref([]);
const pageSize = ref(50);
const pageIndex = ref(1);
const datatotal = ref(0);
const videosrc = ref("https://2media.vued.vanthink.cn/sparkle_your_name_am720p.mp4");

const search = (searchForm: any): void => {
    // console.log(header);
    const MetroName = loadStationStore("MetroName");
    searchForm.metro_name = MetroName;
    searchForm.pageSize = pageSize.value;
    searchForm.pageIndex = pageIndex.value;
    console.log("查询条件：", searchForm);
    MetroStore.setAbnormSearchForm(searchForm);
    const data = searchAbnormXG(searchForm);
    data.then((value) => {
        console.log(value);

        datatotal.value = value.data.total;
        console.log("datatotal.value", datatotal.value);

        const items = processItems(value.data.items);
        tableData.value = items;
        // console.log(tableData.value);

        // console.log(value.data);
        // MetroStore.MetroName=selectvalue.value;
        // console.log('select metro:',MetroStore.MetroName);
        // console.log(options);
    });
};

const openVideo = (index: any, row: any) => {
    videosrc.value = row.file_video;
    unref(baseDialogRef).showDialog();
};
const deleteItem = () => {
    datatotal.value = datatotal.value - 1;
};
const paginationChange = () => {
    console.log(pagination.value);
    pageIndex.value = pagination.value?.currentPage ?? 1;
    pageSize.value = pagination.value?.pageSize ?? 50;
    console.log("pageIndex", pageIndex.value);
    console.log("pageSize", pageSize.value);
    const searchForm = loadStationStore("AbnormSearchForm");
    search(searchForm);
};

const exportExcel = (): void => {
    console.log("导出EXCEl中...");

    if (tableData.value) {
        exportXlsx(tableData.value);
    }

    // console.log(MetroStore.MetroName);
};
const options = reactive(loadStationStore("AbnormSearchForm"));
</script>
<style lang="scss" scoped>
// .player-container {
//   /* width: 1500; */
//   height: 800px;
// //   background-color: #fff;
// //   border-radius: 5px;
// //   border: 1px solid #ccc;
// }
</style>
