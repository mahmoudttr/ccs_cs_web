const {Sequelize, connection} = require('../../config/database');

const GroupUser = connection.define('user_groups', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
    },
    group_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
    },

}, {});

GroupUser.associate = function (models) {
    GroupUser.belongsTo(models.Group, {as: 'group',foreignKey: 'group_id', sourceKey: 'id'});
    GroupUser.belongsTo(models.User, {as: 'user',foreignKey: 'user_id', sourceKey: 'id'});
};

module.exports = {
    GroupUser,connection
};
