'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    commentBody: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    showId: DataTypes.INTEGER
  }, {});
  Comment.associate = function(models) {
    Comment.belongsTo(models.User)
  };
  return Comment;
};