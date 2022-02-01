const express = require('express');
const app = express();

module.exports = app;

const passport = require('passport');
const session = require('express-session');
const flash = require('express-flash');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
//Helper Functions import
const { getCustomerById, getCustomerByUsername } = require('./helpers');

//initialize passport
const initializePassport = require('./passport')
initializePassport(
  passport,
  getCustomerByUsername,
  getCustomerById
);

//view engine setup
app.set('view-engine', 'ejs');

app.use(express.urlencoded({ extended: false }));

app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  }))
app.use(passport.initialize())
app.use(passport.session())



//body-parser express middleware
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//base router set-up
const apiRouter = require('./routes/api');
app.use('/', apiRouter);
app.get('/', (req, res) =>{
    res.send(`Welcome to your homepage`);
});


const PORT = process.env.PORT || 4001;

app.listen(PORT, () =>console.log(`Listening on port: ${PORT}`));