const Sequelize = require('sequelize');
const {GroupUser, connection} = require("../models/groupUser");
const {validate} = require('../requests/groupUser');
const api = require('../helpers/apiResponse');



// Create and Save a new Object   == 201
exports.create = async (req, res, next) => {
    //validation data
    await validate(req, res, next);
    GroupUser.findAll({
        attributes: [
            'user_id',
            'group_id',
        ],
        where: {
            user_id: req.body.user_id,
            group_id: req.body.group_id
        }
    }).then(users => {
        if (users.length > 0) {
            return api.response(res, {
                code: 400,
                errors: 'The user is in the group'
            });
        } else {
            //insert in the database
            GroupUser.create(req.body).then(result => {
                return api.response(res, {
                    code: 201,
                });
            }).catch(function (err) {
                return api.response(res, {
                    code: 422,
                    errors: err.message,
                });
            });
        }
    }).catch(function (err) {
        return api.response(res, {
            code: 422,
            errors: err.message,
        });
    });
};

exports.users = (req, res) => {
    const groupName = req.params.groupName;
    connection.query('SELECT user_groups.id,groups.id as group_id,groups.name as group_name,users.id as user_id,users.username as user_name FROM groups JOIN user_groups ON user_groups.group_id = groups.id JOIN users ON user_groups.user_id = users.id where groups.name= ? ',
        {replacements: [groupName], type: connection.QueryTypes.SELECT}
    ).then(users => {
        return api.response(res, {
            code: 200,
            data: {users},
        });
    }).catch(function (err) {
        return api.response(res, {
            code: 422,
            errors: err.message,
        });
    });
    /*Group.findAll({
        attributes: {},
        where: {name: req.params.groupName},
        include: [{
            model: User,
            through: {
                attributes: ['*']
            }
        }],
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
    });*/
};


exports.groupsByUserID = (req, res) => {
    const userId = req.params.userId;
    connection.query('SELECT user_groups.id,groups.id as group_id,groups.name as group_name,users.id as user_id,users.username as user_name FROM groups JOIN user_groups ON user_groups.group_id = groups.id JOIN users ON user_groups.user_id = users.id where users.id= ? ',
        {replacements: [userId], type: connection.QueryTypes.SELECT}
    ).then(groups_user => {
        return api.response(res, {
            code: 200,
            data: {groups_user:groups_user},
        });
    }).catch(function (err) {
        return api.response(res, {
            code: 422,
            errors: err.message,
        });
    });
    /*Group.findAll({
        attributes: {},
        where: {name: req.params.groupName},
        include: [{
            model: User,
            through: {
                attributes: ['*']
            }
        }],
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
    });*/
};

// Retrieve all Objects from the database. == 200
exports.findAll = (req, res) => {
    GroupUser.findAll({
        attributes: [
            'id',
            'user_id',
            'group_id',
        ]
    }).then(users => {
        //TODO::check is data
        res.status(200).json({data: users});
    }).catch(function (err) {
        res.json(err.message);
    });
};

// Find a single Object with a customerId == 200
exports.findOne = (req, res) => {
    GroupUser.findAll({
        attributes: [
            'id',
            'user_id',
            'group_id',
        ],
        where: {
            id: req.params.id
        }
    }).then(users => {
        //TODO::check is data
        res.status(200).json({data: id});
    }).catch(function (err) {
        res.json(err.message);
    });
};

//Update a Object identified by the objectId in the request == 204
exports.update = (req, res) => {
    // TODO::validation data
    // update data
    GroupUser.update(req.body,
        {
            returning: true,
            where: {id: req.params.id}
        })
        .then(function (result, user) {
            res.status(204).json(req.params.id)
        })
        .catch(function (err) {
            res.json(err.message);
        });
};


//Delete a Object with the specified objectId in the request
exports.delete = (req, res) => {
    return GroupUser.destroy({where: {id: req.params.id}})
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


//Delete all Objects from the database.
exports.deleteAll = (req, res) => {
    return GroupUser.destroy({where: {}})
        .then(function (result, user) {
            res.status(202).json(result);
        })
        .catch(function (err) {
            res.json(err.message);
        });
};
