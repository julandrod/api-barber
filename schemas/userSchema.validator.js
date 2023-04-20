const { check } = require('express-validator')

/**
 * Middleware que valida los datos para crear el schema de User creados en express-validator
 * @example
 * router.post('/', [userSchemaValidator, validateFields], userController.createUser)
 */

const userSchemaValidator = [
    check('firstName').exists().not().trim().withMessage('El nombre es obligatorio'),
    check('lastName').exists().not().trim().withMessage('El apellido es obligatorio'),
    check('email').isEmail().trim().withMessage('Email incorrecto'),
    check('phone').isNumeric().isLength({min: 6}).withMessage('Número no válido'),
    check('password').isLength({min: 6}).trim().withMessage('El password debe ser de más de 6 caracteres')
]

module.exports = userSchemaValidator