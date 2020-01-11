const {Sequelize, connection} = require('../../config/database');

const User = connection.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    first_name: {
        type: Sequelize.STRING
    },
    last_name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING,
        unique: true
    },
    password: {
        type: Sequelize.STRING
    },
    image: {
        type: Sequelize.STRING,
        allowNull: true
    },
    phone_number_pbx: {
        type: Sequelize.STRING,
        allowNull: true
    },
    role_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true
    },
}, {});

// relation
User.associate = function (models) {
    User.belongsToMany(models.Group, {through:models.GroupUser});
    User.belongsTo(models.Role, {as: 'role',foreignKey: 'role_id', sourceKey: 'id'});
};




module.exports = {
    User
};
