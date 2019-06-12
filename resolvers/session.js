require('dotenv').config()
const passwordHash = require('password-hash')
const jwt = require('../helpers/jwt')
const { User, Role } = require('../models')
const { OAuth2Client } = require('google-auth-library')

module.exports = {
  Mutation: {
    login(obj, args, context, info) {
      const { email, password } = args
      return User.findOne({
        where: { email },
      })
        .then(async user => {
          if (!user) throw new Error('Invalid user') 

          let vaidationPassw = passwordHash.isHashed(user.password)
          if(vaidationPassw){
            let match = await passwordHash.verify(password, user.password)
            if (match) {
              const token = await jwt.generateToken(user.id)
              return { token }
            } else {
              throw new Error('Invalid password')
            }
          }else{
            throw new Error('Invalid password')
          }
        })
        .catch(err => {
          throw err
        })
    },
      async loginGoogle(obj, args) {
        const { tokenG } = args
        const client = new OAuth2Client(process.env.CLIENT_ID)       

        const ticket = await client.verifyIdToken({
          idToken: tokenG,
          audience: process.env.CLIENT_ID
        })
       
        const payload = ticket.getPayload();
        if (!payload) throw new Error('Invalid user')              
        const user = await User.findOne({
          where: { email: payload.email },
          attributes: ['id', 'names', 'lastnames', 'identification', 'gender', 'username', 'password', 'email'],
        })

        if (user) {
          const token = await jwt.generateToken(user.id)
          return { token }
        }else{
          let username = payload.email.replace(/@.*$/,"");
          const userCreated = await User.create({
            names: payload.given_name,
            lastnames: payload.family_name,
            identification: payload.iat,
            username,
            email: payload.email,
            password: 1,
            googleId: payload.sub
          })
          await Role.create({
            userId: userCreated.id,
            groupId: 2
          })
          const token = await jwt.generateToken(userCreated.id)
          return { token }
        }             
    }
  },
}