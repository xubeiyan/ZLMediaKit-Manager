<script setup>
import { useMutation } from '@tanstack/vue-query';
import { onMounted, reactive, computed } from 'vue';

import api from '../utils/api';

// 从pinia获取保存的后端地址和密钥
import { useGlobalStore } from '../stores/global.js';
const store = useGlobalStore();

const config = reactive({
  serverStatistic: null,
});

const { isSuccess, error, mutate } = useMutation({
  mutationFn: async () => {
    const backEndpoint = computed(() => store.storage.backEndpoint).value;
    const apiPrefix = computed(() => store.storage.apiPrefix).value;
    const secret = computed(() => store.storage.secret).value;

    let res = await api.get(`${backEndpoint}${apiPrefix}/api/getStatistic`, {
      params: {
        secret,
      }
    });

    if (res.code == -300) {
      throw new Error('没有提供密钥');
    } else if (res.code == -100) {
      throw new Error('密钥错误');
    }

    config.serverStatistic = res.data;
  }
});

onMounted(() => {
  mutate();
});
</script>

<template>
  <v-btn @click="mutate()">刷新</v-btn>
  <v-divider class="my-2" />
  <v-alert v-if="error" type="error">{{ error }}</v-alert>
  <v-table density="compact" v-if="isSuccess">
    <thead>
      <tr>
        <th>参数名</th>
        <th>参数值</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="[key, value] in Object.entries(config.serverStatistic)">
        <td>{{ key }}</td>
        <td>{{ value }}</td>
      </tr>
    </tbody>
  </v-table>
</template>