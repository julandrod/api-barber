/**
 * Funcion para devolver la respuesta de una peticion http en el mismo formato siempre
 * @param {Object} res - propiedad res que se pasa directamente de la peticion http
 * @param {Number} code - codigo de status de la peticion http, por defecto 200
 * @param {String} message - mensaje con informacion relevante sobre la respuesta
 * @param {Object} body - informacion/propiedades que devuelve la peticion
 * 
 * @example 
 * endPointResponse({
 *  res,
 *  code: 201, 
 *  message: "Usuario creado"
 *  body: {
 *    usuario,
 *    token
 *  }
 * })
 */

const endPointResponse = ({ res, code = 200, message, body }) => {
  res.status(code).json({ code, message, body });
};

module.exports = endPointResponse;
