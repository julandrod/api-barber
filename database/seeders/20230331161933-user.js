"use strict";
const { faker } = require("@faker-js/faker");
const { encryptPassword } = require("../../helpers");

faker.setLocale("es");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [];
    const userPassword = await encryptPassword("123456");

    const admin = {
      id: faker.datatype.uuid(),
      firstName: "Admin",
      lastName: "NoCountry",
      email: "admin@mail.com",
      profileImage:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      phone: faker.phone.number("##########"),
      password: userPassword,
      role: "admin",
      verificationToken: "",
      verified: true,
      createdAt: faker.date.recent(),
      updatedAt: faker.date.recent(),
    };

    for (let i = 0; i < 50; i++) {
      const createdAt = faker.date.recent();
      const user = {
        id: faker.datatype.uuid(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.helpers.uniqueArray(faker.internet.email, 1)[0],
        profileImage: `https://randomuser.me/api/portraits/men/${i}.jpg`,
        phone: faker.helpers.unique(() => faker.phone.number("##########")),
        password: userPassword,
        role: i < 10 ? "barber" : "client",
        verificationToken: "",
        verified: true,
        description: i < 10 ? faker.lorem.sentences(8) : "",
        createdAt,
        updatedAt: createdAt,
      };
      users.push(user);
    }
    await queryInterface.bulkInsert("Users", [...users, admin]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
