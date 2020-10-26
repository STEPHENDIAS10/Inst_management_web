const { check } = require('express-validator');
const { validationResult } = require('express-validator');

exports.userRegisterValidation = [
    check('firstName').exists(),
    check('firstName').isString()
];

exports.throwValidationError = (req, res, next) => {
    try {
        validationResult(req).throw();
        next();
    } catch (error) {
        res.status(500).json({
            error,
            message: error.message
        });
    }
}