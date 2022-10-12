const { urlencoded } = require('express');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8080;
const expressLayouts  = require('express-ejs-layouts');

app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'));
app.use(expressLayouts);
app.use('/uploads', express.static(__dirname + '/uploads'));

//extract styles and scripts from layouts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//setting view engines as ejs
app.set('view engine', 'ejs');
app.set('views', './views');



//use express router
app.use('/', require('./routes'));

//starting the server
app.listen(port, function(err){
  if(err){
    console.log('Error connecting to the server');
  }
  console.log(`Server is successfully running on port ${port}`);
})