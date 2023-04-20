const { tryCatchWrapper, endPointResponse } = require("../helpers");
const orderServices = require("../services/orders.services");
const productServices = require("../services/products.services")

const postAddToCart = tryCatchWrapper(async (req, res, next) => {
  const { productId, quantity} = req.body;
  const singleProduct = await productServices.findProductById(productId)
  const response = await orderServices.addToCart(
    singleProduct,
    quantity,
  );

  endPointResponse({
    res,
    code: 201,
    message: "Producto agregado al carrito",
    body: response,
  });
});

module.exports = { postAddToCart };
