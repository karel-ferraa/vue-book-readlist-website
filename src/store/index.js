import { createStore } from 'vuex'
import library from './library'
import search from './search'
import { saveBooks } from '@/services/storage'

const store = createStore({
  modules: {
    library,
    search,
  },
})

// Save the library to localStorage after every library change.
store.subscribe((mutation, state) => {
  if (mutation.type.startsWith('library/')) {
    saveBooks(state.library.books)
  }
})

export default store
