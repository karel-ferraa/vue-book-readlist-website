<script setup>
// "all", "read" or "unread"
const filter = defineModel({ type: String, default: 'all' })

const options = [
  { value: 'all', label: 'All' },
  { value: 'read', label: 'Read' },
  { value: 'unread', label: 'Not read' },
]
</script>

<template>
  <div class="read-filter" role="group" aria-label="Filter by read status">
    <button
      v-for="option in options"
      :key="option.value"
      type="button"
      class="read-filter__button"
      :class="{ active: filter === option.value }"
      :aria-pressed="filter === option.value"
      @click="filter = option.value"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<style scoped>
.read-filter {
  display: flex;
  justify-content: center;
  gap: 0.6rem;
  margin-bottom: 1.2rem;
}

.read-filter__button {
  min-width: 5rem;
  padding: 0 0.6rem;
  border: none;
  border-radius: 6px;
  background: var(--blue);
  color: white;
  cursor: pointer;
}

/* Same colors as the nav bar: the selected filter is green */
.read-filter__button.active {
  background: var(--green);
}
</style>
