const jwt = require('jsonwebtoken')
const moment = require('moment')

const SECRET = process.env.SECRET

module.exports = {
  generateToken(userId) {
    // Generate a JWT with user id in payload
    const payload = {
      sub: userId,
      iat: moment().unix(),
      exp: moment()
        .add(process.env.SESSION_DAYS, 'days')
        .unix(),
    }
    return new Promise((resolve, reject) => {
      jwt.sign(payload, SECRET, (err, token) => {
        if (err) return reject(err)
        resolve(token)
      })
    })
  },
  decodeToken(token) {
    // Get user id from a JWRT
    return new Promise((resolve, reject) => {
      jwt.verify(token, SECRET, (err, decoded) => {
        if (err) return reject(new Error('Invalid token'))

        if (decoded.exp <= moment().unix())
          return reject(new Error('Expired token'))

        resolve(decoded.sub)
      })
    })
  },
}
