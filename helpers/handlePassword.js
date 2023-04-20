const bcrypt = require("bcrypt");

/**
 * Funcion que recibe la contraseña ingresada por el usuario y la encriptada usando bcrypt
 * @param {String} password contraseña ingresada por el usuario
 * @returns contraseña encriptada
 *
 * @example
 * encryptPassword("123456")
 * //returns $2b$10$ZEMKGR5...
 */
const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

/**
 * Funcion que compara una contraseña ingresada por el usuario con una
 * contraseña encriptada en la base de datos
 * @param {String} inputPassword contraseña ingresada por el usuario
 * @param {String} password contraseña encriptada en la base de datos
 * @returns true si las contraseñas coinciden, false en caso contrario
 * @example
 * comparePassword("123456", encryptPass)
 * //returns true si coinciden
 */
const comparePassword = async (inputPassword, password) => {
  return await bcrypt.compare(inputPassword, password);
};

module.exports = { encryptPassword, comparePassword };
