<template>
  <section class="settings">
    <v-select 
        :options="coinPairs"
        :modelValue="coinStore.activePair"
        @option:selected="(selected: AvailablePairs) => coinStore.setActivePair(selected)"
        placeholder="Select pair..."
        class="coin-selector"
    >
      <template #option="option">
        <div class="coin-selector__option">        
          <img 
              :src="imageUrls[option.label].src" 
               class="coin-selector__img"
              rel="preload"
          />
          <span class="coin-selector__name">{{ option.label }}</span>
        </div>
      </template>
    </v-select>
    <table
        v-if="coinStore.hasLogs"
        class="table settings-table"
    >
      <thead>
      <tr>
        <th>ID</th>
        <th>From pair</th>
        <th>To pair</th>
        <th>Date</th>
      </tr>
      </thead>
      <tbody>
      <tr 
          v-for="(logRecord, index) in coinStore.getLogs" 
          :key="index"
      >
        <td>{{ (index + 1) }}</td>
        <td>{{ logRecord.from }}</td>
        <td>{{ logRecord.to }}</td>
        <td>{{ logRecord.date }}</td>
      </tr>    
      </tbody>
    </table>
  </section>
</template>

<script setup lang="ts">
import { AvailablePairs } from "@/types/coins.ts";
import { useCoinStore } from "@/stores/coinStore.ts";
import { onBeforeMount } from "vue";

const coinStore = useCoinStore();
const coinPairs: AvailablePairs[]  = ['BTCUSDT', 'BNBBTC', 'ETHBTC'];
const imageUrls: {[key:string]: HTMLImageElement} = {};

onBeforeMount(() => {  
  for (let coinPair of coinPairs) {
    const img = new Image();
    img.src = `${coinPair}.png`;
    imageUrls[coinPair] = img; 
  }
});
</script>

<style lang="scss" scoped>
.settings {
  height: 100%;
}

.settings-table {
  grid-template-columns: 
    minmax(150px, 1fr)
    minmax(150px, 1.67fr)
    minmax(150px, 1.67fr)
    minmax(150px, 1.67fr);
}

@media screen and (max-width: 700px) {
  .settings-table {
    grid-template-columns: 
      minmax(30px, 15%)
      minmax(70px, 20%)
      minmax(70px, 20%)
      minmax(70px, 45%);
  } 
}
</style>