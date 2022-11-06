const mongoose = require('mongoose');

//connect to database
mongoose.connect('mongodb://localhost/placement_cell');

//acquire the connection to check if the connection is established successfully
const db = mongoose.connection;

//validate if error connecting
db.on('error', console.error.bind('error in connecting to the db'));

//validate if connected successfully
db.once('open', function(){
  console.log('Successfully connected to the database');
});