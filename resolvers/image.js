const { Image, Bar } = require('../models')

module.exports = {
  Query: {
 
  },

  Mutation: {
    async addImage(obj, args) {
      const { barId, urlImage } = args
      const image = await Image.findOne({
        where: { urlImage },
        attributes: ['id', 'barId', 'urlImage'],
      })
      if (image) throw new Error('image already created.')
      const imageCreated = await Image.create(args)
      return imageCreated
    }
  },
}
