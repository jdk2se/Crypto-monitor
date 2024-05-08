<template>
  <h3>Active pair: {{ coinStore.activePair }}</h3>
  <div 
      v-if="orderBookStore.hasOrderBook"
      class="order-book" 
  >    
    <div class="order-book__container">
      <OrderBookTable 
          :title="ASK" 
          :data="orderBookStore.getAskItems" 
          @change-limit="changeLimit"
      />
    </div>
    <div class="order-book__container">
      <OrderBookTable 
          :title="BID" 
          :data="orderBookStore.getBidItems"
          @change-limit="changeLimit"
      />
    </div>
  </div>
  <div v-else>
    <router-link to="/settings" class="nav__item">Select</router-link> coin pair.
  </div>
</template>

<script setup lang="ts">
import OrderBookTable from "@/components/OrderBookTable.vue";
import { useOrderBookStore } from "@/stores/orderBookStore.ts";
import { useCoinStore } from "@/stores/coinStore.ts";

const orderBookStore = useOrderBookStore();
const coinStore = useCoinStore();
const ASK = 'Ask';
const BID = 'Bid';

const changeLimit = (title: string, limit: number) => {
  if (title === ASK) {
    orderBookStore.setAskLimit(limit);
  }

  if (title === BID) {
    orderBookStore.setBidLimit(limit);
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