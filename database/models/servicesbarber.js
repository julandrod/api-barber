"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ServicesBarber extends Model {
    static associate({ appointments }) {
      this.hasMany(appointments, { foreignKey: "servicesId" });
    }
  }
  ServicesBarber.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cost: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ServicesBarber",
    }
  );
  return ServicesBarber;
};
