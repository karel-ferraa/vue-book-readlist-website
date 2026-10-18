<script setup>
import NavBar from '@/components/NavBar.vue'
</script>

<template>
  <div class="app">
    <main class="app__main">
      <RouterView />
    </main>
    <NavBar />
  </div>
</template>

<style scoped>
.app {
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto;
  grid-template-columns: minmax(0, 1fr);
  height: 100dvh;
}
</style>
