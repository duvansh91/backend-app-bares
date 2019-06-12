require('dotenv').config()
const { ApolloServer, gql } = require('apollo-server-express')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('./middlewares/cors')
//const cors2 = require('cors')
const jwt = require('./helpers/jwt')
const { User } = require('./models')
const typeDefs = require('./schemas')
const resolvers = require('./resolvers')

const app = express() // Express instance
const apollo = new ApolloServer({ 
  typeDefs, 
  resolvers,
  async context({ req }) {   
    let token = req.headers.authorization || ''
    token = token.split(' ')
    if (token[0] === 'Bearer') {
      let userId = await jwt.decodeToken(token[1])
      let user = await User.findById(userId)
      return { user }
    }
    return null
  },
});

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.post('*', cors)
//app.use(cors2())
apollo.applyMiddleware({ app })

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
app.listen(process.env.PORT, () =>
  console.log(`🚀  Server ready at ${"http://"+process.env.DB_D_HOSTNAME+":"+process.env.PORT+"/graphql"}`)
)

/*apollo.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
})*/
