import { loadBooks } from '@/services/storage'

function findBook(state, id) {
  return state.books.find((book) => book.id === id)
}

export default {
  namespaced: true,

  state: () => ({
    books: [],
  }),

  getters: {
    favoriteBooks: (state) => state.books.filter((book) => book.favorite),
    getBook: (state) => (id) => findBook(state, id),
    isInLibrary: (state) => (id) => Boolean(findBook(state, id)),
  },

  mutations: {
    SET_BOOKS(state, books) {
      state.books = books
    },
    ADD_BOOK(state, book) {
      state.books.push(book)
    },
    REMOVE_BOOK(state, id) {
      state.books = state.books.filter((book) => book.id !== id)
    },
    TOGGLE_FAVORITE(state, id) {
      const book = findBook(state, id)
      book.favorite = !book.favorite
    },
    TOGGLE_READ(state, id) {
      const book = findBook(state, id)
      book.read = !book.read
    },
    SET_RATING(state, { id, rating }) {
      findBook(state, id).rating = rating
    },
  },

  actions: {
    loadLibrary({ commit }) {
      commit('SET_BOOKS', loadBooks())
    },
    addBook({ commit, getters }, book) {
      // Prevent duplicates
      if (getters.isInLibrary(book.id)) return
      commit('ADD_BOOK', { ...book, favorite: false, read: false, rating: 0 })
    },
    removeBook({ commit }, id) {
      commit('REMOVE_BOOK', id)
    },
    toggleFavorite({ commit }, id) {
      commit('TOGGLE_FAVORITE', id)
    },
    toggleRead({ commit }, id) {
      commit('TOGGLE_READ', id)
    },
    setRating({ commit }, { id, rating }) {
      commit('SET_RATING', { id, rating })
    },
  },
}
