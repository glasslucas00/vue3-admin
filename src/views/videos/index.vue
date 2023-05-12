<template>
    <div class="com-button-container">
        <base-box title="受电弓视频">
            <base-video :src="videosrc"> </base-video>
        </base-box>
    </div>
</template>

<script lang="ts" setup>
const typeList = ["default", "primary", "success", "info", "warning", "danger"];
const videosrc = "ss.mp4";
</script>

<style lang="scss" scope></style>
