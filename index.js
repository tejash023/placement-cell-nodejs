const express = require('express');
const app = express();
const port = 8080;

//use express router
app.use('/', require('./routes'));

//starting the server
app.listen(port, function(err){
  if(err){
    console.log('Error connecting to the server');
  }
  console.log(`Server is successfully running on port ${port}`);
})