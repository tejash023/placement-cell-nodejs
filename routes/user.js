const express = require('express');
const router = express.Router();

const userController = require('../controllers/user_controller');

//singup page

router.get('/signup', userController.signup);

router.post('/create', userController.create);


module.exports = router;