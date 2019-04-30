'use strict';
module.exports = (sequelize, DataTypes) => {
  const Show = sequelize.define('Show', {
    title: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    genreId: DataTypes.INTEGER
  }, {});
  Show.associate = function(models) {
    Show.belongsTo(models.Genre)
    Show.belongsTo(models.User)
  };
  return Show;
};