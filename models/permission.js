'use strict';
module.exports = (sequelize, DataTypes) => {
  const Permission = sequelize.define('Permission', {
    groupId: DataTypes.INTEGER,
    actionId: DataTypes.INTEGER
  }, {paranoid: true});
  Permission.associate = function(models) {
    // associations can be defined here
  };
  return Permission;
};