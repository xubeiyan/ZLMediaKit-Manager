<script setup>
import { reactive } from 'vue';

import AppBar from './layout/AppBar.vue';
import Navigation from './layout/Navigation.vue';

// 左边导航栏
const nav = reactive({
  trail: false,
});

// 切换导航菜单打开关闭
const toggleNav = () => {
  nav.trail = !nav.trail;
}

</script>

<template>
  <v-layout>
    <AppBar @toggleNav="toggleNav" />
    <Navigation :trail="nav.trail" />
    <v-main class="main">
      <router-view />
    </v-main>
  </v-layout>
</template>

<style scoped>
.main {
  min-height: 100vh;
}
</style>
