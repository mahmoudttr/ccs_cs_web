const express = require('express');
const router = express.Router();

//Require controller modules.
const loginController = require('../app/controllers/auth/loginController');
const {isAuthenticated} = require('../app/middlewares/isAuthenticated');


router.post('/auth/login', loginController.login);

//Authentications.
router.use(isAuthenticated);


module.exports = router;
