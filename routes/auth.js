const express = require('express');
const router = express.Router();

// Require controller modules.
const loginController = require('../app/controllers/auth/loginController');
const {isAuthenticated} = require('../app/middlewares/isAuthenticated');

// Authentications.
//router.use(isAuthenticated);
router.post('/login', loginController.login);

module.exports = router;
