<script setup>
import { computed, onMounted } from 'vue';
import { useQuery } from '@tanstack/vue-query';

import api from '../utils/api';

import VideoCard from '../components/VideoCard.vue';

// 从pinia获取保存的后端地址和密钥
import { useGlobalStore } from '../stores/global.js';

const store = useGlobalStore();

const backEndpoint = computed(() => store.storage.backEndpoint).value;
const apiPrefix = computed(() => store.storage.apiPrefix).value;
const secret = computed(() => store.storage.secret).value;


const { isLoading, data, error } = useQuery({
  queryKey: ['mediaList'],
  queryFn: async () => {
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
  }
});

// get 

onMounted(() => {

});
</script>
<template>
  <v-sheet class="wrapper">
    <v-overlay v-model="isLoading" contained class="align-center justify-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-overlay>
    <v-alert v-if="error" border="start" border-color="error">错误：{{ error }}</v-alert>
    <v-alert v-if="data?.length == 0" border="start" border-color="warning">当前没有视频流</v-alert>
    <template v-for="one, index in data" :key="index">
      <VideoCard :origin-url="one.originUrl" :schema="one.schema" :name="one.stream" :app="one.app" />
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