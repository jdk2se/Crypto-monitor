<template>
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
            :src="`${option.label}.png`" 
             class="coin-selector__img" 
        />
        <span class="select-name">{{ option.label }}</span>
      </div>
    </template>
  </v-select>
  <section class="changes-list">    
  </section>
</template>

<script setup lang="ts">
import { AvailablePairs } from "@/types/coins.ts";
import { useCoinStore } from "@/stores/coinStore.ts";

const coinStore = useCoinStore();
const coinPairs: AvailablePairs[]  = ['BTCUSDT', 'BNBBTC', 'ETHBTC'];
</script>