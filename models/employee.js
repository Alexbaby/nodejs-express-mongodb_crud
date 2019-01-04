const mongoose = require('mongoose');

const { check } = require('express-validator/check');

var employees = {};

var employees = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    created_at: { type: Date, defalult: Date.now },
    updated_at: { type: Date, defalult: Date.now }
});

// validation
employees.validate = [
    check('email').isEmail().withMessage('must be a valid email'),
    check('name').custom((value, { req }) => {
        return new Promise(function (resolve, reject) {
            if (value.trim()) {
                resolve(true);
            } else {
                reject(false);
            }
        });
    }).withMessage('name is required')
];

employees.sendErrorResponse = function (errors, req, res) {
    var error_response = {
        "status": 0,
        "errors": {}
    };
    errors = errors.array();

    for (vari = 0; i < errors.length; i++) {
        error_response.errors[errors[i].param] = [errors[i].msg];
    }
    return res.status(400).end(JSON.stringify(error_response, null, 3));
};

module.exports = employees;