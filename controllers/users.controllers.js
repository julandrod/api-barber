const {
  tryCatchWrapper,
  endPointResponse,
  CustomError,
} = require("../helpers");
const userServices = require("../services/users.services");
const { User } = require("../database/models");

const getAllBarbers = tryCatchWrapper(async (req, res, next) => {
  const allUsers = await userServices.findAllUsers("barber");

  endPointResponse({
    res,
    message: `Barberos listados de manera exitosa`,
    body: allUsers,
  });
});

const getAllClients = tryCatchWrapper(async (req, res, next) => {
  const allUsers = await userServices.findAllUsers("client");

  endPointResponse({
    res,
    message: `Clientes listados de manera exitosa`,
    body: allUsers,
  });
});

const showMe = tryCatchWrapper(async (req, res, next) => {
  const user = await User.findOne({
    where: { id: req.user.id },
    attributes: { exclude: ["password"] },
  });

  if (!user) {
    throw new CustomError("usuario no encontrado", 404);
  }

  endPointResponse({
    res,
    code: 200,
    message: "informacion del usuario",
    body: user,
  });
});

const getUserById = tryCatchWrapper(async (req, res, next) => {
  const userId = req.params.id;

  const user = await User.findByPk(userId, {
    attributes: { exclude: ["password"] },
  });

  if (!user) {
    throw new CustomError("Usuario no encontrado", 404);
  }

  endPointResponse({
    res,
    code: 200,
    message: "Usuario encontrado",
    body: user,
  });
});

const updateUserById = tryCatchWrapper(async (req, res, next) => {
  const { id } = req.params;
  const updatedUser = await userServices.updateUser(id, req.body, req.user);

  endPointResponse({
    res,
    message: "Usuario actualizado de manera exitosa",
    body: updatedUser,
  });
});

const deleteUser = tryCatchWrapper(async (req, res, next) => {
  const userId = req.params.id;

  const rowsDeleted = await User.destroy({
    where: { id: userId },
  });

  if (rowsDeleted === 0) {
    throw new CustomError("Usuario no encontrado", 404);
  }

  endPointResponse({
    res,
    message: `Usuario ${userId} eliminado`,
  });
});

const changeRole = tryCatchWrapper(async (req, res, next) => {
  const { id } = req.params;
  const { role } = req.body;
  const response = await userServices.updateUserRole(id, role);

  endPointResponse({
    res,
    message: "Rol del usuario modificado",
    body: response,
  });
});

const getAnalyticsBarber = tryCatchWrapper(async (req, res, next) => {
  const { barberId } = req.params;
  const {startDate, endDate} = req.query
  const analytics = await userServices.analyticsBarber(barberId, startDate, endDate);

  endPointResponse({
    res,
    message: "Resumen actividades barbero",
    body: analytics,
  });
});

module.exports = {
  getAllBarbers,
  getAllClients,
  showMe,
  getUserById,
  updateUserById,
  deleteUser,
  changeRole,
  getAnalyticsBarber,
};
