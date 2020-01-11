const sequelize = require('../../config/database');

const mdu = sequelize.define('mdu', {}, {});


// Find all users
mdu.findAll().then(result => {
    console.log("All users:", JSON.stringify(result, null, 4));
});

// Create a new user
mdu.create({firstName: "Jane", lastName: "Doe"}).then(jane => {
    console.log("Jane's auto-generated ID:", jane.id);
});

// Delete everyone named "Jane"
mdu.destroy({
    where: {
        firstName: "Jane"
    }
}).then(() => {
    console.log("Done");
});

// Change everyone without a last name to "Doe"
mdu.update({lastName: "Doe"}, {
    where: {
        lastName: null
    }
}).then(() => {
    console.log("Done");
});


module.exports = mdu;
