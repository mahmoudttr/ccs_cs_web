const {validate} = require('../../requests/login');
const {User} = require('../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const api = require('../../helpers/apiResponse');

//const apiResponse = require('../../helpers/apiResponse');
//const {throwError} = require('../../helpers/error');

// POST: login => Authentication
exports.login = async function (req, res, next) {
    const {username, password} = req.body;
    try {
        /*validation*/
        await validate(req, res, next);


        /*authenticate*/
        //1- check username
        await User.findOne({
            attributes: [
                'id',
                'username',
                'password',
                'first_name',
                'last_name',
                'email',
                'image',
                'phone_number_pbx',
                'fcm_token'
            ],
            where: {username: username}
        }).then(user => {
            if (!user) {
                return api.response(res, {
                    code: 401,
                    errors: 'username or password error',
                });
            }
            if (user) {
                //2- check password
                var checkPassword = bcrypt.compareSync(password, user.password);
                if (!checkPassword) {
                    return api.response(res, {
                        code: 401,
                        errors: 'username or password error',
                    });
                }
                console.log('user....', user.username);

                if (checkPassword) {
                    /*generate token in JWT*/
                    var token = generateTokenJWT(user);
                    delete user.password;
                    user.password = null;
                   // console.log(delete user.password);
                    return api.response(res, {
                        code: 200,
                        data: {user: user, token: token},
                    });
                }
            }
        }).catch(function (err) {
            return api.response(res, {
                code: 422,
                errors: err.message,
            });
        });
    } catch ({status, err}) {
        return api.response(res, {
            code: 422,
            errors: err.message,
        });
    }
};

function generateTokenJWT(user) {
    let privateKey = fs.readFileSync(path.join(__dirname, '../../../private.pem'), 'utf8');
    let token = jwt.sign({body: user}, privateKey,
        {
            algorithm: process.env.JWT_ALGORITHM,
            // expiresIn: process.env.JWT_TOKEN_LIFE
        }
    );
    return token;
}

function refreshTokenJWT(user) {
    let privateKey = fs.readFileSync(path.join(__dirname, '../../../private.pem'), 'utf8');
    let token = jwt.sign({body: user}, privateKey,
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
