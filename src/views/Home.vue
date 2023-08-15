<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useMutation } from '@tanstack/vue-query';

import api from '../utils/api';

import VideoCard from '../components/VideoCard.vue';

// 从pinia获取保存的后端地址和密钥
import { useGlobalStore } from '../stores/global.js';

const store = useGlobalStore();

// 媒体列表
const mediaList = ref(null);

// 获取媒体列表
const { error, mutate } = useMutation({
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
    // 处理app和stream相同的流
    const mediaArr = [];
    data.forEach(one => {
      const streamId = `${one.app} - ${one.stream}`;
      const filtered = mediaArr.filter(one => one.streamId == streamId);
      // 如果没有这个streamId对应的key
      if (filtered.length == 0) {
        mediaArr.push({
          streamId,
          app: one.app,
          stream: one.stream,
          schemaArr: [one.schema],
          aliveSecond: one.aliveSecond,
          originUrl: one.originUrl,
        })
      } else {
        let certainMedia = filtered[0];
        certainMedia.schemaArr.push(one.schema);
      }
    });

    mediaList.value = mediaArr;
  },
});

let timer = null;

// get 
onMounted(() => {
  mutate();

  const refreshTime = parseInt(computed(() => store.storage.refreshTime).value);
  const refreshInterval = Number.isFinite() ? refreshTime : 10;

  timer = setInterval(() => {
    mutate();
  }, 1000 * refreshInterval);
});

onUnmounted(() => {
  if (timer == null) {
    return;
  }
  clearInterval(timer);
})
</script>
<template>
  <v-sheet class="wrapper">
    <v-alert v-if="error" type="error">{{ error }}</v-alert>
    <v-alert v-if="mediaList?.length == 0" border="start" border-color="warning">当前没有视频流</v-alert>
    <template v-for="one in mediaList">
      <VideoCard :origin-url="one.originUrl" :schemaArr="one.schemaArr" :name="one.stream" :app="one.app" />
    </template>
  </v-sheet>
</template>

<style scoped>
.wrapper {
  position: relative;
  height: 100%;
  display: flex;
  flex-flow: row wrap;
  padding: 1em;
  gap: 1em;
  align-content: start;
}
</style>