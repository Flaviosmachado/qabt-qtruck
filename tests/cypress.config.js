const { defineConfig } = require("cypress");
const { cypressBrowserPermissionsPlugin } = require ('cypress-browser-permissions')
const mongo = require('cypress-mongodb')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
       mongo.configurePlugin(on)
       config = cypressBrowserPermissionsPlugin(on, config)
       return config
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:3000',
    ViewportWidth: 1920,
    viewportHeight: 1080,
    env: {
      browserPermissions: {
        geolocation: 'allow',
        Notification: 'allow'
      },
      mongodb: {
        'uri': 'mongodb+srv://qa:cademy@cluster0.jvusi75.mongodb.net/QtruckDB?retryWrites=true&w=majority',
        "database": 'QtruckDB'
      }
    }
  },
});
