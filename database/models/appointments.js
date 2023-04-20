"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class appointments extends Model {
    static associate({ User, ServicesBarber }) {
      this.belongsTo(User, { as: "appClient", foreignKey: "clientId"  });
      this.belongsTo(User, { as: "appBarber", foreignKey: "barberId"  });
      this.belongsTo(ServicesBarber, { foreignKey: "servicesId", as: "turno" });
    }
  }
  appointments.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      appointmentDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      appointmentHour: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      taken: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      status: {
        type: DataTypes.ENUM,
        values: ["pending", "cancel", "done"],
        defaultValue: "pending",
        allowNull: false,
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "appointments",
    }
  );
  return appointments;
};
