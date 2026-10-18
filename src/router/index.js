import { createRouter, createWebHistory } from 'vue-router'
import LibraryView from '@/views/LibraryView.vue'
import FavoritesView from '@/views/FavoritesView.vue'
import ExploreView from '@/views/ExploreView.vue'
import BookDetailsView from '@/views/BookDetailsView.vue'

// Each page has a "book/:id" child route that opens the book in a panel
// next to the grid ("Open Book View" in our Figma prototype).
const routes = [
  { path: '/', redirect: '/library' },
  {
    path: '/library',
    name: 'library',
    component: LibraryView,
    children: [{ path: 'book/:id', name: 'library-book', component: BookDetailsView, props: true }],
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: FavoritesView,
    children: [{ path: 'book/:id', name: 'favorites-book', component: BookDetailsView, props: true }],
  },
  {
    path: '/explore',
    name: 'explore',
    component: ExploreView,
    children: [{ path: 'book/:id', name: 'explore-book', component: BookDetailsView, props: true }],
  },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
