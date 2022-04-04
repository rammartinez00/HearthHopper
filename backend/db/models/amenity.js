"use strict";
module.exports = (sequelize, DataTypes) => {
  const Amenity = sequelize.define(
    "Amenity",
    {
      name: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {}
  );
  Amenity.associate = function (models) {
    Amenity.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });
    Amenity.hasMany(models.SpotAmenity, {
      foreignKey: "amenityId",
      onDelete: "CASCADE",
    });
  };
  return Amenity;
};
