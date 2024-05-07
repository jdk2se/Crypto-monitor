<template>
  <Header />
  <div class="content__wrapper" v-if="!coinStore.isLoading">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import Header from "@/components/Header.vue";
import { onBeforeMount } from "vue";
import { useCoinStore } from "@/stores/coinStore.ts";

const coinStore = useCoinStore();
onBeforeMount(() => {
  coinStore.getPairData();
});
</script>