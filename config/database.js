const Sequelize = require('sequelize');

const connection = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_CONNECTION,
    pool: {
        max: 5, //Never have more than five open connections (max: 5)
        min: 0, //At a minimum, have zero open connections/maintain no minimum number of connections (min: 0)
        acquire: 30000, //
        idle: 10000 //Remove a connection from the pool after the connection has been idle (not been used) for 10 seconds (idle: 10000)
    },
    define: {
        timestamps: false
    }
});

connection
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = {Sequelize, connection};
