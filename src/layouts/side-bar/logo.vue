<template>
    <router-link to="/" class="flex-center side-logo">
        <base-icon svg-name="metro" :size="200" color="#fff" />

        <!-- <div class="app-logo">
            
        </div> -->

        <!-- <div class="side-logo-title text-hidden flex-auto">{{ title }}</div> -->
    </router-link>
</template>

<script lang="ts" setup>
const props = defineProps({
    title: {
        type: String,
        default: ""
    }
});
</script>

<style scoped></style>
