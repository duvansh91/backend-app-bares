'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Apps',
      [
        {
          id: 1,
          name: 'Default',
          appid: '123',
          origin: 'http://localhost:4000',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Apps', null, {})
  },
}
