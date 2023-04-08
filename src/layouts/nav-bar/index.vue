<template>
    <div class="nav-wrapper flex-row-center justify-between">
        <div class="nav-basic flex-row-center h100">
            <base-icon :svg-name="getCollapse ? 'unfold' : 'fold'" class="nav-fold pointer box-hover" @click="toggleCollapse(!getCollapse)" />
            <Breadcrumb />
        </div>
        <div class="nav-actions flex-row-center h100">
            <el-select v-model="MetroName" placeholder="Select" @change="handleSelect" @focus="foucus">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <NavSearch />
            <!-- <el-badge :value="count" :hidden="count === 0" :max="10" class="mr5">
                <base-icon svg-name="remind" class="pointer" :size="20" @click="handleGoError" />
            </el-badge> -->
            <NavFullscreen />
            <NavSwitch />
            <NavTextSize />
            <NavUser />
            <Setting />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useMenuSetting } from "../hooks/useMenuSetting";
import { useRouter } from "vue-router";
import Breadcrumb from "./breadcrumb.vue";
import NavUser from "./nav-user.vue";
import NavSearch from "./nav-search.vue";
import NavSwitch from "./nav-switch.vue";
import NavTextSize from "./nav-text-size.vue";
import NavFullscreen from "./nav-fullscreen.vue";
import Setting from "../setting/index.vue";
import { getMetroName } from "@/api/info";
import { useStationStoreWithOut } from "@/stores/modules/station";
import { reactive } from "vue";

const MetroStore = useStationStoreWithOut();
const { StationList, MetroName, MeasSearchForm } = storeToRefs(MetroStore);
// const selectvalue = ref("");
const options = ref<any[]>([]);

// setInterval(() => {
//     console.log(selectvalue.value);

// }, 1000);
const handleSelect = (e: any) => {
    // const MetroStore = useStationStoreWithOut();
    // console.log(MetroStore.MetroName);

    // const { StationList, MetroName,MeasSearchForm } = storeToRefs(MetroStore)
    // console.log(value.data);
    // MetroName=selectvalue.value
    // MetroStore.setRoute(selectvalue.value)
    // MetroStore.MetroName=selectvalue.value;
    console.log("select metro:", MetroStore.MetroName);
    // console.log(options);
};
const foucus = (e: any) => {
    const data = getMetroName();
    data.then((value) => {
        const MetroNames = value.data.items;
        options.value = MetroNames.map((x: any) => {
            return {
                value: x.id_train,
                label: x.id_train
            };
        });

        // for (let key of MetroNames.keys()) {
        //     console.log(key);
        //     console.log(MetroNames[key]);
        // }
    });
    // console.log('==============================');
    // console.log(data);

    // MetroStore.MetroName='123';
};

const { getCollapse, toggleCollapse } = useMenuSetting();
const router = useRouter();
const count = ref(6);

const handleGoError = () => {
    router
        .push({
            name: "ErrorLog"
        })
        .then(() => {
            count.value = 0;
        });
};
</script>

<style lang="scss" scoped>
.nav-wrapper {
    height: 48px;
    border-bottom: 1px solid var(--base-tag-border);
    transition: all 0.2s;
    background-color: var(--base-main-content-bg-color);
    .nav-basic {
        .nav-fold {
            transition: all 0.3s, padding 0s;
            padding: 0 12px;
        }
    }
    .nav-actions {
        :deep(.action-item) {
            padding: 0 12px;
        }
    }
    :deep(.box-hover) {
        height: 100%;
        box-sizing: content-box;
        &:hover {
            background: var(--base-nav-bar-box-hover);
        }
    }
}
</style>
