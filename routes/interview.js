const express = require('express');
const router = express.Router();

const interviewController = require('../controllers/interviews_controller');
const { route } = require('./user');

router.get('/add-interview', interviewController.addInterview);

router.post('/create', interviewController.create);

router.post('/enroll-in-interview/:id', interviewController.enrollInInterview);

//delete interview
router.get('/destroy/:interviewId/', interviewController.deleteInterview);

router.get('/deallocate/:studentId/:interviewId', interviewController.deallocate);

module.exports = router;