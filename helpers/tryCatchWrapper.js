/**
 * Funcion para evitar el uso de try-catch en todos los controladores de las peticiones http
 * 
 * @example
 * const registerUser = tryCatchWrapper(async (req, res, next) => {
 *  const user = await User.create({...}) 
 *  ...
 *  ...
 * }) 
 */

const tryCatchWrapper = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = tryCatchWrapper;
