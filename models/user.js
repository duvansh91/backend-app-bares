'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    names: DataTypes.STRING,
    lastnames: DataTypes.STRING,
    email: { type: DataTypes.STRING, validate: { isEmail: true } },
    password: DataTypes.STRING,
    facebookId: DataTypes.STRING,
    googleId: DataTypes.STRING
  }, {paranoid: true});
  User.associate = function (models) {
    // associations can be defined here
    User.belongsToMany(models.Group, { as: 'Groups', through: 'Role', foreignKey: 'userId' });
    User.belongsToMany(models.Bar, { as: 'Bars', through: 'bar_user', foreignKey: 'userId' });
  };
  return User;
};