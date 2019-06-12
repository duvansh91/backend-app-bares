'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    userId: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER
  }, {paranoid: true});
  Role.associate = function(models) {
    // associations can be defined here
  };
  return Role;
};