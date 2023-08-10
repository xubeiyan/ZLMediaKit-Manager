<script setup>
import { computed, nextTick, reactive, ref } from 'vue';

import Mpegts from 'mpegts.js';

// 从pinia获取保存的后端地址和密钥
import { useGlobalStore } from '../stores/global.js';

const store = useGlobalStore();

const dialog = reactive({
  open: false,
})

const videoEleRef = ref();

const prop = defineProps(['name', 'schema', 'app']);
// 播放器
let player = null;

// 对话框状态
const openDialog = async () => {
  dialog.open = true;

  // 等待下一次渲染
  await nextTick();

  if (prop.schema !== 'fmp4') return;

  if (!Mpegts.getFeatureList().mseLivePlayback) {
    return
  }

  Mpegts.LoggingControl.enableAll = false;

  const url = getVideoUrl({ type: 'flv' });

  player = Mpegts.createPlayer({
    type: 'flv',
    isLive: true,
    url,
  });

  const video = document.querySelector('#video');

  player.attachMediaElement(video);
  player.load();
  player.play();
}

// 关闭对话框
const closeDialog = () => {
  dialog.open = false;

  if (player == null) return;

  player.unload();
  player.destroy();

}

defineExpose({
  openDialog,
});

// 获取视频播放地址
const getVideoUrl = ({ type }) => {
  const backEndpoint = computed(() => store.storage.backEndpoint).value;
  if (type == 'flv') {
    return `${backEndpoint}${prop.app}/${prop.name}.live.flv`;
  } else if (type == 'mp4') {
    return `${backEndpoint}${prop.app}/${prop.name}.live.mp4`;
  }
}
</script>

<template>
  <v-dialog persistent v-model="dialog.open" width="60em">
    <v-btn size="x-small" color="red" class="close-button" @click="closeDialog" icon>
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <v-card>
      <v-card-title>详细视频 - {{ prop.name }} - {{ prop.schema }}</v-card-title>
      <v-card-text>
        <video id="video" ref="videoEleRef" class="video" v-if="prop.schema == 'fmp4'"></video>
        <template v-if="prop.schema == 'fmp4'">
          <v-text-field label="http/flv 地址" hide-details="auto"
            :model-value="getVideoUrl({ type: 'flv' })"></v-text-field>
          <v-text-field label="http/mp4 地址" hide-details="auto"
            :model-value="getVideoUrl({ type: 'mp4' })"></v-text-field>
        </template>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.close-button {
  position: absolute;
  right: 0;
  top: 0;
  z-index: 10;
  translate: 50% -50%;
}

.video {
  width: 100%;
}
</style>