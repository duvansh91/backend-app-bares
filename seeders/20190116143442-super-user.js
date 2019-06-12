'use strict';
const passwordHash = require('password-hash');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      names: 'Super',
      lastnames: 'user',
      identification: '123456',
      gender: 'M',
      username: 'super',
      email: 'super@gmail.com',
      password: passwordHash.generate('12345678'),
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
