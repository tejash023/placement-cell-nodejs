const { urlencoded } = require('express');
const express = require('express');
const env = require('./config/environment');
const logger = require('morgan');

const cookieParser = require('cookie-parser');
const app = express();
require('./config/view-helpers')(app);
const port = 8080;

const expressLayouts  = require('express-ejs-layouts');
const db = require('./config/mongoose');
const sassMiddleware = require('node-sass-middleware');
const User = require('./models/user');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const customMware = require('./config/middleware');
const path = require('path');

//middleware to use assets

//sass needs not be run everytime in prod
if(env.name == 'development'){
  app.use(
    sassMiddleware({
    src: path.join(__dirname, env.asset_path, 'scss'),
    dest: path.join(__dirname, env.asset_path, 'css'),
    debug: true,
    outputStyle: 'extended',
    prefix:  '/css' ,
    }
  ));
}
app.use(express.static(env.asset_path));
app.use(express.urlencoded());
app.use(cookieParser());
app.use(expressLayouts);

app.use(logger(env.morgan.mode, env.morgan.options));

//extract styles and scripts from layouts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//setting view engines as ejs
app.set('view engine', 'ejs');
app.set('views', './views');

//mongo store is used to store a session cookie
app.use(session({
  name: 'placement_cell',
  secret: env.session_cookie_key,
  saveUninitialized: false,
  resave: false,
  store: MongoStore.create({
    mongoUrl:'mongodb://localhost/placement_cell',
  }),
  cookie: {
    maxAge: (1000 * 60 * 100)
  },

}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

//use express router
app.use('/', require('./routes'));

//starting the server
app.listen(port, function(err){
  if(err){
    console.log('Error connecting to the server');
  }
  console.log(`Server is successfully running on port ${port}`);
})