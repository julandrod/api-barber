"use strict";

const { faker } = require("@faker-js/faker");
faker.setLocale("es");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const products = [];
    const productsImages = [
      "https://exitocol.vtexassets.com/arquivos/ids/564818/Cepillo-Andis-Portable-Barbero-Barberia-Barba-Cabello-Suave.jpg",
      "https://ayalatin.com/docs/Laca%20Extrema%20-%20Ayalatin.png",
      "https://ayalatin.com/docs/Cera%20Mate%20-%20Ayala.png",
      "https://ayalatin.com/docs/productos-ayalatin-gomina-fusion.png",
      "https://thebarberia.com/storage/product/bmcGgIy1ZhI0W5HjuLYEtDfkPTPVWWuXKF9etLd2.png",
      "https://www.beautymarket.es/peluqueria/fotos/9318_lanbmp2grande.jpg",
    ];

    for (let i = 0; i < 12; i++) {
      const createdAt = faker.date.recent();
      const product = {
        id: faker.datatype.uuid(),
        title: faker.lorem.sentence(3),
        description: faker.lorem.sentences(6),
        price: faker.finance.amount(10000, 90000, 0),
        stock: faker.datatype.number({ min: 1, max: 14 }),
        productImage: faker.helpers.arrayElement(productsImages),
        createdAt,
        updatedAt: createdAt,
      };
      products.push(product);
    }

    await queryInterface.bulkInsert("products", [...products]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("products", null, {});
  },
};
