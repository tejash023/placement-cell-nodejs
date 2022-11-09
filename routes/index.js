const express = require('express');
const router = express.Router();
const passport = require('passport');
const homeController = require('../controllers/home_controller');

//to be deleted
console.log('router loaded');

router.use('/', require('./user'));
router.use('/student', require('./student'));
router.use('/interview', require('./interview'));



module.exports = router;
