<template>
  <header>
    <router-link
        class="nav__item_logo"
        to="/"
    >
      <img class="header__logo" src="@/assets/images/shiba.png" alt="logo" />
    </router-link>
    
    <nav>
      <router-link
          class="nav__item"
          to="/settings"
      >
        Settings
      </router-link>
      <router-link
          class="nav__item"
          to="/order-book"
      >
        Order Book
      </router-link>
    </nav>
  </header>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
header {
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  padding: 0 20px 0 0;
  z-index: 1;
  background: #181A20;
  
  .header__logo {
    width: 80px;
    display: block;
  }
}
</style>