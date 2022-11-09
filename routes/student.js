const express = require('express');
const router = express.Router();

const studentController = require('../controllers/students_controller');

router.post('/update/:id', studentController.update);

router.get('/add-student', studentController.addStudent);
router.get('/edit-student/:id', studentController.editStudent);

router.post('/create', studentController.create);
router.get('/destoy/:studentId', studentController.destroy);

module.exports = router;