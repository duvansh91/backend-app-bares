const fs = require('fs')
const path = require('path')
const { merge } = require('lodash')

const basename = path.basename(__filename)
let _resolvers = []
fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    )
  })
  .forEach(file => {
    let _file = file.split('.')
    _file.pop()
    _file = './' + _file.join()
    _resolvers.push(require(_file))
  })

const resolvers = merge(..._resolvers)

module.exports = resolvers