<script setup>
const prop = defineProps(['urls']);
</script>
<template>
  <v-text-field v-if="prop.urls.flv" label="http/flv 地址" hide-details="auto" density="compact"
    :model-value="prop.urls.flv"></v-text-field>
  <v-text-field v-if="prop.urls.mp4" label="http/mp4 地址" hide-details="auto" density="compact"
    :model-value="prop.urls.mp4"></v-text-field>
  <v-text-field v-if="prop.urls.ts" label="http/ts 地址" hide-details="auto" density="compact"
    :model-value="prop.urls.ts"></v-text-field>
  <v-text-field v-if="prop.urls.rtsp" label="rtsp 地址" hide-details="auto" density="compact"
    :model-value="prop.urls.rtsp"></v-text-field>
  <v-text-field v-if="prop.urls.rtmp" label="rtmp 地址" hide-details="auto" density="compact"
    :model-value="prop.urls.rtmp"></v-text-field>
</template>

