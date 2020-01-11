const {validate} = require('../../requests/login');
const {User} = require('../../models/user');
const {compare} = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

//const apiResponse = require('../../helpers/apiResponse');
//const {throwError} = require('../../helpers/error');

// POST: login => Authentication
exports.login = async function (req, res, next) {
    const {username, password} = req.body;
    try {
    /*validation*/
    await validate(req, res, next);
    //throwErrorValidation(403, schemaErrors)
    //return res.json({status: 403, message: schemaErrors});
    //return res.status(422).json({message: schemaErrors , data : []});
    //if (validation)
    //if (validation) throwError(403, validation);
    //if (validation) throwError(403, validation);
    //const validation = await rules.validate(req.body);
    //if (validation) throwError(403, validation);
    //   });

    /*authenticate*/
    //1- check username
    const user = await User.findOne({
        attributes: ['id', 'username', 'password', 'email'],
        where: {username: username}
    });

    // return res.json({result: user});

    //2- check password
    //  const checkPassword = await compare(password, user.password);
    // if (!checkPassword) throwError(403, 'unauthorized');

    /*generate token in JWT*/
    return res.json({ user});

    generateTokenJWT(user);
    return res.json({result: user});
    /*redirect in home page*/
      } catch ({status, err}) {
          return res.json({
              status: status,
              error: err
          });
      }
};

function generateTokenJWT(user) {
    let privateKey = fs.readFileSync(path.join(__dirname, '../../../private.pem'), 'utf8');
    let token = jwt.sign(user, privateKey,
        {
            expiresIn: process.env.JWT_ALGORITHM,
            algorithm: process.env.JWT_TOKEN_LIFE
        }
    );
    return token;
}

function refreshTokenJWT(user) {
    let privateKey = fs.readFileSync(path.join(__dirname, '../../../private.pem'), 'utf8');
    let token = jwt.sign(user, privateKey,
        {
            expiresIn: process.env.JWT_REFRESH_TOKEN_LIFE,
            algorithm: process.env.JWT_TOKEN_LIFE
        }
    );
    return token;
}
/*
function findOne() {

}

function f() {
    if (bcrypt.compareSync(password, user.password)) {
        return user.authorize();
    }
}
*/
