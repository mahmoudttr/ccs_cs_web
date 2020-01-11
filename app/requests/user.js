const yup = require('yup');
const api = require('../helpers/apiResponse');

const rules = yup.object().shape({
    username: yup.string().required(),
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    email: yup.string().required().email(),
    phone_number_pbx: yup.string(),
    password: yup.string().required()
});

const validate = (req, res, next) => {
    const valid = rules.validate(req.body, {abortEarly: false})
        .catch(errors => {
            const schemaErrors = errors.inner.map(err => {
               // return {field: err.path, message: err.message};
                return {message: err.message};
            });
            return api.response(res, {
                code: 422,
                errors: schemaErrors
            });
        });
};


module.exports = {
    validate
};
