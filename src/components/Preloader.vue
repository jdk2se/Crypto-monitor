<template>
    <div
        v-if="coinStore.isLoading"
        class="loader__wrapper"
    >
      <div class="loader__content"/>
    </div>
</template>

<script setup lang="ts">
import { useCoinStore } from "@/stores/coinStore.ts";

const coinStore = useCoinStore();
</script>

<style scoped lang="scss">
.loader {
  &__wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.4);
    z-index: 3;
  }
  
  &__content {
    width: 35px;
    aspect-ratio: 1;
    --_g: no-repeat radial-gradient(circle closest-side, #f6f2f2 90%,#0000);
    background:
        var(--_g) 0    0,
        var(--_g) 0    100%,
        var(--_g) 100% 100%;
    background-size: 40% 40%;
    animation:l11 1s infinite linear;
  }
  @keyframes l11 {
    25% {background-position:100% 0   ,0 100%,100% 100%}
    50% {background-position:100% 0   ,0 0   ,100% 100%}
    75% {background-position:100% 0   ,0 0   ,0    100%}
    100%{background-position:100% 100%,0 0   ,0    100%}
  }
}
</style>