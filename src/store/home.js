// Some api to get data, use webpack.config alias to discriminate server and client
const fetchItem = () => new Promise((resolve, reject) => {
  setTimeout(() => resolve({ foo: 'bar' }), 200)
})

export default {
  namespaced: true,
  state: {
    item: {}
  },
  actions: {
    test ({ commit }) {
      return fetchItem().then(item => commit('setItem', { item }))
    }
  },
  mutations: {
    setItem (state, { item }) {
      state.item = item
    }
  }
}
