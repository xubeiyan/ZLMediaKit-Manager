<script setup>
import { reactive } from 'vue';

const emit = defineEmits(['toggleNav']);

const dialog = reactive({
  open: false,
});
</script>
<template>
  <v-app-bar density="compact">
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click="$emit('toggleNav')"></v-app-bar-nav-icon>
    </template>
    <v-app-bar-title>ZLMediaKit 媒体服务器 管理工具</v-app-bar-title>
    <v-btn icon @click="dialog.open = true">
      <v-icon>mdi-cog</v-icon>
    </v-btn>
    <v-dialog v-model="dialog.open" width="30em">
      <v-card>
        <v-card-title>设置</v-card-title>
        <v-card-text>
          <v-text-field label="后端API地址" density="compact"></v-text-field>
          <v-text-field label="密钥" density="compact"></v-text-field>
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn variant="tonal" color="primary" @click="dialog.open = false">保存</v-btn>
          <v-btn variant="tonal" @click="dialog.open = false">关闭</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app-bar>
</template>