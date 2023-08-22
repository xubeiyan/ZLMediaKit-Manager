<script setup>
import { ref } from 'vue';

import StreamOnServer from '../components/StreamOnServer.vue';
import AddStreamProxy from '../components/AddStreamProxy.vue';
import CloseStreamProxy from '../components/CloseStreamProxy.vue';

const tab = ref(null);
</script>
<template>
  <v-sheet class="wrapper">
    <v-tabs v-model="tab" bg-color="primary">
      <v-tab value="stream_on_server">视频流</v-tab>
    </v-tabs>
    <v-window class="pa-4" v-model="tab">
      <v-sheet>
        <AddStreamProxy />
        <CloseStreamProxy />
      </v-sheet>
      <v-divider class="my-2" />
      <v-window-item value="stream_on_server">
        <StreamOnServer />
      </v-window-item>
    </v-window>
  </v-sheet>
</template>

<style scoped></style>