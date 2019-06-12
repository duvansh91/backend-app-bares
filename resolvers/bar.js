const { User, Group, Role, Bar, Image, bar_user } = require('../models')


module.exports = {
  Query: {

    Bars(obj, args, context) {
      if (!context.user) throw new Error('Invalid user')
      return Bar.findAll({
        include: [
          {
            model: User,
            as: 'Users',
            attributes: ['id', 'names'],
          },
        ],
        attributes: ['id', 'name', 'address', 'description', 'urlImage'],
      }).then(data =>
        data.map(e => {
          e.owner = e.Users
          return e
        })
      )
    },

    BarsByName(obj, args, context) {
      if (!context.user) throw new Error('Invalid user')
      return Bar.findAll({
        where: { name: args.name },
        include: [
          {
            model: User,
            as: 'Users',
            attributes: ['id', 'names'],
          },
        ],
        attributes: ['id', 'name', 'description'],
      }).then(data =>
        data.map(e => {
          e.owner = e.Users
          return e
        })
      )
    }

  },

  Mutation: {

    async addBar(obj, args) {
      const { name, description, address, userId, urlImage } = args
      const bar = await Bar.findOne({ where: { name } })
      const user = await User.findOne({ where: { id: userId } })
      if (bar) throw new Error('Bar already created.')
      if (!user) throw new Error('User not exist')
      const barCreated = await Bar.create({
        name,
        description,
        address,
        urlImage
      })
      bar_user.create({
        barId: barCreated.id,
        userId: userId
      })
      return barCreated
    }
  },
}
