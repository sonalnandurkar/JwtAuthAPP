const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

//Register
const register = function(req, res, next) {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
   user.save().then(user => {
    res.json({ msg: "User Added Successfully", user: user })
    })
    .catch(err => {
        res.status(400);
    });
};

//Login
const login = function(req, res, next) {
    res.setHeader("Content-Type", "application/json");
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) return res.json('Error on the server.');
        if (!user) return res.json('No user found.');
        
        if(user)
        {
        
        var token = jwt.sign({ id: user._id }, config.secret, {
          expiresIn: 86400 // expires in 24 hours
        });
        
        res.json({ user: user, auth: true, token: token });
      }
    });
};




  module.exports = {
    register,
    login
}



