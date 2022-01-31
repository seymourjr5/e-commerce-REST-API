const express = require('express');
const app = express();

module.exports = app;

const passport = require('passport');
const session = require('express-session');
const flash = require('express-flash');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}



//body-parser express middleware
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//base router set-up
const apiRouter = require('./routes/api');
app.use('/', apiRouter);

//Helper Functions 
const getCustomerByUsername = async (username) =>{
    try{
    const dbQuery = await pool.query(`SELECT * FROM customer WHERE username = '${username}'`);
    return dbQuery.rows[0];
    }catch(err){
        console.error(err.message);
    }
}

const getCustomerById = async (id) =>{
    try{
        const dbQuery = await pool.query(`SELECT * FROM customer WHERE id = ${id}`);
        return dbQuery.rows[0];
    }catch(err){
        console.error(err.message);
    }
}

//initialize passport
const initializePassport = require('./passport')
initializePassport(
  passport,
  getCustomerByUsername,
  getCustomerById
);

app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  }))
app.use(passport.initialize())
app.use(passport.session())





const PORT = process.env.PORT || 4001;

app.listen(PORT, () =>console.log(`Listening on port: ${PORT}`));