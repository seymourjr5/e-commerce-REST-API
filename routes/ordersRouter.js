const pool = require('../db');

const ordersRouter = require('express').Router();

module.exports = ordersRouter;

ordersRouter.param('id', async (req, res, next, id) =>{
    try{
        const dbQuery = await pool.query(`SELECT * FROM orders WHERE id = ${id}`);
        if(dbQuery.rows.length === 1){
            req.id = id;
            req.order = dbQuery.rows[0];
            next();
        }else{
            res.status(404).send('The order id provided does not exist');
        }
    }catch(err){
        console.error(err.message);
    }
});

//get all orders
ordersRouter.get('/', async (req, res) =>{
    try{
        const allOrders = await pool.query("SELECT * FROM orders");
        res.status(200).send(allOrders.rows);
    }catch(err){
        console.error(err.message);
    }
});

//get a single order
ordersRouter.get('/:id',  (req, res) =>{
        res.status(200).send(req.order);
});

//Create a new order 
ordersRouter.post('/', async (req, res) =>{
   try{ 
       const { id, cart_id } = req.body;
       const dbQuery = await pool.query(`SELECT id FROM orders`);
       if((dbQuery.rows.find(element => element.id === id)) === undefined){
            const newOrder = await pool.query(`INSERT INTO orders VALUES(${id}, ${cart_id})`);
            res.status(201).send();
    }else{
            res.status(404).send("The order with the id already exists");
    }
    }catch(err){
        console.error(err.message);
    }
});

//update a product 
ordersRouter.put('/:id', async (req, res) =>{
    try{
        const { id, cart_id } = req.body;
        const updatedOrder = await pool.query(`UPDATE orders SET id = ${id}, cart_id = ${cart_id} WHERE id = ${req.id}`);
        res.status(205).send();
    }catch(err){
        console.error(err.message);
    }
});

//delete an order
ordersRouter.delete('/:id', async(req, res) =>{
    try{    
        const deletedOrder = await pool.query(`DELETE FROM orders WHERE id = ${req.id}`);
        res.status(204).send();
    }catch(err){
        console.error(err.message);
    }
});