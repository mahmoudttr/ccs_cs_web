const {Session} = require("../models/session");
const api = require('../helpers/apiResponse');
const yup = require('yup');

exports.store = (req, res) => {

    const rules = yup.object().shape({
        user_id: yup.string().required(),
        socket_id: yup.string().required()
    });

    const valid = rules.validate(req.body, {abortEarly: false})
        .then(function (value) {
            Session.create(req.body)
                .then(result => {
                    return api.response(res, {
                        code: 201,
                    });
                }).catch(function (err) {
                return api.response(res, {
                    code: 422,
                    errors: err.message,
                });
            });
        })
        .catch(errors => {
            const schemaErrors = errors.inner.map(err => {
                return {field: err.path, message: err.message};
            });
            return api.response(res, {
                code: 422,
                errors: schemaErrors,
            });
        });
};


exports.findSocketIdByUserId = (req, res) => {
    Session.findAll({
        attributes: [
            'id',
            'socket_id',
            'user_id'
        ],
        where: {
            user_id: req.params.userId
        }
    }).then(session => {
        return api.response(res, {
            code: 200,
            data:session
        });

    }).catch(function (err) {
        return api.response(res, {
            code: 422,
            errors: err.message,
        });
    });
};


exports.delete = (req, res) => {
    Session.destroy({where: {user_id: req.params.id}})
        .then(function (result, user) {
            return api.response(res, {code: 200, message: 'Delete successful'});
        })
        .catch(function (err) {
            return api.response(res, {
                code: 422,
                errors: err.message,
            });
        });
};

