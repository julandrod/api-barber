const CustomError = require("../helpers/errorResponse");

const notFoundMiddleware = (req, res, next) => {
  throw new CustomError("No se encontro la ruta", 404);
};

module.exports = notFoundMiddleware;