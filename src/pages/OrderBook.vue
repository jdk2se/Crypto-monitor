<template>
  <h3>Active pair: {{ coinStore.activePair }}</h3>
  <div 
      v-if="coinStore.hasOrderBook"
      class="order-book" 
  >    
    <div class="order-book__container">
      <OrderBookTable title="Ask" :data="coinStore.askItems" />
    </div>
    <div class="order-book__container">
      <OrderBookTable title="Bid" :data="coinStore.bidItems" />
    </div>
  </div>
  <div v-else>
    <router-link to="/settings">Select</router-link> coin pair.
  </div>
</template>

<script setup lang="ts">
import { useCoinStore } from "@/stores/coinStore.ts";
import OrderBookTable from "@/components/OrderBookTable.vue";

const coinStore = useCoinStore();
</script>

<style scoped lang="scss">
.order-book {
  display: flex;
  justify-content: space-between;  
  height: calc(100vh - 120px);
  overflow: scroll;
  
  &__container {
    width: 48%;
    overflow: hidden;
    overflow-y: auto;
  }
}
</style>