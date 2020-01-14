const {User} = require("../models/user");
const {validate} = require('../requests/user');
const bcrypt = require('bcryptjs');
const api = require('../helpers/apiResponse');

function isUniqueEmail(res, email) {
    User.findAll({
        attributes: ['id'],
        where: {email: email}
    }).then(result => {
        if (result.length == 0) {
            return api.response(res, {
                code: 422,
                errors: 'email must be unique',
            });
        }
    }).catch(function (err) {
        console.log('email................');
        return api.response(res, {
            code: 422,
            errors: err.message,
        });
    });
}

function isUniqueUsername(res, username) {
    User.findAll({
        attributes: ['id'],
        where: {username: username}
    }).then(result => {
        if (result.length == 0) {
            return api.response(res, {
                code: 422,
                errors: 'username must be unique',
            });
        }
    }).catch(function (err) {
        console.log('username................');
        return api.response(res, {
            code: 422,
            errors: err.message,
        });
    });
}

// Create and Save a new Object   == 201
exports.store = async (req, res, next) => {
    //console.log('Reqest is ....');
    //console.log(JSON.stringify(req.body));
    //  return res.send(JSON.parse(JSON.stringify(req.body)));

    //await validate(req, res, next);
    // check email
    //await isUniqueEmail(res,req.body.email);
    // check username
    //await isUniqueUsername(res,req.body.username);
    console.log('start function');
    await User.findAll({
        attributes: ['id'],
        where: {username: req.body.username}
    }).then(result => {
        console.log('start: unique error username................');
        if (result.length >= 1) {
            console.log('true......');
            return api.response(res, {
                code: 422,
                errors: 'username must be unique',
            });
        }
        console.log('end: unique error username................');

        if (result.length == 0) {
            User.findAll({
                attributes: ['id'],
                where: {email: req.body.email}
            }).then(result => {
                console.log('start: unique error email................');
                if (result.length >= 1) {
                    console.log('true......');
                    return api.response(res, {
                        code: 422,
                        errors: 'email must be unique',
                    });
                }
                console.log('end: unique error email................');

                if (result.length == 0) {

                    //TODO:: upload image in the folder uploads and return path directory folder

                    console.log('start: encryption password................');
                    //encryption password
                    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
                    console.log('end: encryption password................');


                    console.log('start: insert user in database...............');
                    //insert in the database
                    User.create(req.body).then(result => {
                        console.log('true: insert user in database...............');
                        return api.response(res, {
                            code: 201
                        });
                    }).catch(function (err) {
                        console.log('catch: insert user in database...............');
                        return api.response(res, {
                            code: 422,
                            errors: err.message,
                        });
                    });
                    console.log('end: insert user in database...............');
                }
            }).catch(function (err) {
                console.log('start: catch unique email................');
                return api.response(res, {
                    code: 422,
                    errors: err.message,
                });
                console.log('end: catch unique email................');
            });
        }
    }).catch(function (err) {
        console.log('start: catch unique username................');
        console.log(err.errors);
        console.log(err.message);
        return api.response(res, {
            code: 422,
            errors: err.errors,
        });
        console.log('end: catch unique username................');
    });
};

// Retrieve all Objects from the database. == 200
exports.findAll = (req, res) => {
    User.findAll({
        attributes: [
            'id',
            'username',
            'first_name',
            'last_name',
            'email',
            'image',
            'phone_number_pbx'
        ]
    }).then(users => {
        return api.response(res, {
            code: 200,
            data: users,
        });
    }).catch(function (err) {
        return api.response(res, {
            code: 422,
            errors: err.message,
        });
    });
};

// Find a single Object with a customerId == 200
exports.findOne = (req, res) => {
    User.findOne({
        attributes: [
            'id',
            'username',
            'first_name',
            'last_name',
            'email',
            'image',
            'phone_number_pbx'
        ],
        where: {
            id: req.params.id
        }
    }).then(user => {
        return api.response(res, {
            code: 200,
            data: user
        });
    }).catch(function (err) {
        return api.response(res, {
            code: err.code,
            errors: err.message,
        });
    });
};

// Update a Object identified by the objectId in the request == 204
exports.update = (req, res) => {
    // TODO::validation data
    // update data
    User.update(req.body, {
        returning: true,
        where: {id: req.params.id}
    }).then(function (result, user) {
        return api.response(res, {
            code: 200
        });
    }).catch(function (err) {
        return api.response(res, {
            code: err.code,
            errors: err.message,
        });
    });
};

// Delete a Object with the specified objectId in the request
exports.delete = (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    }).then(function (result) {
        if (!result) {
            return api.response(res, {
                code: 400
            });
        }
        return api.response(res, {code: 200, message: 'Delete successful'});
    }).catch(function (err) {
        return api.response(res, {
            code: err.code,
            errors: err.message,
        });
    });
};

// Delete all Objects from the database.
exports.deleteAll = (req, res) => {
    return User.destroy({
        where: {}
    }).then(function (result) {
        return api.response(res, {code: 200});
    }).catch(function (err) {
        return api.response(res, {
            code: err.code,
            errors: err.message,
        });
    });
};
