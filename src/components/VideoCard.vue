<script setup>
import { ref, onMounted, onUnmounted, reactive } from 'vue';

import { useMutation } from '@tanstack/vue-query';
import api from '../utils/api';

// 从pinia获取保存的后端地址和密钥
import { storeToRefs } from 'pinia';
import { useGlobalStore } from '../stores/global.js';

const store = useGlobalStore();
const { backEndpoint, secret } = storeToRefs(store);

const prop = defineProps(['originUrl', 'schema', 'name']);

const mutation = useMutation({
  mutationFn: async () => {
    let res = await api.get(`${backEndpoint.value}index/api/getSnap`, {
      params: {
        secret: secret.value,
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
    image.value.src = window.URL.createObjectURL(data);
  }
})

// 对话框
const dialog = reactive({
  open: false,
})

// 打开对话kuang
const openDialog = () => {
  dialog.open = true;
}

// 略缩图片
const image = ref();

let timer = null;

onMounted(() => {
  mutation.mutate();
  timer = setInterval(() => {
    mutation.mutate();
  }, 10 * 1000);
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
    <v-card-subtitle>{{ prop.schema }}</v-card-subtitle>
    <v-card-text>
      <img ref="image" class="snap-image" />
    </v-card-text>
    <v-card-actions class="justify-end">
      <v-btn variant="tonal" color="primary" @click="openDialog">详情</v-btn>
    </v-card-actions>
  </v-card>
  <v-dialog v-model="dialog.open">

  </v-dialog>
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