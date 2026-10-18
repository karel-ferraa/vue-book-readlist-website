<script setup>
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { getBookDetails } from '@/services/openLibrary'
import StarRating from '@/components/StarRating.vue'

const props = defineProps({
  id: { type: String, required: true },
})

const store = useStore()
const route = useRoute()
const router = useRouter()

// The book comes from the library, or from the search results on Explore
const libraryBook = computed(() => store.getters['library/getBook'](props.id))
const book = computed(() => libraryBook.value ?? store.getters['search/getResult'](props.id))

// Extra information (description, exact date) loaded from the API
const details = ref(null)
const loading = ref(false)
const error = ref(null)

async function loadDetails() {
  const id = props.id
  details.value = null
  error.value = null
  loading.value = true
  try {
    const result = await getBookDetails(id)
    if (id === props.id) details.value = result
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

// Reload when another book is opened
watch(() => props.id, loadDetails, { immediate: true })

const title = computed(() => book.value?.title ?? details.value?.title)
const authors = computed(() => book.value?.authors.join(', ') || 'Unknown')
const publishDate = computed(() => details.value?.publishDate ?? book.value?.year ?? 'Unknown')

const rating = computed({
  get: () => libraryBook.value.rating,
  set: (value) => store.dispatch('library/setRating', { id: props.id, rating: value }),
})

// Go back to the page this panel was opened from (library, favorites or explore)
function close() {
  router.push({ name: route.matched[0].name })
}

function remove() {
  if (!confirm(`Remove “${title.value}” from your library?`)) return
  store.dispatch('library/removeBook', props.id)
  if (route.matched[0].name !== 'explore') close()
}
</script>

<template>
  <aside class="details">
    <button class="details__close" aria-label="Close" @click="close">✕</button>

    <div class="details__info">
      <h1>Title: {{ title }}</h1>
      <p>Authors: {{ authors }}</p>
      <p>Publication Date: {{ publishDate }}</p>
      <p v-if="libraryBook">Rating: <StarRating v-model="rating" /></p>
    </div>

    <p v-if="loading" class="details__description">Loading description…</p>
    <p v-else-if="error" class="details__description message--error">{{ error }}</p>
    <p v-else class="details__description">{{ details?.description || 'No description available.' }}</p>

    <div v-if="libraryBook" class="details__actions">
      <button class="details__favorite" @click="store.dispatch('library/toggleFavorite', id)">
        {{ libraryBook.favorite ? '❤️ Remove from favorites' : '🤍 Add to favorites' }}
      </button>
      <button class="button" :class="{ 'button--green': libraryBook.read }" @click="store.dispatch('library/toggleRead', id)">
        {{ libraryBook.read ? '✓ Read' : 'Mark as read' }}
      </button>
      <button class="button button--red" @click="remove">Remove from library</button>
    </div>

    <div v-else-if="book" class="details__actions">
      <button class="button button--green" @click="store.dispatch('library/addBook', book)">+ Add to my library</button>
    </div>
  </aside>
</template>

<style scoped>
.details {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem 2rem 2rem;
  overflow-y: auto;
  background: var(--grey);
  border-left: 2px solid var(--grey-dark);
  text-align: center;
}

.details__close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  border: none;
  background: none;
  font-family: sans-serif;
  font-size: 1.1rem;
  cursor: pointer;
}

.details__info {
  font-size: 1.7rem;
  line-height: 1.2;
}

.details__info h1 {
  font-size: inherit;
  font-weight: normal;
}

.details__description {
  white-space: pre-line;
}

.details__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.details__favorite {
  border: none;
  background: none;
  font-size: 1.15rem;
  cursor: pointer;
}

@media (max-width: 700px) {
  .details {
    padding: 1rem;
    border-left: none;
  }
}
</style>
