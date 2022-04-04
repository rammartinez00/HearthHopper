"use strict";
module.exports = (sequelize, DataTypes) => {
  const SpotBooking = sequelize.define(
    "SpotBooking",
    {
      userId: DataTypes.INTEGER,
      spotId: DataTypes.INTEGER,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      totalPrice: DataTypes.INTEGER,
    },
    {}
  );
  SpotBooking.associate = function (models) {
    SpotBooking.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });

    SpotBooking.belongsTo(models.Spot, {
      foreignKey: "spotId",
      onDelete: "CASCADE",
    });
  };
  return SpotBooking;
};
