"use strict";
module.exports = (sequelize, DataTypes) => {
  const SpotAmenity = sequelize.define(
    "SpotAmenity",
    {
      amenityId: DataTypes.INTEGER,
      spotId: DataTypes.INTEGER,
    },
    {}
  );
  SpotAmenity.associate = function (models) {
    SpotAmenity.belongsTo(models.Amenity, {
      foreignKey: "amenityId",
      onDelete: "CASCADE",
    });
    SpotAmenity.belongsTo(models.Spot, {
      foreignKey: "spotId",
      onDelete: "CASCADE",
    });
  };
  return SpotAmenity;
};
