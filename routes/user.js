const express = require('express');
const router = express.Router();
const passport = require('passport');

const {downloadCSVReport} = require('../controllers/csv_controller');
const userController = require('../controllers/user_controller');
const homeController = require('../controllers/home_controller');


router.get('/profile', passport.checkAuthentication, userController.profile);
router.post('/update', passport.checkAuthentication, userController.update);

router.get('/', userController.signin);
router.get('/sign-up', userController.signup);
router.get('/dashboard', homeController.homepage);

router.post('/create', userController.create);

//use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
  'local',
  {failureRedirect : '/login'},
) ,userController.createSession);


router.get('/sign-out', userController.destroySession);

router.get("/download", downloadCSVReport);

module.exports = router;