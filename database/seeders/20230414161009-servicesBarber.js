"use strict";

const { faker } = require("@faker-js/faker");
faker.setLocale("es");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const services = [];
    const availableServices = [
      "Corte Pelo",
      "Corte Barba",
      "Corte Pelo Y Barba",
      "Lavado Y Corte",
      "Lavado Y Perfilado",
    ];
    for (let i = 0; i < availableServices.length; i++) {
      const createdAt = faker.date.recent();
      const newService = {
        id: faker.datatype.uuid(),
        name: availableServices[i],
        cost: faker.finance.amount(10000, 50000, 0),
        createdAt,
        updatedAt: createdAt,
      };
      services.push(newService);
    }
    await queryInterface.bulkInsert("ServicesBarbers", [...services]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ServicesBarbers", null, {});
  },
};
