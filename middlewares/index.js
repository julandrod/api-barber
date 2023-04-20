const { authenticateUser, authorizeByRole } = require("./auth.middleware");
const errorMiddleware = require("./errors.middleware");
const notFoundMiddleware = require("./notFound.middleware");

module.exports = {
  errorMiddleware,
  notFoundMiddleware,
  authenticateUser,
  authorizeByRole,
}; 