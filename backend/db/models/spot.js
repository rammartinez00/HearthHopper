"use strict";
module.exports = (sequelize, DataTypes) => {
  const Spot = sequelize.define(
    "Spot",
    {
      name: DataTypes.STRING,
      location: DataTypes.STRING,
      price: DataTypes.INTEGER,
      rating: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      userId: DataTypes.INTEGER,
    },
    {}
  );
  Spot.associate = function (models) {
    Spot.belongsTo(models.User, {
      foreignKey: "userId",
    });
    Spot.hasMany(models.SpotRoom, {
      foreignKey: "spotId",
      onDelete: "CASCADE",
    });
    Spot.hasMany(models.SpotFav, {
      foreignKey: "spotId",
      onDelete: "CASCADE",
    });
    Spot.hasMany(models.SpotReview, {
      foreignKey: "spotId",
      onDelete: "CASCADE",
    });
    Spot.hasMany(models.SpotBooking, {
      foreignKey: "spotId",
      onDelete: "CASCADE",
    });
    Spot.hasMany(models.Picture, {
      foreignKey: "spotId",
      onDelete: "CASCADE",
    });
  };
  return Spot;
};
