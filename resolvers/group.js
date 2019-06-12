const { Group, User, Action, Route } = require('../models')

module.exports = {
  Query: {
    Groups(obj, args, context) {
      if (!context.user) throw new Error('Invalid user')

      return Group.findAll({
        attributes: ['id', 'name'],
        include: [
          {
            model: User,
            as: 'Users',
            attributes: [
              'id',
              'names',
              'lastnames',
              'username',
              'gender',
              'email'
            ],
            include: [
              {
                model: Group,
                as: 'Groups',
                attributes: ['id', 'name'],
              },
            ],
          },
          {
            model: Action,
            as: 'Actions',
            attributes: ['id', 'name', 'description'],
            include: [
              {
                model: Route,
                attributes: ['id', 'name', 'description', 'accessPoint'],
              },
            ],
          }
        ],
      }).then(groups =>
        groups.map(group => {
          group.users = group.Users
          group.permissions = group.Actions
          group.users = group.users.map(e => {
            e.roles = e.Groups
            return e
          })
          return group
        })
      )
    },
  },

  Mutation:{
    addGroup(obj, args){
      const { name } = args
      return Group.create({
        name
    })
    }
  }
}