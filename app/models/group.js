const {Sequelize, connection} = require('../../config/database');

const Group = connection.define('groups', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    created_by: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
    },
    group_leader: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
    },

}, {});

Group.associate = function (models) {
    Group.belongsToMany(models.User, {through:models.GroupUser});
};

module.exports = {
    Group,connection
};
