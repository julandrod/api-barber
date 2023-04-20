const CustomError = require("./errorResponse");

const checkPermissions = (reqUser, resourceUserId) => {
  if (reqUser.role === "admin") return;
  if (reqUser.id === resourceUserId) return;

  throw new CustomError("No esta autorizado para acceder a esta ruta", 401);
};

module.exports = checkPermissions;
