const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const checkToken = require('../helpers/checkToken');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/checkuser', checkToken, UserController.checkUser);
router.get('/:id', checkToken, UserController.getUserById);
router.patch('/edit/:id', checkToken, UserController.editUser);
router.delete('/:id', checkToken, UserController.deleteUser);

module.exports = router;
