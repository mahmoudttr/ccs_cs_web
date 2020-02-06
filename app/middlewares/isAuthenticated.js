const fs = require('fs');
const jwt = require('jsonwebtoken');
const path = require('path');
const api = require('../helpers/apiResponse');

isAuthenticated = (req, res, next) => {
    console.log('isAuthenticated');
    if (typeof req.headers.authorization !== "undefined") {
        console.log('---isAuthenticated');
        // retrieve the authorization header and parse out the
        // JWT using the split function
        let token = req.headers.authorization.split(" ")[0];
        let privateKey = fs.readFileSync(path.join(__dirname, '../../private.pem'), 'utf8');

        // Here we validate that the JSON Web Token is valid and has been
        // created using the same private pass phrase
        jwt.verify(token, privateKey, {algorithm: process.env.JWT_TOKEN_LIFE}, (err, user) => {
            // if there has been an error...
            if (err) {
                // shut them out!
                return api.response(res, {
                    code: 401,
                    errors: 'Not Authorized'
                });
               // res.status(500).json({error: ""});
                throw new Error("Not Authorized");
            }
            // if the JWT is valid, allow them to hit
            // the intended endpoint
            return next();
        });
    } else {
        // No authorization header exists on the incoming
        // request, return not authorized and throw a new error
        console.log('---11');
        return api.response(res, {
            code: 401,
            errors: 'Not Authorized'
        });
        console.log('11');
       // return res.status(500).json({error: "Not Authorized"});
        //throw new Error("Not Authorized");
        console.log('22');
    }
};

module.exports = {
    isAuthenticated
};
