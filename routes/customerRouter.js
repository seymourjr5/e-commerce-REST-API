const customerRouter = require('express').Router();
const pool = require('../db');

module.exports = customerRouter;

customerRouter.param('id', async (req, res, next, id) =>{
    try{
        const dbQuery = await pool.query(`SELECT * FROM customer WHERE id = ${id}`);
        if(dbQuery.rows.length === 1){
            req.id = id;
            req.customer = dbQuery.rows[0];
            next();
        }else{
            res.status(404).send('The customer id provided does not exist');
        }
    }catch(err){
        console.error(err.message);
    }
});

//get all customers
customerRouter.get('/', async (req, res) =>{
    try{
        const allCustomers = await pool.query("SELECT * FROM customer");
        res.send(allCustomers.rows);
    }catch(err){
        console.error(err.message);
    }
});

//get a single customer
customerRouter.get('/:id', async (req, res) =>{
    res.status(200).send(req.customer);
});

//update a customer 
customerRouter.put('/:id', async (req, res) =>{
    try{
        const { id, username, password, first_name, last_name, telephone } = req.body;

        const updatedCustomer = await pool.query(`UPDATE customer set username = '${username}', first_name = '${first_name}', last_name = '${last_name}', telephone = ${telephone} WHERE id = ${id}`);
        res.status(205).send();
       
    }catch(err){
        console.error(err.message);
    }
});


//delete a customer
customerRouter.delete('/:id', async (req, res) =>{
    try{
        const deleteItem = await pool.query(`DELETE FROM customer WHERE id = ${req.id}`);
        res.status(204).send();
    }catch(err){    
        console.error(err.message);
    }
});
