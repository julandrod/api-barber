const { Cart, products } = require("../database/models");
const { CustomError } = require("../helpers");

const addToCart = async (singleProduct, quantity) => {
  try {
    const cartExists = await Cart.findOne({
      where: { id: singleProduct.cartId },
    });
    if (!cartExists) {
      return await Cart.create(
        {
          productId: singleProduct.id,
          quantity,
          price: singleProduct.price,
        },
      );
    } else {
      quantity += cartExists.quantity;
      return await cartExists.update({ quantity });
    }
  } catch (error) {
    throw new CustomError(error.message, error.statusCode, error.errors);
  }
};

module.exports = { addToCart };
