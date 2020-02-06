const yup = require('yup');

const rules = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required()
});

const validate = (req, res, next) => {
    const valid = rules.validate(req.body, {abortEarly: false})
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


module.exports = {
    validate
};
