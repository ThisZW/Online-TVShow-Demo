'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.hasOne(models.Show)
    User.hasOne(models.Comment)
  };
  return User;
};