"use strict";
module.exports = (sequelize, DataTypes) => {
  const SpotFav = sequelize.define(
    "SpotFav",
    {
      spotId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {}
  );
  SpotFav.associate = function (models) {
    SpotFav.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });

    SpotFav.belongsTo(models.Spot, {
      foreignKey: "spotId",
      onDelete: "CASCADE",
    });
  };
  return SpotFav;
};
