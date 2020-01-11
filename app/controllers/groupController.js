const Sequelize = require('sequelize');
const {Group, connection} = require("../models/group");
const {User} = require("../models/User");
const api = require('../helpers/apiResponse');
const {validate} = require('../requests/group');


// Create and Save a new Object   == 201
exports.store = async (req, res, next) => {
    //validation data
    await validate(req, res, next);

    //insert in the database
    await Group.create(req.body)
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
};


// Retrieve all Objects from the database. == 200
exports.findAll = (req, res) => {
    Group.findAll({
        attributes: [
            'id',
            'name',
            'description',
            'created_by',
            'group_leader'
        ]
    }).then(groups => {
        return api.response(res, {
            code: 200,
            data: groups,
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
    Group.findOne({
        attributes: [
            'id',
            'name',
            'description',
            'created_by',
            'group_leader'
        ],
        where: {
            id: req.params.id
        }
    }).then(groups => {
        if(groups.length == 0) {
            return api.response(res, {
                code: 400,
                errors: 'Group not found',
            });
        }
        return api.response(res, {
            code: 200,
            data: groups,
        });
    }).catch(function (err) {
        return api.response(res, {
            code: 422,
            errors: err.message,
        });
    });
};

// Update a Object identified by the objectId in the request == 204
exports.update = (req, res) => {
    // update data
    Group.update(req.body,
        {
            returning: true,
            where: {id: req.params.id}
        })
        .then(function (result, user) {
            return api.response(res, {
                code: 200
            });
        }).catch(function (err) {
        return api.response(res, {
            code: 422,
            errors: err.message,
        });
    });
};

// Delete a Object with the specified objectId in the request
exports.delete = (req, res) => {
    Group.destroy({
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
            code: 422,
            errors: err.message,
        });
    });
};

//Delete all Objects from the database.
exports.deleteAll = (req, res) => {
    Group.destroy().then(function (result) {
        return api.response(res, {code: 200});
    }).catch(function (err) {
        return api.response(res, {
            code: 422,
            errors: err.message,
        });
    });
};
