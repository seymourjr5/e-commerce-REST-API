const pool = require('../db');

const registerRouter = require('express').Router();

module.exports = registerRouter;

//error when using form (Error: data and salt arguments required)
registerRouter.post('/', async (req, res) =>{
    try{
        const { id, username, password, first_name, last_name, telephone } = req.body;
        const dbQuery = await pool.query(`SELECT * FROM customer`);
        if((dbQuery.rows.find(element => element.id === id)) === undefined){
            await pool.query(`INSERT INTO customer VALUES(${id}, '${username}', '${password}', '${first_name}', '${last_name}', ${telephone})`);
            res.status(201).send();
        }else{
            res.status(404).send("The product with the id already exists");
        }

    }catch(err){
        console.error(err.message);
    }
});
