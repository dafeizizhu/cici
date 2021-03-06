import { createApp } from './app'

const { app, router, store } = createApp()

router.onReady(() => {
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
    let diffed = false
    const activated = matched.filter((c, i) => diffed || (diffed = (prevMatched[i] !== c)))
    if (!activated.length) return next()
    Promise.all(activated.map(c => {
      if (c.asyncData) return c.asyncData({ store, route: to, session: store.state.session })
    })).then(() => {
      next()
    }).catch(next)
  })
  app.$mount('#app')
})

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}
