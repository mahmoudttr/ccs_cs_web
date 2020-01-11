const {Role} = require("../models/role");
const api = require('../helpers/apiResponse');

exports.findAll = (req, res) => {
    Role.findAll({
        attributes: [
            'id',
            'name',
            'description'
        ]
    }).then(roles => {
        return api.response(res, {
            code: 200,
            data: roles,
        });
    }).catch(function (err) {
        return api.response(res, {
            code: err.code,
            errors: err.message,
        });
    });
};
