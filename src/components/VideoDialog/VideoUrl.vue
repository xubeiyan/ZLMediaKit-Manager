<script setup>
import { reactive } from 'vue';

const prop = defineProps(['urls']);

// 复制的地址
const copied = reactive({
  name: null,
})

// 点击复制按钮
const handleIconClick = (name) => {
  copied.name = name;
  // navigation clipboard需要https环境，clipboard-write权限会自动授予活动标签页
  document.execCommand('copy');
}

</script>
<template>
  <v-text-field v-if="prop.urls.flv" label="http/flv 地址" hide-details="auto" density="compact"
    :model-value="prop.urls.flv" @focus="$event.target.select()">
    <template v-slot:append-inner>
      <v-icon @click="handleIconClick('http/flv')" :icon="copied.name == 'http/flv' ? 'mdi-check' : 'mdi-content-copy'"
        :color="copied.name == 'http/flv' ? 'green' : 'gray'" />
    </template>
  </v-text-field>
  <v-text-field v-if="prop.urls.mp4" label="http/mp4 地址" hide-details="auto" density="compact"
    :model-value="prop.urls.mp4" @focus="$event.target.select()">
    <template v-slot:append-inner>
      <v-icon @click="handleIconClick('http/mp4')" :icon="copied.name == 'http/mp4' ? 'mdi-check' : 'mdi-content-copy'"
        :color="copied.name == 'http/mp4' ? 'green' : 'gray'" />
    </template>
  </v-text-field>
  <v-text-field v-if="prop.urls.ts" label="http/ts 地址" hide-details="auto" density="compact" :model-value="prop.urls.ts"
    @focus="$event.target.select()">
    <template v-slot:append-inner>
      <v-icon @click="handleIconClick('http/ts')" :icon="copied.name == 'http/ts' ? 'mdi-check' : 'mdi-content-copy'"
        :color="copied.name == 'http/ts' ? 'green' : 'gray'" />
    </template>
  </v-text-field>
  <v-text-field v-if="prop.urls.rtsp" label="rtsp 地址" hide-details="auto" density="compact" :model-value="prop.urls.rtsp"
    @focus="$event.target.select()">
    <template v-slot:append-inner>
      <v-icon @click="handleIconClick('rtsp')" :icon="copied.name == 'rtsp' ? 'mdi-check' : 'mdi-content-copy'"
        :color="copied.name == 'rtsp' ? 'green' : 'gray'" />
    </template>
  </v-text-field>
  <v-text-field v-if="prop.urls.rtmp" label="rtmp 地址" hide-details="auto" density="compact" :model-value="prop.urls.rtmp"
    @focus="$event.target.select()">
    <template v-slot:append-inner>
      <v-icon @click="handleIconClick('rtmp')" :icon="copied.name == 'rtmp' ? 'mdi-check' : 'mdi-content-copy'"
        :color="copied.name == 'rtmp' ? 'green' : 'gray'" />
    </template>
  </v-text-field>
</template>

