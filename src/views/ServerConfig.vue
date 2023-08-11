<script setup>
import { ref } from 'vue';

import ServerConfig from '../components/ServerConfig.vue';
import ServerStatistics from '../components/ServerStatistics.vue';

const tab = ref(null)
</script>
<template>
  <v-sheet>
    <v-tabs v-model="tab" bg-color="primary">
      <v-tab value="server_config">服务器配置</v-tab>
      <v-tab value="server_statistics">服务器统计</v-tab>
    </v-tabs>
    <v-window class="pa-4" v-model="tab">
      <v-window-item value="server_config">
        <ServerConfig />
      </v-window-item>
      <v-window-item value="server_statistics">
        <ServerStatistics />
      </v-window-item>
    </v-window>
  </v-sheet>
</template>