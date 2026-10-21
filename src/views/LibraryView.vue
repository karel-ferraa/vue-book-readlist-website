<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import SearchBar from '@/components/SearchBar.vue'
import ReadFilter from '@/components/ReadFilter.vue'
import BookGrid from '@/components/BookGrid.vue'

const store = useStore()
const route = useRoute()
const query = ref('')
const filter = ref('all')

const allBooks = computed(() => store.state.library.books)

// The search bar filters the library by title or author,
// the filter buttons by read / not read
const books = computed(() => {
  const text = query.value.trim().toLowerCase()
  return allBooks.value.filter(
    (book) =>
      [book.title, ...book.authors].join(' ').toLowerCase().includes(text) &&
      (filter.value === 'all' || book.read === (filter.value === 'read')),
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
        <template v-else>
          <ReadFilter v-model="filter" />
          <p v-if="!books.length && query" class="message">No book matches “{{ query }}”.</p>
          <p v-else-if="!books.length" class="message">
            {{ filter === 'read' ? 'You haven’t read any book yet.' : 'You’ve read all your books!' }}
          </p>
          <BookGrid v-else :books="books" details-route="library-book" />
        </template>
      </section>

      <RouterView />
    </div>
  </div>
</template>
