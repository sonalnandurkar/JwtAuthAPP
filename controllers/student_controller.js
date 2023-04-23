const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
const Student = require('../models/student');
const { response } = require('express');



//Create student in DB
const addstudent = function(req, res, next) {
    const student = new Student({
        name: req.body.name,
        email: req.body.email,
        age: req.body.age
      });
    student.save()
.then(student => {
    res.json({ msg: "Student Save Successfully", student: student })
    })
    .catch(err => {
        res.status(400);
    });
};

//Get all the student from db
const getstudents = function(req, res, next) {
    Student.find()
      .then(response => {
        res.json({ response });
      })
      .catch((error) => {
       // res.status(500).send(err);
        res.json({
          message: 'An error Occured!'
        })
      })
  }

  //Update an Student
  const updatestudent = function(req,res,next) {
    let studentId = req.body.studentId
    let updateData = {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age
    }
    Student.findByIdAndUpdate(studentId, {$set: updateData})
    .then(() => {
         res.json({
          message: 'Student Updated Successfully!'
         })
    })
    .catch(error => {
      res.json({
        message: "An error Occured!"
      })
    })
  }


  //Show single Student
  const showsinglestudent = function(req,res,next) {
    let studentId = req.body.studentId

    Student.findById(studentId)
    .then(response => {
         res.json({
           response
         })
    })
    .catch(error => {
      res.json({
        message: "An error Occured!"
      })
    })
  }



  //Delete an Student
  const deletestudent = function(req,res,next) {
    let studentId = req.body.studentId
    Student.findByIdAndRemove(studentId)
    .then(() => {
         res.json({
          message: 'Student Deleted Successfully!'
         })
    })
    .catch(error => {
      res.json({
        message: "An error Occured!"
      })
    })
  }
  




module.exports = {
    addstudent,
    getstudents,
    updatestudent,
    deletestudent,
    showsinglestudent
}



  

