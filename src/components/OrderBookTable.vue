<template>
  <div>{{ title }}</div>
  <table class="table order-book__table">
    <thead>
    <tr>
      <th>Price</th>
      <th class="order-book__table_desktop">Quantity</th>
      <th>Total</th>
    </tr>
    </thead>
    <tbody>
    <tr
        v-for="(item, index) in data"
        :key="index"
    >
      <td>{{ item.price }}</td>
      <td class="order-book__table_desktop">{{ item.qty }}</td>
      <td>{{ Math.round(item.price * item.qty) }}</td>
    </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { IOrderBookItem } from "@/types/IOrderBookItem.ts";

defineProps<{
  title: string,
  data: IOrderBookItem[],
}>();
</script>

<style scoped lang="scss">
.order-book {
  &__table {
    grid-template-columns: 
    minmax(150px, 1fr)
    minmax(150px, 1.67fr)
    minmax(150px, 1.67fr);    
  }
}

@media screen and (max-width: 600px) {
  .order-book {
    &__table {
      grid-template-columns: 
      minmax(50%, 50%)
      minmax(50%, 50%);
      
      th {
        padding: 0;
      }

      &_desktop {
        display: none;
      }
    }
  }
}
</style>