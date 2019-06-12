'use strict';
module.exports = (sequelize, DataTypes) => {
  const Action = sequelize.define('Action', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    routeId: DataTypes.INTEGER
  }, {paranoid: true});
  Action.associate = function(models) {
    // associations can be defined here
    Action.belongsToMany(models.Group, { as: 'Groups', through: 'Permission', foreignKey: 'actionId' })
    Action.belongsTo(models.Route)
  };
  return Action;
};