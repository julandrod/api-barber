const { tryCatchWrapper, endPointResponse } = require("../helpers");
const authServices = require("../services/auth.services");
const sendNewUser = require("../middlewares/email.middleware");
const crypto = require("crypto");

const registerUser = tryCatchWrapper(async (req, res, next) => {
  const { firstName, lastName, email, phone, profileImage, password } =
    req.body;

  const verificationToken = crypto.randomBytes(40).toString("hex");

  const response = await authServices.createUser(
    firstName,
    lastName,
    email,
    phone,
    profileImage,
    password,
    verificationToken
  );

  //envía correo de bienvenida
  const origin = "http://localhost:5000";
  await sendNewUser(email, firstName, lastName, verificationToken, origin);

  // Se devuelve la respuesta de la peticion http usando la funcion "endPointResponse"
  endPointResponse({
    res,
    code: 201,
    message: "Nuevo usuario registrado",
    body: response,
  });
});

const loginUser = tryCatchWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  const response = await authServices.login(email, password);

  endPointResponse({
    res,
    code: 200,
    message: "Login exitoso",
    body: response,
  });
});

const verifyEmail = tryCatchWrapper(async (req, res, next) => {
  const { verificationToken, email } = req.body;
  const response = await authServices.verifyUserByEmail(
    verificationToken,
    email
  );

  endPointResponse({ res, message: response });
});

const changePassword = tryCatchWrapper(async (req, res, next) => {
  const { email, oldPassword, newPassword, confirmNewPassword } = req.body;
  const response = await authServices.reset(
    email,
    oldPassword,
    newPassword,
    confirmNewPassword
  );

  endPointResponse({
    res,
    code: 200,
    message: "Contraseña actualizada.",
    body: response,
  });
});

module.exports = { registerUser, loginUser, verifyEmail, changePassword };
