var express = require('express');
const { validationResult } = require('express-validator/check');

var router = express.Router();

var employees = require('./../../models/employee');

/* POST create. */

router.post('/', (employees.validate), function (req, res, next) {
    res.setHeader('content-type', 'application/json');

    let errors = validationResult(req, res);

    if (!errors.isEmpty()) {

        return employees.sendErrorResponse(errors, req, res);

    }
    return employees.create(req,res);
    
});

module.exports = router;