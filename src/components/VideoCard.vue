<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';

import { useMutation } from '@tanstack/vue-query';
import api from '../utils/api';

import VideoDialog from './VideoDialog.vue';

// 从pinia获取保存的后端地址和密钥
import { useGlobalStore } from '../stores/global.js';

const store = useGlobalStore();

const prop = defineProps(['originUrl', 'originType', 'schemaArr', 'name', 'app']);

const mutation = useMutation({
  mutationFn: async () => {
    const backEndpoint = computed(() => store.storage.backEndpoint).value;
    const apiPrefix = computed(() => store.storage.apiPrefix).value;
    const secret = computed(() => store.storage.secret).value;

    let res = await api.get(`${backEndpoint}${apiPrefix}/api/getSnap`, {
      params: {
        secret,
        url: prop.originUrl,
        timeout_sec: 10,
        expire_sec: 10,
      },
      responseType: 'blob'
    });

    if (res.code == -300) {
      throw new Error('没有提供密钥');
    } else if (res.code == -100) {
      throw new Error('密钥错误');
    }

    return res;
  },
  onSuccess: (data) => {
    if (image.value == undefined) return;
    image.value.src = window.URL.createObjectURL(data);
  }
})

// 对话框ref
const dialogRef = ref(null);

// 打开对话kuang
const openDialog = () => {
  dialogRef.value.openDialog();
}

// 略缩图片
const image = ref();

// 流来源
const originType = computed(() => {
  if (prop.originType == 1 || prop.originType == 2 || prop.originType == 3) {
    return {
      color: 'cyan-darken-4',
      text: '推流',
    };
  } else if (prop.originType == 4 || prop.originType == 5) {
    return {
      color: 'orange-darken-4',
      text: '拉流'
    }
  } else {
    return {
      color: 'grey-darken-4',
      text: '未知'
    };
  }
});

let timer = null;

onMounted(() => {
  mutation.mutate();

  const refreshTime = parseInt(computed(() => store.storage.refreshTime).value);
  const refreshInterval = Number.isFinite(refreshTime) ? refreshTime : 10;
  timer = setInterval(() => {
    mutation.mutate();
  }, refreshInterval * 1000);
});

onUnmounted(() => {
  if (timer == null) {
    return;
  }

  clearInterval(timer);
})

</script>

<template>
  <v-card class="video-card" elevation="5">
    <v-card-title>{{ prop.name }}</v-card-title>
    <v-card-subtitle>{{ prop.schemaArr.join(' / ') }}</v-card-subtitle>
    <v-card-text>
      <img ref="image" class="snap-image" />
    </v-card-text>
    <v-card-actions class="justify-space-between">
      <v-chip :color="originType.color">{{ originType.text }}</v-chip>
      <v-btn variant="tonal" color="primary" @click="openDialog">详情</v-btn>
    </v-card-actions>
  </v-card>
  <VideoDialog ref="dialogRef" :name="prop.name" :schemaArr="prop.schemaArr" :app="prop.app" />
</template>
<style scoped>
.video-card {
  width: 20em;
}

.snap-image {
  display: block;
  width: 100%;
}
</style>