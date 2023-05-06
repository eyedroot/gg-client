const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      fallback: {
        "path": require.resolve("path-browserify")
      }
    }
  },
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: '@import "@/assets/style/tailwind.css";',
        implementation: require('node-sass'),
      }
    }
  }
})
