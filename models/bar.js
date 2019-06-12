'use strict';
module.exports = (sequelize, DataTypes) => {
  const Bar = sequelize.define('Bar', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    address: DataTypes.STRING,
    urlImage: DataTypes.STRING
  }, {paranoid: true});
  Bar.associate = function(models) {
    Bar.belongsToMany(models.User, { as: 'Users', through: 'bar_user', foreignKey: 'barId' })
    Bar.hasMany(models.Image, {as: 'Images', foreignKey: 'barId'})
  };
  return Bar;
};