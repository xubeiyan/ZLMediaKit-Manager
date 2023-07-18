<script setup>
const props = defineProps(['trail']);

const items = [
  { text: '主页', icon: 'mdi-home', link: '/' },
  { text: '关于', icon: 'mdi-account-multiple', link: '/about' },
];
</script>
<template>
  <v-navigation-drawer permanent :rail="$props.trail">
    <v-list nav>
      <v-list-item v-for="(item, i) in items" :key="i" :value="item">
        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>
        <v-list-item-title v-text="item.text"></v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>