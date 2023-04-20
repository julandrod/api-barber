const { tryCatchWrapper, endPointResponse } = require("../helpers");
const productServices = require("../services/products.services");

const postProduct = tryCatchWrapper(async (req, res, next) => {
  const { title, description, price, stock, productImage } = req.body;
  const newProduct = await productServices.createProduct(
    title,
    description,
    price,
    stock,
    productImage
  );

  endPointResponse({
    res,
    code: 201,
    message: "Producto creado de manera exitosa",
    body: newProduct,
  });
});

const getProducts = tryCatchWrapper(async (req, res, next) => {
  const productsList = await productServices.findAllProducts();

  endPointResponse({
    res,
    message: "Productos listados de manera exitosa",
    body: productsList,
  });
});

const getSingleProduct = tryCatchWrapper(async (req, res, next) => {
  const { productId } = req.params;
  const singleProduct = await productServices.findProductById(productId);

  endPointResponse({
    res,
    message: "Producto listado de manera exitosa",
    body: singleProduct,
  });
});

const patchProduct = tryCatchWrapper(async (req, res, next) => {
  const { productId } = req.params;
  const { title, description, price, stock, productImage } = req.body;
  const singleProduct = await productServices.findProductById(productId);
  const updatedProduct = await productServices.updateProductById(
    singleProduct,
    title,
    description,
    price,
    stock,
    productImage
  );

  endPointResponse({
    res,
    message: "Producto actualizado de manera exitosa",
    body: updatedProduct,
  });
});

const deleteProduct = tryCatchWrapper(async (req, res, next) => {
  const { productId } = req.params;
  const singleProduct = await productServices.findProductById(productId);
  const response = await productServices.deleteProductById(
    productId,
    singleProduct
  );

  endPointResponse({ res, message: response });
});

module.exports = {
  postProduct,
  getProducts,
  getSingleProduct,
  patchProduct,
  deleteProduct,
};
