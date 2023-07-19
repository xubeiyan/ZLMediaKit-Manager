import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useGlobalStore = defineStore('global', () => {
  const initialValue = {
    backEndpoint: 'http://10.1.123.123:9000/',
    secret: 'abcde',
  }

  const backEndpoint = ref(initialValue.backEndpoint);
  const secret = ref(initialValue.secret);

  function $reset() {
    backEndpoint.value = initialValue.backEndpoint;
    secret.value = initialValue.secret;
  }

  return { backEndpoint, secret, $reset };
})