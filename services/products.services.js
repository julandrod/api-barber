const { products } = require("../database/models");
const { CustomError } = require("../helpers");

const createProduct = async (
  title,
  description,
  price,
  stock,
  productImage
) => {
  try {
    const [response, created] = await products.findOrCreate({
      where: { title },
      defaults: { title, description, price, stock, productImage },
    });
    if (!created) {
      throw new CustomError("Este producto ya existe en la tienda", 400);
    }

    return response;
  } catch (error) {
    throw new CustomError(error.message, error.statusCode, error.errors);
  }
};

const findAllProducts = async () => {
  try {
    const allProducts = await products.findAndCountAll();
    return allProducts;
  } catch (error) {
    throw new CustomError(error.message, error.statusCode, error.errors);
  }
};

const findProductById = async (productId) => {
  try {
    const singleProduct = await products.findOne({
      where: { id: productId },
    });
    if (!singleProduct) {
      throw new CustomError("No se encontro ningun producto con este Id", 404);
    }

    return singleProduct;
  } catch (error) {
    throw new CustomError(error.message, error.statusCode, error.errors);
  }
};

const updateProductById = async (
  oldProduct,
  title,
  description,
  price,
  stock,
  productImage
) => {
  try {
    oldProduct.update({ title, description, price, stock, productImage });
    oldProduct.save();

    return oldProduct;
  } catch (error) {
    throw new CustomError(error.message, error.statusCode, error.errors);
  }
};

const deleteProductById = async (productId, singleProduct) => {
  try {
    await singleProduct.destroy();

    return `Producto ${productId} eliminado`;
  } catch (error) {
    throw new CustomError(error.message, error.statusCode, error.errors);
  }
};

module.exports = {
  createProduct,
  findAllProducts,
  findProductById,
  updateProductById,
  deleteProductById,
};
