<script setup>
import { computed, reactive, ref } from 'vue';

// 从pinia获取保存的后端地址和密钥
import { useGlobalStore } from '@/stores/global.js';
const store = useGlobalStore();

import Video from '../components/VideoDialog/Video.vue';
import VideoUrl from './VideoDialog/VideoUrl.vue';
import { useQuery } from '@tanstack/vue-query';
import api from '../utils/api';

const dialog = reactive({
  open: false,
});

const videoEleRef = ref(null);

const prop = defineProps(['name', 'schemaArr', 'app']);

const ports = reactive({
  rtsp: null,
  rtmp: null,
  http: null,
});

useQuery({
  queryKey: ['videoSourceType'],
  queryFn: async () => {
    const backEndpoint = computed(() => store.storage.backEndpoint).value;
    const apiPrefix = computed(() => store.storage.apiPrefix).value;
    const secret = computed(() => store.storage.secret).value;

    let res = await api.get(`${backEndpoint}${apiPrefix}/api/getServerConfig`, {
      params: {
        secret,
      }
    });

    const data = res.data[0];

    if (data['rtsp.port']) {
      ports.rtsp = data['rtsp.port'];

    }

    if (data['rtmp.port']) {
      ports.rtmp = data['rtmp.port'];
    }

    return '';
  }
})

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
  } else if (type == 'ts') {
    return `${backEndpoint}${prop.app}/${prop.name}.live.ts`;
  } else if (type == 'rtsp') {
    const url = new URL(`${backEndpoint}`);
    return `rtsp://${url.hostname}:${ports.rtsp}/${prop.app}/${prop.name}`
  } else if (type == 'rtmp') {
    const url = new URL(`${backEndpoint}`);
    return `rtmp://${url.hostname}:${ports.rtmp}/${prop.app}/${prop.name}`
  }
}

// 各种视频流的地址
const urls = computed(() => {
  const urlObj = {};
  if (prop.schemaArr.includes('fmp4')) {
    urlObj.mp4 = getVideoUrl({ type: 'mp4' });
    urlObj.flv = getVideoUrl({ type: 'flv' });
    urlObj.ts = getVideoUrl({ type: 'ts' });
  }

  if (prop.schemaArr.includes('rtsp')) {
    urlObj.rtsp = getVideoUrl({ type: 'rtsp' });
  }

  if (prop.schemaArr.includes('rtmp')) {
    urlObj.rtmp = getVideoUrl({ type: 'rtmp' });
  }


  return urlObj;
});

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
        <VideoUrl :urls="urls" />
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