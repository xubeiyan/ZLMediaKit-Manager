<script setup>
const props = defineProps(['trail']);

import { useRouter } from 'vue-router';
const router = useRouter();

const toLink = (path) => {
  router.push(path);
}

const items = [
  { text: '主页', icon: 'mdi-home', link: '/' },
  { text: '服务器状态', icon: 'mdi-poll', link: '/serverstatus' },
  { text: '关于', icon: 'mdi-information-box-outline', link: '/about' },
];

</script>
<template>
  <v-navigation-drawer permanent :rail="$props.trail">
    <v-list nav>
      <v-list-item v-for="(item, i) in items" :key="i" :value="item" @click="toLink(item.link)">
        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>
        <v-list-item-title v-text="item.text"></v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>