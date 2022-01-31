const passport = require('passport');

const loginRouter = require('express').Router();

module.exports = loginRouter;

loginRouter.post('/', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }));

/*LOGIN LOGIC WITHOUT PASSPORT.js MIDDLEWARE
loginRouter.post('/', async (req, res) =>{
    try{
    const { username, password } = req.body;
    const dbQuery = await pool.query(`SELECT * FROM customer WHERE username = '${username}'`);
    if(dbQuery.rows.length > 1){
        res.status(404).send('The username provided does not exist');
    }else if(dbQuery.rows[0].username === username && dbQuery.rows[0].password === password){
        res.send('Login successful');
    }else{
        res.send('Incorrect username or password');
    }
    }catch(err){
        console.error(err.message);
    }
});
*/