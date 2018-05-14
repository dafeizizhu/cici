const { createBundleRenderer } = require('vue-server-renderer')

module.exports = (app, template) => {
  let renderer
  let readyPromise

  const createRenderer = (bundle, options) => {
    return createBundleRenderer(bundle, Object.assign(options, {
      template,
      runInNewContext: false
    }))
  }

  if (process.env.NODE_ENV === 'dev') {
    readyPromise = require('../build/setup-dev-server')(app, (error, bundle, options) => {
      if (!error) {
        renderer = createRenderer(bundle, options)
      }
    })
  } else {
    const bundle = require('../dist/vue-ssr-server-bundle.json')
    const clientManifest = require('../dist/vue-ssr-client-manifest.json')
    renderer = createRenderer(bundle, { clientManifest })
  }

  return vueContext => {
    const render = () => {
      return new Promise((resolve, reject) => {
        renderer.renderToString(vueContext, (err, html) => {
          if (err) {
            console.warn(JSON.stringify(err))
            reject(err)
          } else {
            resolve(html)
          }
        })
      })
    }
    if (readyPromise) {
      return readyPromise.then(render)
    } else {
      return render()
    }
  }
}
