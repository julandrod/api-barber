const { checkSchema, validationResult } = require("express-validator");

/**
 * Middleware que valida los schemas creados en express-validator
 * @param {Schema} schema schema creado para validar datos con express-validator
 * @returns respuesta con todos los errores o pasa al siguiente proceso (next) sino hay errores
 * 
 * @example
 * router.post("/users", validatorMiddleware(testSchema), registerController)
 */
const validatorMiddleware = (schema) => {
  const validations = checkSchema(schema);

  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);

    if (errors.isEmpty()) return next;

    const error = errors
      .array()
      .map((item) => item.msg)
      .join(", ");

    return res.status(400).json({ error });
  };
};

module.exports = validatorMiddleware;
