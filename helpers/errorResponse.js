/**
 * Nueva clase "CustomError" que hereda de la clase "Error". El constructor de la clase recibe 
 * como parametros un mensaje (message), un codigo de estado (statusCode) y un arreglo de errores.
 * 
 * Los errores generados con esta clase son inteceptados por el middleware encargado de los errores.
 */

class CustomError extends Error {
  /**
   * @param {String} message Informacion relevante sobre el error
   * @param {Number} statusCode Codigo de estado del error
   * @param {String[]} errors Arreglo de errores si los hay
   */
  constructor(message, statusCode, errors = []) {
    super();

    this.message = message;
    this.statusCode = statusCode;
    this.isOperational = true;
    this.errors = errors;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = CustomError;
