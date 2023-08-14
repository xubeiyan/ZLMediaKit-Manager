<script setup>
import { onMounted, ref } from 'vue';

import Mpegts from 'mpegts.js';
// 播放器
let player = null;

const videoEleRef = ref(null);

const prop = defineProps(['url']);

// 载入Video
const loadVideo = (url) => {
  if (!Mpegts.getFeatureList().mseLivePlayback) {
    return
  }

  Mpegts.LoggingControl.enableAll = false;

  player = Mpegts.createPlayer({
    type: 'flv',
    isLive: true,
    url,
  });

  player.attachMediaElement(videoEleRef.value);
  player.load();
  player.play();
};

// 销毁Video
const destroyVideo = () => {
  if (player == null) return;

  player.unload();
  player.destroy();
}

defineExpose({
  destroyVideo,
});

onMounted(() => {
  if (prop.url == undefined) return;

  loadVideo(prop.url);
})

</script>

<template>
  <video id="video" ref="videoEleRef" class="video"></video>
</template>

<style scoped>
.video {
  width: 100%;
}
</style>