'use strict';
module.exports = (sequelize, DataTypes) => {
  const bar_user = sequelize.define('bar_user', {
    userId: DataTypes.INTEGER,
    barId: DataTypes.INTEGER
  }, {});
  bar_user.associate = function(models) {
    // associations can be defined here
  };
  return bar_user;
};