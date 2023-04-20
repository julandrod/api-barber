const { tryCatchWrapper, CustomError, isTokenValid } = require("../helpers");

/**
 * Middleware que verifica que exista un token JWT y que este sea valido.
 * Si el token es valido lo desencripta y guarda su contenido en req.user
 * @example
 * router.get("/users", authenticateUser, getUserController)
 */
const authenticateUser = tryCatchWrapper(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomError("No hay un token presente", 401);
  }

  const token = authHeader.split(" ")[1];
  try {
    const tokenDecoded = isTokenValid(token);
    req.user = { ...tokenDecoded };
    next();
  } catch (error) {
    throw new CustomError("El token no es valido", 401);
  }
});

/**
 * Middleware que permite el ingreso de ciertos roles al endpoint/ruta 
 * @param  {...String} roles roles autorizados para acceder al endpoint
 * 
 * @example
 * router.delete("/users/:id", [authenticateUser, authorizeByRole("admin", "otherRole")], getUserController)
 */
const authorizeByRole = (...roles) => {
  return tryCatchWrapper(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError("No esta autorizado para acceder a esta ruta", 401);
    }
    next();
  });
};

module.exports = { authenticateUser, authorizeByRole };
