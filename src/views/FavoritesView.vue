<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import SearchBar from '@/components/SearchBar.vue'
import BookGrid from '@/components/BookGrid.vue'

const store = useStore()
const route = useRoute()
const query = ref('')

const favorites = computed(() => store.getters['library/favoriteBooks'])

const books = computed(() => {
  const text = query.value.trim().toLowerCase()
  return favorites.value.filter((book) =>
    [book.title, ...book.authors].join(' ').toLowerCase().includes(text),
  )
})
</script>

<template>
  <div class="view">
    <SearchBar v-model="query" placeholder="Search your favorites" />

    <div class="page" :class="{ split: route.params.id }">
      <section class="page__list">
        <p v-if="!favorites.length" class="message">
          No favorites yet. Open a book from your library and click “Add to favorites”.
        </p>
        <p v-else-if="!books.length" class="message">No favorite matches “{{ query }}”.</p>
        <BookGrid v-else :books="books" details-route="favorites-book" />
      </section>

      <RouterView />
    </div>
  </div>
</template>
