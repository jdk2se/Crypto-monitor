<template>
  <Header />
  <div class="content__wrapper">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import Header from "@/components/Header.vue";
import { onBeforeMount } from "vue";
import { useCoinStore } from "@/stores/coinStore.ts";

onBeforeMount(() => {
  useCoinStore().getPairData();
});
</script>