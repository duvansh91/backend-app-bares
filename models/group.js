'use strict';
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    name: DataTypes.STRING
  }, {paranoid: true});
  Group.associate = function(models) {
    // associations can be defined here
    Group.belongsToMany(models.User, { as: 'Users', through: 'Role', foreignKey: 'groupId' })
    Group.belongsToMany(models.Action, { as: 'Actions', through: 'Permission', foreignKey: 'groupId' })
  };
  return Group;
};