const express = require('express');
const router = express.Router();
const api = require('../app/helpers/apiResponse');

const chatController = require('../app/controllers/chatController');
const roleController = require('../app/controllers/roleController');
const userController = require('../app/controllers/userController');
const groupController = require('../app/controllers/groupController');
const groupUserController = require('../app/controllers/groupUserController');



// Chat
router.post('/chat/auth', chatController.store);
router.get('/chat/:userId/user', chatController.findSocketIdByUserId);



// Roles
router.get('/roles', roleController.findAll);


// Users
router.get('/users', userController.findAll);
router.get('/users/:id', userController.findOne);
router.post('/users', userController.store);
router.put('/users/:id', userController.update);
router.delete('/users/:id', userController.delete);
router.delete('/users', userController.deleteAll);

// Groups
router.get('/groups', groupController.findAll);
router.post('/groups', groupController.store);
router.get('/groups/:id', groupController.findOne);
router.put('/groups/:id', groupController.update);
router.delete('/groups/:id', groupController.delete);
router.delete('/groups', groupController.deleteAll);

// Groups Users
router.get('/group-users', groupUserController.findAll);
router.get('/group-users/:id', groupUserController.findOne);
router.get('/group-users/users/:groupName', groupUserController.users);
router.get('/group-users/groups/:userId', groupUserController.groupsByUserID);
router.post('/group-users', groupUserController.create);
router.put('/group-users/:id', groupUserController.update);
router.delete('/group-users/:id', groupUserController.delete);
router.delete('/group-users', groupUserController.deleteAll);

module.exports = router;

