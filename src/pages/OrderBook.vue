<template>
  <h3>Active pair: {{ coinStore.activePair }}</h3>
  <div 
      v-if="coinStore.hasOrderBook"
      class="order-book" 
  >    
    <div class="order-book__container">
      <OrderBookTable 
          :title="ask" 
          :data="askItems" 
          @change-limit="changeLimit"
      />
    </div>
    <div class="order-book__container">
      <OrderBookTable 
          :title="bid" 
          :data="bidItems"
          @change-limit="changeLimit"
      />
    </div>
  </div>
  <div v-else>
    <router-link to="/settings">Select</router-link> coin pair.
  </div>
</template>

<script setup lang="ts">
import { useCoinStore } from "@/stores/coinStore.ts";
import OrderBookTable from "@/components/OrderBookTable.vue";
import { ref } from "vue";

const coinStore = useCoinStore();
const ask = 'Ask';
const bid = 'Bid';
const askItems = ref(coinStore.getAskItems());
const bidItems = ref(coinStore.getBidItems());

const changeLimit = (title: string, limit: number) => {
  if (title === ask) {
    askItems.value = coinStore.getAskItems(limit);
  }
  
  if (title === bid) {
    bidItems.value = coinStore.getBidItems(limit);  
  }  
}
</script>

<style scoped lang="scss">
.order-book {
  display: flex;
  justify-content: space-between;  
  height: calc(100vh - 125px);
  overflow: scroll;
  
  &__container {
    width: 48%;
    overflow: hidden;
    overflow-y: auto;
  }
}
</style>