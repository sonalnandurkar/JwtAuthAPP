const express = require('express');
const route = express.Router();
const student_controller = require('../controllers/student_controller');


route.post('/addstudent', student_controller.addstudent)
route.get('/getstudents', student_controller.getstudents)
route.post('/showsinglestudent', student_controller.showsinglestudent)
route.post('/updatestudent',student_controller.updatestudent)
route.post('/deletestudent',student_controller.deletestudent)


module.exports = route