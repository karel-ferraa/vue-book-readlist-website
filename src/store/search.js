import { searchBooks } from '@/services/openLibrary'

export default {
  namespaced: true,

  state: () => ({
    query: '',
    results: [],
    loading: false,
    error: null,
  }),

  getters: {
    getResult: (state) => (id) => state.results.find((book) => book.id === id),
  },

  mutations: {
    SET_QUERY(state, query) {
      state.query = query
    },
    SET_RESULTS(state, results) {
      state.results = results
    },
    SET_LOADING(state, loading) {
      state.loading = loading
    },
    SET_ERROR(state, error) {
      state.error = error
    },
  },

  actions: {
    async search({ commit }, query) {
      commit('SET_QUERY', query.trim())
      commit('SET_RESULTS', [])
      commit('SET_ERROR', null)
      if (!query.trim()) return

      commit('SET_LOADING', true)
      try {
        commit('SET_RESULTS', await searchBooks(query.trim()))
      } catch (error) {
        commit('SET_ERROR', error.message)
      } finally {
        commit('SET_LOADING', false)
      }
    },
  },
}
