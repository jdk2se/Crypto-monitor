<template>
  <h3>Active pair: {{ coinStore.activePair }}</h3>
  <div 
      v-if="coinStore.hasOrderBook"
      class="order-book" 
  >    
    <div class="order-book__container">
      <OrderBookTable 
          :title="ASK" 
          :data="coinStore.getAskItems" 
          @change-limit="changeLimit"
      />
    </div>
    <div class="order-book__container">
      <OrderBookTable 
          :title="BID" 
          :data="coinStore.getBidItems"
          @change-limit="changeLimit"
      />
    </div>
  </div>
  <div v-else>
    <router-link to="/settings" class="nav__item">Select</router-link> coin pair.
  </div>
</template>

<script setup lang="ts">
import { useCoinStore } from "@/stores/coinStore.ts";
import OrderBookTable from "@/components/OrderBookTable.vue";

const coinStore = useCoinStore();
const ASK = 'Ask';
const BID = 'Bid';

const changeLimit = (title: string, limit: number) => {
  if (title === ASK) {
    coinStore.setAskLimit(limit);
  }

  if (title === BID) {
    coinStore.setBidLimit(limit);
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