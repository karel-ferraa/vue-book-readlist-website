<script setup>
import { ref } from 'vue'
import { getCoverUrl } from '@/services/openLibrary'

defineProps({
  book: { type: Object, required: true },
  to: { type: Object, required: true },
  selected: { type: Boolean, default: false },
})

const coverLoaded = ref(false)
</script>

<template>
  <RouterLink :to="to" class="book-card" :class="{ selected }">
    <!-- Text version of the card, shown until the cover image has loaded -->
    <div v-if="!coverLoaded" class="book-card__info">
      <div>
        <p class="book-card__title">{{ book.title }}</p>
        <p>By: {{ book.authors.join(', ') || 'Unknown' }}</p>
      </div>
      <div v-if="book.category || book.year" class="book-card__meta">
        <p v-if="book.category">Category: {{ book.category }}</p>
        <p v-if="book.year">Published: {{ book.year }}</p>
      </div>
    </div>

    <img
      v-if="book.coverId"
      v-show="coverLoaded"
      :src="getCoverUrl(book.coverId)"
      :alt="book.title"
      @load="coverLoaded = true"
    />

    <span class="book-card__badges">
      <span v-if="book.favorite" class="badge-favorite" title="Favorite">♥</span>
      <span v-if="book.read" class="badge-read" title="Read">✓</span>
    </span>
  </RouterLink>
</template>

<style scoped>
.book-card {
  position: relative;
  display: block;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  background: var(--grey);
  color: inherit;
  text-decoration: none;
}

.book-card:hover {
  box-shadow: 0 4px 10px rgb(0 0 0 / 0.25);
}

.book-card.selected {
  outline: 4px solid var(--green);
  outline-offset: 3px;
}

.book-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.book-card__info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 0.4rem;
  font-size: 0.95rem;
  text-align: center;
}

.book-card__title {
  font-size: 1.1rem;
}

.book-card__meta {
  padding-top: 0.3rem;
  border-top: 1px solid var(--grey-dark);
}

.book-card__badges {
  position: absolute;
  top: 0.3rem;
  right: 0.3rem;
  display: flex;
  gap: 0.2rem;
}

.book-card__badges span {
  padding: 0 0.3rem;
  border-radius: 999px;
  background: white;
}

.badge-favorite {
  color: var(--red);
}

.badge-read {
  color: var(--green);
}
</style>
