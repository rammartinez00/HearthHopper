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
    });
    SpotReview.belongsTo(models.Spot, {
      foreignKey: "spotId",
    });
  };
  return SpotReview;
};
