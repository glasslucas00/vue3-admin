<template>
    <div class="player-container">
        <VideoPlayer :src="srclink" poster="/your-path/poster.jpg" controls :loop="true" :volume="0.6" :fluid="true" />
    </div>
</template>

<script lang="ts" setup>
// "https://media.vued.vanthink.cn/sparkle_your_name_am360p.mp4"
import { VideoPlayer } from "@videojs-player/vue";
import "video.js/dist/video-js.css";
import { useVModel } from "@vueuse/core";
const props = defineProps({
    src: {
        type: String,
        default: "https://2media.vued.vanthink.cn/sparkle_your_name_am360p.mp4"
    },
    endPlaceholder: {
        type: String,
        default: "结束时间"
    },
    format: {
        type: String,
        default: "YYYY/MM/DD"
    },
    valueFormat: {
        type: String,
        default: "YYYY-MM-DD"
    },
    rangeSeparator: {
        type: String,
        default: "~"
    }
});
const srclink: any = useVModel(props, "src");
// const srclink: string = props.src;
</script>

<style scoped>
.player-container {
    width: 100%;
}
</style>
