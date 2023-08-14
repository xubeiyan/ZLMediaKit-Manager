<script setup>
import { computed, onMounted, reactive, ref } from 'vue';

import Video from '../components/VideoDialog/Video.vue';

// 从pinia获取保存的后端地址和密钥
import { useGlobalStore } from '../stores/global.js';

const store = useGlobalStore();

const dialog = reactive({
  open: false,
});

const videoEleRef = ref(null);

const prop = defineProps(['name', 'schemaArr', 'app']);


// 对话框状态
const openDialog = async () => {
  dialog.open = true;
}

// 关闭对话框
const closeDialog = () => {
  dialog.open = false;

  if (videoEleRef.value == null) return;
  videoEleRef.value.destroyVideo();
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
  } else if (type == 'rtsp') {
    const url = new URL(`${backEndpoint}`);

    return `rtsp://${url.hostname}`
  }
}

</script>

<template>
  <v-dialog persistent v-model="dialog.open" width="60em">
    <v-btn size="x-small" color="red" class="close-button" @click="closeDialog" icon>
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <v-card>
      <v-card-title>详细视频 - {{ prop.name }} </v-card-title>
      <v-card-text>
        <Video ref="videoEleRef" v-if="prop.schemaArr.includes('fmp4')" :url="getVideoUrl({ type: 'flv' })" />
        <template v-if="prop.schemaArr.includes('fmp4')">
          <v-text-field label="http/flv 地址" hide-details="auto" density="compact"
            :model-value="getVideoUrl({ type: 'flv' })"></v-text-field>
          <v-text-field label="http/mp4 地址" hide-details="auto" density="compact"
            :model-value="getVideoUrl({ type: 'mp4' })"></v-text-field>
        </template>
        <template v-if="prop.schemaArr.includes('rtsp')">
          <v-text-field label="rtsp 地址" hide-details="auto" density="compact"
            :model-value="getVideoUrl({ type: 'rtsp' })"></v-text-field>
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
</style>