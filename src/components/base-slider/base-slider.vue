<template>
    <div class="slider-demo-block">
        <el-slider v-model="value" range show-stops v-bind="getPropsValue" />
    </div>
</template>

<script lang="ts" setup>
import { useVModel } from "@vueuse/core";
const props = defineProps({
    modelValue: [String, Number, Array, Date],
    max: {
        type: Number
    },
    min: {
        type: Number
    },
    step: {
        type: Number
    }
});
const emit = defineEmits(["update:modelValue"]);

const value: any = useVModel(props, "modelValue", emit, { passive: true });

const attrs = useAttrs();

const getPropsValue = computed(() => {
    return { ...props, ...attrs };
});
</script>

<style scoped>
.slider-demo-block {
    display: flex;
    align-items: center;
}
.slider-demo-block .el-slider {
    margin-top: 0;
    margin-left: 12px;
    color: black;
}
</style>
