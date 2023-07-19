<script setup>
import { computed, reactive } from 'vue';
// 设置对话框
const dialog = reactive({
  open: false,
});

// 打开对话框
const openDialog = () => {
  dialog.open = true;
}

// 暴露此方法
defineExpose({
  openDialog
});

// 从pinia获取保存的后端地址和密钥
import { storeToRefs } from 'pinia';
import { useGlobalStore } from '../stores/global.js';

const store = useGlobalStore();
const { backEndpoint, secret } = storeToRefs(store);

// 测试地址
import { useMutation } from '@tanstack/vue-query';

import api from '../utils/api';

const alert = reactive({
  err: null,
  warn: null,
});

const { isIdle, isLoading, isError, isSuccess, mutate } = useMutation({
  mutationFn: async () => {
    alert.err = null;
    let res = await api.get(`${backEndpoint.value}index/api/getApiList`, {
      params: {
        secret: secret.value,
      }
    });

    if (res.code == -300) {
      throw new Error('没有提供密钥');
    } else if (res.code == -100) {
      throw new Error('密钥错误');
    }

    return res;
  },
  onError: (err) => {
    alert.err = err.message;
  },
  onSuccess: (data) => {
    // console.log(data);
  },
});

// 计算测试按钮的值
const testStatus = computed(() => {
  if (isError.value) return 'fail';
  else if (isSuccess.value) return 'success';
  else if (isLoading.value) return 'loading';
  else if (isIdle.value) return 'idle';
});

// 计算按钮的背景
const buttonColor = computed(() => {
  if (isError.value) return 'error';
  else if (isSuccess.value) return 'success';
  else if (isLoading.value) return 'secondary';
  else if (isIdle.value) return 'info';
  else return '';
});
</script>

<template>
  <v-dialog v-model="dialog.open" width="30em">
    <v-card>
      <v-card-title>设置</v-card-title>
      <v-card-text>
        <v-text-field v-model="backEndpoint" label="后端API地址" density="compact"></v-text-field>
        <v-text-field v-model="secret" label="密钥" density="compact"></v-text-field>
        <v-alert density="compact" v-if="alert.err != null" type="error" :text="alert.err" />
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn variant="tonal" :color="buttonColor" @click="mutate()">
          <v-icon v-if="testStatus == 'fail'" icon="mdi-close" />
          <v-icon v-else-if="testStatus == 'success'" icon="mdi-check" />
          <v-icon v-else-if="testStatus == 'loading'" icon="mdi-loading" />
          <span v-else>测试</span>
        </v-btn>
        <v-btn variant="tonal" color="warning" @click="store.$reset">重置</v-btn>
        <v-btn variant="tonal" @click="dialog.open = false">关闭</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
