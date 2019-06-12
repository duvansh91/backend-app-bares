const { App } = require('../models')

module.exports = {
  getOptions(appid, origin, token) {
    return new Promise((resolve, reject) => {
      App.findOne({
        attributes: ['origin'],
        where: { appid },
      })
        .then(app => {
          if (!app) return reject(new Error('Invalid appid'))
          if (app.origin !== '') {
            let origins = app.origin.split(',')
            if (origins.indexOf(origin) !== -1) {
              return resolve({ origin })
            } else {
              return reject(new Error('Invalid origin'))
            }
          } else if (app.token !== '') {
            if (token === app.token) {
              resolve(true)
            } else {
              return reject(new Error('Invalid token'))
            }
          }
        })
        .catch(reject)
    })
  },
}
