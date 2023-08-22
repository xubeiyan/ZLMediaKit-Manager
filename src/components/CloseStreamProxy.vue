<script setup>
import { useMutation } from '@tanstack/vue-query';
import { reactive, ref, computed } from 'vue';

import api from '../utils/api';

// 从pinia获取保存的后端地址和密钥
import { useGlobalStore } from '../stores/global.js';
const store = useGlobalStore();

const dialog = reactive({
  open: false,
  streamList: [],
});

const openDialog = () => {
  dialog.open = true;
  mutation.mutate();
}

// 通知条
const snackbar = reactive({
  open: false,
  text: '',
})

// 获取视频流列表
const mutation = useMutation({
  mutationFn: async () => {
    const backEndpoint = computed(() => store.storage.backEndpoint).value;
    const apiPrefix = computed(() => store.storage.apiPrefix).value;
    const secret = computed(() => store.storage.secret).value;

    let res = await api.get(`${backEndpoint}${apiPrefix}/api/getMediaList`, {
      params: {
        secret,
      }
    });

    if (res.code == -300) {
      throw new Error('没有提供密钥');
    } else if (res.code == -100) {
      throw new Error('密钥错误');
    }

    // 没有则返回空
    if (res.data == undefined) {
      return [];
    }

    return res.data;
  },
  onSuccess: (data) => {
    // 筛选出originType为4（pull）和5（fmpeg_pull）的
    let pullStreams = [];
    data.forEach(one => {
      if (one.originType != 4 && one.originType != 5) return;

      const title = `${one.app}-${one.stream}`;

      const filtered = pullStreams.filter(s => s.title == title);

      if (filtered.length > 0) return;

      pullStreams.push({
        title,
        value: `${one.vhost}/${one.app}/${one.stream}`,
        selected: false,
      });
    })

    dialog.streamList = pullStreams;
  }
});

// 关闭视频流请求
const closeMutation = useMutation({
  mutationFn: async () => {
    const backEndpoint = computed(() => store.storage.backEndpoint).value;
    const apiPrefix = computed(() => store.storage.apiPrefix).value;
    const secret = computed(() => store.storage.secret).value;

    let streamLength = 0;

    dialog.streamList.forEach(one => {
      if (!one.selected) return;
      api.get(`${backEndpoint}${apiPrefix}/api/delStreamProxy`, {
        params: {
          secret,
          key: one.value
        }
      });
      streamLength += 1;
    });

    return streamLength;
  },
  onSettled: (data) => {
    dialog.open = false;

    snackbar.text = `成功关闭${data}条视频流，请等待视频流列表刷新`;
    snackbar.open = true;
  }
});
</script>

<template>
  <v-btn @click="openDialog" prepend-icon="mdi-video-minus-outline">关闭视频流</v-btn>
  <v-dialog v-model="dialog.open" width="40em">
    <v-card>
      <v-card-title>关闭视频流</v-card-title>
      <v-card-text>
        <v-alert v-if="dialog.streamList.length == 0" border="start" border-color="warning">没有拉取的视频流</v-alert>
        <v-list v-if="dialog.streamList.length > 0">
          <v-list-item v-for="one in dialog.streamList" :key="one.title" :title="one.title">
            <template v-slot:prepend>
              <v-list-item-action start>
                <v-checkbox-btn v-model="one.selected"></v-checkbox-btn>
              </v-list-item-action>
            </template>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn variant="tonal" @click="dialog.open = false">取消</v-btn>
        <v-btn variant="tonal" color="primary" @click="closeMutation.mutate()">确认</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-snackbar v-model="snackbar.open">
    {{ snackbar.text }}
  </v-snackbar>
</template>