<script setup>
import { version, homepage } from '../../package.json';
</script>

<template>
  <v-sheet class="px-16 pt-8">
    <v-card class="">
      <v-card-title>关于此工具</v-card-title>
      <v-card-subtitle>基于 MIT 协议开源的 <a href="https://github.com/ZLMediaKit/ZLMediaKit" target="_blank">ZLMediaKit</a>
        前端框架</v-card-subtitle>
      <v-card-text>当前版本：ver {{ version }}</v-card-text>
      <v-card-actions>
        <a :href="homepage" target="_blank">
          <v-btn icon="mdi-github" class="text-black"></v-btn>
          <v-tooltip activator="parent" location="bottom">GitHub</v-tooltip>
        </a>
      </v-card-actions>
    </v-card>
  </v-sheet>
</template>