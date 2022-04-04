"use strict";
module.exports = (sequelize, DataTypes) => {
  const Picture = sequelize.define(
    "Picture",
    {
      image: DataTypes.STRING,
      spotId: DataTypes.INTEGER,
    },
    {}
  );
  Picture.associate = function (models) {
    Picture.belongsTo(models.Spot, {
      foreignKey: "spotId",
      onDelete: "CASCADE",
    });
  };
  return Picture;
};
