<script setup>
const rating = defineModel({ type: Number, default: 0 })
</script>

<template>
  <span class="star-rating">
    <button
      v-for="star in 5"
      :key="star"
      type="button"
      :class="{ filled: star <= rating }"
      :aria-label="`Rate ${star} out of 5`"
      @click="rating = star"
    >
      ★
    </button>
  </span>
</template>

<style scoped>
.star-rating button {
  padding: 0;
  border: none;
  background: none;
  font-family: sans-serif;
  font-size: 1.6rem;
  color: #bdbdbd;
  cursor: pointer;
}

.star-rating button.filled {
  color: var(--yellow);
}
</style>
