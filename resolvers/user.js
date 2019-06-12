const { User, Group, Role } = require('../models')
const passwordHash = require('password-hash')

module.exports = {
    Query: {
        Users(obj, args, context) {
            if (!context.user) throw new Error('Invalid user')
            return User.findAll({
                include: [
                    {
                        model: Group,
                        as: 'Groups',
                        attributes: ['id', 'name'],
                    },
                ],
                attributes: ['id', 'names', 'lastnames', 'email'],
            }).then(data =>
               data.map(e => {
                    e.roles = e.Groups
                    return e
                }) 
            )
        },
        User(obj, args, context, info) {
            if (!context.user) throw new Error('Invalid user')
            const { id } = args
            return User.findOne({
                include: [
                    {
                        model: Group,
                        as: 'Groups',
                        attributes: ['id', 'name'],
                    },
                ],
                where: { id },
                attributes: ['id', 'names', 'lastnames', 'email'],
            }).then(e => {
                e.roles = e.Groups
                return e
            })
        },
    },

    Mutation: {
        async registerPublic(obj, args) {
            const { email } = args
            args.password = passwordHash.generate(args.password)
            const user = await User.findOne({ where: { email } })
            if (user) throw new Error('User already registered.')
            const userCreated = await User.create(args)
            Role.create({
                userId: userCreated.id,
                groupId: 2
            })
            return userCreated
        }
    },
}
