'use strict';
module.exports = (sequelize, DataTypes) => {
  const Route = sequelize.define('Route', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    accessPoint: DataTypes.STRING,
    hierarchy: DataTypes.INTEGER
  }, {paranoid: true});
  Route.associate = function(models) {
    // associations can be defined here
    Route.hasMany(models.Action, { as: 'Actions', foreignKey: 'routeId' })
  };
  return Route;
};