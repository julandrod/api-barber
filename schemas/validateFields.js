const { validationResult } = require('express-validator')

/**
 * Middleware que valida los schemas creados en express-validator
 * @param {req}
 * @returns respuesta con todos los errores. De no haber error pasa al siguiente proceso (next)
 *  
 * @example
 * router.post('/', [userSchemaValidator, validateFields], userController.createUser)
 */

const validateFields = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            error: errors.array().map(error => error.msg).join(', ')
        });
    }
    next();
}

module.exports = validateFields