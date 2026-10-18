<script setup>
defineProps({
  placeholder: { type: String, default: 'Search' },
})

const emit = defineEmits(['search'])
const query = defineModel({ type: String, default: '' })
</script>

<template>
  <header class="search-header">
    <form class="search-bar" role="search" @submit.prevent="emit('search', query)">
      <svg class="search-bar__icon" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="10.5" cy="10.5" r="7" />
        <line x1="15.5" y1="15.5" x2="21" y2="21" />
      </svg>
      <input v-model="query" type="search" :placeholder="placeholder" :aria-label="placeholder" />
    </form>
  </header>
</template>

<style scoped>
.search-header {
  display: flex;
  justify-content: center;
  padding: 0.6rem 1rem;
  background: var(--grey);
  border-bottom: 2px solid var(--grey-dark);
}

.search-bar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: min(100%, 34rem);
  padding: 0.1rem 1rem 0.1rem 0.6rem;
  border-radius: 999px;
  background: var(--search-grey);
}

.search-bar__icon {
  width: 1.1rem;
  height: 1.1rem;
  fill: none;
  stroke: black;
  stroke-width: 1.8;
}

.search-bar input {
  flex: 1;
  min-width: 0;
  border: none;
  background: transparent;
  color: white;
  text-align: center;
  outline: none;
}

.search-bar input::placeholder {
  color: rgb(255 255 255 / 0.75);
}
</style>
