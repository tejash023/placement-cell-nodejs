const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');

//to be deleted
console.log('router loaded');



router.get('/', homeController.home);

router.use('/user', require('./user'));



module.exports = router;
