<script setup>
import { useRoute } from 'vue-router'
import BookCard from './BookCard.vue'

defineProps({
  books: { type: Array, required: true },
  // Name of the route that opens a book, e.g. "library-book"
  detailsRoute: { type: String, required: true },
})

const route = useRoute()
</script>

<template>
  <div class="book-grid">
    <BookCard
      v-for="book in books"
      :key="book.id"
      :book="book"
      :to="{ name: detailsRoute, params: { id: book.id } }"
      :selected="route.params.id === book.id"
    />
  </div>
</template>

<style scoped>
.book-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
  gap: 1.5rem 3rem;
}

@media (max-width: 600px) {
  .book-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
  }
}
</style>
