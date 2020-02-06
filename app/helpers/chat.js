const {Session, connection} = require("../models/session");
const api = require('../helpers/apiResponse');

function getSocketIdInternal(userId) {
    Session.findOne({
        attributes: [
            'id',
            'socket_id',
            'user_id'
        ],
        where: {
            user_id: userId
        }
    }).then(session => {
        console.log(session.data);
        if (session) {
            return false;
        } else {
            return session;
        }

    }).catch(function (err) {
        console.log('resullt........................');
        console.log(err);

        return false;
    });
}

var helper = {
    getSocketId: function (userId) {
        console.log('@@@@@@@' + userId);
        Session.findAll({
            attributes: [
                'id',
                'user_id',
                'socket_id'
            ],
            where: {
                user_id: userId
            }
        }).then(session => {
            const r = session.map(resutl => {
            });
            return r;

        }).catch(function (err) {
            console.log('error-----------------------');
            console.log(err.message);
        });
    },
    auth: function (userID, socketID) {
        Session.create({user_id: userID, socket_id: socketID})
            .then(result => {
                return true;
            }).catch(function (err) {
            return false
        });
    },
    deleteSession: function (socket_id) {
        Session.destroy({where: {socket_id: socket_id}})
            .then(function (result, user) {
                return true;
            })
            .catch(function (err) {
                return false;
            });
    },
};

module.exports = helper;
