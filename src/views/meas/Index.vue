<!--
 * @Description:
 * @Autor: WJM
 * @Date: 2021-01-18 14:53:33
 * @LastEditors: lucas
 * @LastEditTime: 2023-04-08 14:54:36
-->
<template>
    <div style="padding: 30px">
        <el-alert :closable="false" title="menu 1">
            <transition name="fade-transform" mode="out-in">
                <router-view />
            </transition>
        </el-alert>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>
