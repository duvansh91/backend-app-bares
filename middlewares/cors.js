const cors = require('../helpers/cors')

module.exports = (req, res, next) => {
  const appid = req.headers.application
  const origin = req.headers.origin
  const token = req.headers.token

  cors
    .getOptions(appid, origin, token)
    .then(opts => {
      if (opts === true) {      
        return next()
      } else {
        res.header('Access-Control-Allow-Origin', opts.origin)
        res.header(
          'Access-Control-Allow-Headers',
          'Origin, X-Requested-With, Content-Type, Accept, Authorization, Application'
        )
        return next()
      }
    })
    .catch(err => {
      res.status(401).json({
        data: {
          error: err.message,
        },
      })
    })
}
