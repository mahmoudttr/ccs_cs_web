const {Sequelize, connection} = require('../../config/database');

const Session = connection.define('sessions', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
    },
    socket_id: {
        type: Sequelize.STRING,
        allowNull: true,
    }
}, {});

/*Session.associate = function (models) {
    Session.belongsTo(models.User, {as: 'user', foreignKey: 'user_id', sourceKey: 'id'});
};*/

module.exports = {
    Session,connection
};
