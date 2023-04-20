"use strict";

const { faker } = require("@faker-js/faker");
const { User, appointments, ServicesBarber } = require("../models");
const { Op } = require("sequelize");
faker.setLocale("es");

/** @type {import('sequelize-cli').Migration} */

const getInfoBarber = async (barberId) => {
  return await appointments.findAll({
    where: {
      [Op.and]: [{ barberId }, { status: "done" }],
    },
    include: {
      model: ServicesBarber,
      attributes: {
        exclude: ["id", "createdAt", "updatedAt"],
      },
    },
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
};

module.exports = {
  async up(queryInterface, Sequelize) {
    const barbers = await User.findAll({ where: { role: "barber" } });
    const reviews = [];

    for (let barber of barbers) {
      const servicesDone = await getInfoBarber(barber.id);
      for (let i = 0; i < servicesDone.length; i++) {
        const createdAt = faker.date.recent();
        const review = {
          id: faker.datatype.uuid(),
          rating: faker.datatype.number({ min: 1, max: 5 }),
          title: faker.lorem.sentence(3),
          comment: faker.lorem.sentences(2),
          barberId: barber.id,
          clientId: servicesDone[i].clientId,
          createdAt,
          updatedAt: createdAt,
        };
        reviews.push(review);
      }
    }
    await queryInterface.bulkInsert("reviews", [...reviews]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("reviews", null, {});
  },
};
