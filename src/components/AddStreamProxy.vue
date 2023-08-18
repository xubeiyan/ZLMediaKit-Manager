<script setup>
import { reactive, computed } from 'vue';

import { useMutation } from '@tanstack/vue-query';

import api from '../utils/api';

// 从pinia获取保存的后端地址和密钥
import { useGlobalStore } from '../stores/global.js';

const store = useGlobalStore();

// 添加视频流对话框
const dialog = reactive({
  open: false,
  title: '拉取新视频流',
  url: '',
  vhost: '__defaultVhost__',
  app: '',
  stream: '',
  error: null
});

// 打开添加视频流对话框
const openAddStreamProxyDialog = () => {
  dialog.open = true;
}

const mutation = useMutation({
  mutationFn: async () => {
    const backEndpoint = computed(() => store.storage.backEndpoint).value;
    const apiPrefix = computed(() => store.storage.apiPrefix).value;
    const secret = computed(() => store.storage.secret).value;

    let res = await api.get(`${backEndpoint}${apiPrefix}/api/addStreamProxy`, {
      params: {
        secret,
        url: dialog.url,
        vhost: dialog.vhost,
        app: dialog.app,
        stream: dialog.stream,
      },
    });

    if (res.code == -300) {
      throw new Error(res.msg);
    } else if (res.code == -100) {
      throw new Error('密钥错误');
    }

    return res;
  },
  onError: (err) => {
    dialog.error = err.message;
  },
  onSuccess: (data) => {
    if (data.code == 0) {
      dialog.open = false;
    }

  }
})

const addStreamProxy = () => {
  dialog.error = null;
  mutation.mutate();
}

</script>

<template>
  <v-sheet>
    <v-btn @click="openAddStreamProxyDialog">拉取新视频流</v-btn>
    <v-dialog v-model="dialog.open" width="40em">
      <v-card>
        <v-card-title>{{ dialog.title }}</v-card-title>
        <v-card-text>
          <v-text-field v-model="dialog.url" density="compact" label="拉取视频源地址" hint="rtmp或rtsp地址"
            placeholder="rtmp://127.0.0.1/live/0" />
          <v-text-field v-model="dialog.vhost" density="compact" label="虚拟主机名" hint="默认为__defaultVhost__"
            placeholder="__defaultVhost__" />
          <v-text-field v-model="dialog.app" density="compact" label="应用名" hint="rtmp://127.0.0.1/live/stream中的live即为应用名" />
          <v-text-field v-model="dialog.stream" density="compact" label="推流码" hint="rtmp://127.0.0.1/live/stream中的stream即为推流码" />

          <v-alert v-if="dialog.error != null" type="error" density="compact">{{ dialog.error }}</v-alert>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn variant="tonal" @click="dialog.open = false">取消</v-btn>
          <v-btn variant="tonal" color="primary" @click="addStreamProxy">添加</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-sheet>
</template>