'use strict';
module.exports = (sequelize, DataTypes) => {
  const App = sequelize.define('App', {
    name: DataTypes.STRING,
    appid: DataTypes.STRING,
    token: DataTypes.STRING,
    origin: DataTypes.STRING
  }, {paranoid: true});
  App.associate = function(models) {
    // associations can be defined here
  };
  return App;
};