const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user')
const bodyParser = require('body-parser');
const config = require('./config/database');
const usersRouter = require('./routes/user');
const studentRouter = require('./routes/student');
const path = require('path');

// Create express app
const app = express();

mongoose.connect(config.database);
mongoose.connection.once('open', function(){
   console.log('connection has been made');
}).on('error',function(error){
    console.log('error is:', error);
});



app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/user', usersRouter);
app.use('/student',studentRouter );

// Set up static files
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () =>
 console.log('Listening on port 3000')
);


// app.get('', (req, res) => {
//     res.json({
//         message:'welcome',
//     });
// });
// Define routes
// app.get('/', (req, res) => {
//     res.render('index');
// });