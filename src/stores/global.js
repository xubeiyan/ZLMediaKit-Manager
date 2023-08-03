import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useGlobalStore = defineStore('global', () => {
  const initialValue = {
    backEndpoint: 'http://127.0.0.1:9000/',
    apiPrefix: 'index',
    secret: 'abcde',
  }

  const backEndpoint = ref(initialValue.backEndpoint);
  const apiPrefix = ref(initialValue.apiPrefix);
  const secret = ref(initialValue.secret);

  function $reset() {
    backEndpoint.value = initialValue.backEndpoint;
    apiPrefix.value = initialValue.apiPrefix;
    secret.value = initialValue.secret;
  }

  return { backEndpoint, apiPrefix, secret, $reset };
})