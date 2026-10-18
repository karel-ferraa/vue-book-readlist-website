<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import SearchBar from '@/components/SearchBar.vue'
import BookGrid from '@/components/BookGrid.vue'

const store = useStore()
const route = useRoute()
const router = useRouter()

const search = computed(() => store.state.search)
// Start with the last search so results are kept when coming back to this page
const query = ref(search.value.query)

function onSearch(text) {
  store.dispatch('search/search', text)
  // Close the open book when starting a new search
  router.push({ name: 'explore' })
}
</script>

<template>
  <div class="view">
    <SearchBar v-model="query" placeholder="Search Open Library (press Enter)" @search="onSearch" />

    <div class="page" :class="{ split: route.params.id }">
      <section class="page__list">
        <p v-if="search.loading" class="message">Searching…</p>
        <p v-else-if="search.error" class="message message--error">{{ search.error }}</p>
        <p v-else-if="!search.query" class="message">Search for a book by title or author.</p>
        <p v-else-if="!search.results.length" class="message">No results found for “{{ search.query }}”.</p>
        <BookGrid v-else :books="search.results" details-route="explore-book" />
      </section>

      <RouterView />
    </div>
  </div>
</template>
