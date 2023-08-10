import { defineStore } from 'pinia';
import { reactive } from 'vue';

export const useGlobalStore = defineStore('global', () => {
  const initialValue = {
    backEndpoint: 'http://127.0.0.1:9000/',
    apiPrefix: 'index',
    refreshTime: '10',
    secret: 'abcde',
  }

  const fromLocalStorage = window.localStorage.getItem('globalSetting');
  const storageValue = JSON.parse(fromLocalStorage);
  let storage = null;

  if (fromLocalStorage == undefined) {
    storage = reactive(initialValue);
  } else {
    // Object.assign(target, source) 指的是target目标中的相同键值的被source覆盖
    storage = reactive(Object.assign(initialValue, storageValue));
  }

  function $saveToLocalStorage(toSave) {
    window.localStorage.setItem('globalSetting', JSON.stringify(toSave));
  }

  return { storage, $saveToLocalStorage };
})