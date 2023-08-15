<script setup>
import { ref } from 'vue';
import SettingDialog from '../components/SettingDialog.vue';

const emit = defineEmits(['toggleNav']);

const settingDialog = ref(null);
// 打开设置对话框
const openDialog = () => {
  settingDialog.value.openDialog();
}

</script>
<template>
  <v-app-bar density="compact">
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click="$emit('toggleNav')"></v-app-bar-nav-icon>
    </template>
    <v-app-bar-title>ZLMediaKit 媒体服务器 管理工具</v-app-bar-title>
    <v-btn icon @click="openDialog">
      <v-icon>mdi-cog</v-icon>
      <v-tooltip activator="parent" location="bottom end" origin="auto">
        设置
      </v-tooltip>
    </v-btn>
    <SettingDialog ref="settingDialog" />
  </v-app-bar>
</template>