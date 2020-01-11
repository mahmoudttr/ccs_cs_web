const {Sequelize, connection} = require('../../config/database');

const Role = connection.define('roles', {
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
        type: Sequelize.STRING,
        allowNull: true,
    }
}, {});

Role.associate = function (models) {
    Role.hasMany(models.User, {as: 'users',foreignKey: 'role_id', sourceKey: 'id'});
};

module.exports = {
    Role
};
