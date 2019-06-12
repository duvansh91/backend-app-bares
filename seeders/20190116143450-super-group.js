'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Groups', [{
        name: 'Super',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Public',
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Groups', null, {});
  }
};
