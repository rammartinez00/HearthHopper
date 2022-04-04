"use strict";
module.exports = (sequelize, DataTypes) => {
  const SpotReview = sequelize.define(
    "SpotReview",
    {
      userId: DataTypes.INTEGER,
      spotId: DataTypes.INTEGER,
      rating: DataTypes.INTEGER,
      comment: DataTypes.TEXT,
    },
    {}
  );
  SpotReview.associate = function (models) {
    SpotReview.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });
    SpotReview.belongsTo(models.Spot, {
      foreignKey: "spotId",
      onDelete: "CASCADE",
    });
  };
  return SpotReview;
};
