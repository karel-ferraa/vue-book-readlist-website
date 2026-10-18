<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import SearchBar from '@/components/SearchBar.vue'
import BookGrid from '@/components/BookGrid.vue'

const store = useStore()
const route = useRoute()
const query = ref('')

const allBooks = computed(() => store.state.library.books)

// The search bar filters the library by title or author
const books = computed(() => {
  const text = query.value.trim().toLowerCase()
  return allBooks.value.filter((book) =>
    [book.title, ...book.authors].join(' ').toLowerCase().includes(text),
  )
})
</script>

<template>
  <div class="view">
    <SearchBar v-model="query" placeholder="Search your library" />

    <div class="page" :class="{ split: route.params.id }">
      <section class="page__list">
        <div v-if="!allBooks.length" class="message">
          <p>Your library is empty.</p>
          <RouterLink to="/explore" class="button button--green">Find books on Explore</RouterLink>
        </div>
        <p v-else-if="!books.length" class="message">No book matches “{{ query }}”.</p>
        <BookGrid v-else :books="books" details-route="library-book" />
      </section>

      <RouterView />
    </div>
  </div>
</template>
