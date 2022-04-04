"use strict";
module.exports = (sequelize, DataTypes) => {
  const SpotRoom = sequelize.define(
    "SpotRoom",
    {
      name: DataTypes.STRING,
      numOfGuests: DataTypes.INTEGER,
    },
    {}
  );
  SpotRoom.associate = function (models) {
    SpotRoom.belongsTo(models.Spot, {
      foreignKey: "spotId",
      onDelete: "CASCADE",
    });
  };
  return SpotRoom;
};
