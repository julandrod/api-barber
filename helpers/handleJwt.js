const jwt = require("jsonwebtoken");

/**
 * Funcion quen encripta informacion en forma de un token JWT
 * @param {Object} payload Informacion que se quiere encriptar
 * @returns token JWT
 *
 * @example
 * createJwt({payload: {usuario:"test", id:1, phone:"123"}})
 * @returns eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 */
const createJwt = ({payload}) => {
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: process.env.JWT_DURATION});
  return accessToken;
};

/**
 * Funcion que verifica y desencripta un token JWT
 * @param {String} token token JWT que contiene informacion encriptada
 * @returns Objeto con la informacion desencriptada
 *
 * @example
 * isTokenValid(eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...)
 * @returns ({usuario:"test", id:1, phone:"123"})
 */
const isTokenValid = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { createJwt, isTokenValid };
