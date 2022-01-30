const pool = require('../db');
const customerRouter = require('./customerRouter');

const cartRouter = require('express').Router();

module.exports = cartRouter;

cartRouter.param('id', async (req, res, next, id) =>{
    try{
        const dbQuery = await pool.query(`SELECT * FROM cart WHERE id = ${id}`);
        if(dbQuery.rows.length === 1){
            req.id = id;
            req.cart = dbQuery.rows[0];
            next();
        }else{
            res.status(404).send('The cart id provided does not exist');
        }
    }catch(err){
        console.error(err.message);
    }
});

//Get all carts 
cartRouter.get('/', async (req, res) =>{
    try{
        const dbQuery = await pool.query(`SELECT * FROM cart`);
    res.status(200).send(dbQuery.rows);
    }catch(err){
        console.error(err.message);
    }   
});

//Get cart by id
cartRouter.get('/:id', (req, res) =>{
        res.send(req.cart);
});

//update cart by id
cartRouter.put('/:id', async (req, res) =>{
    try{
        const { id, customer_id, product_id, quantity } = req.body;
        const updateCustomerCart = await pool.query(`UPDATE cart SET id = ${id}, customer_id = ${customer_id}, product_id = ${product_id}, quantity = ${quantity} WHERE id = ${req.id}`);
        res.status(205).send();
    }catch(err){
        console.error(err.message);
    }
});

//Create a cart 
cartRouter.post('/', async (req, res) =>{
    try{
       const { id, customer_id, product_id, quantity } = req.body;
       const dbQuery = await pool.query(`SELECT * FROM cart`);
       if((dbQuery.rows.find(element => element.id === id)) === undefined){
           const newCustomerCart = await pool.query(`INSERT INTO cart VALUES (${id}, ${customer_id}, ${product_id}, ${quantity})`);
           res.status(201).send()
        }else{
            res.status(404).send("The cart id already exists");
        }

    }catch(err){
        console.error(err.message);
    }
});

//delete a users cart
cartRouter.delete('/:id', async (req, res) =>{
    try{
        const deleteCart = await pool.query(`DELETE FROM cart WHERE id = ${req.id}`);
        res.status(204).send();
    }catch(err){
        console.error(err.message);
    }
});

//create an order (CHECKOUT!)
cartRouter.post('/:id/checkout', (req, res)=>{
    const didPaymentGoThrough = Boolean(Math.round(Math.random())); //randomly selects as we cannot charge anyone yet
    if(didPaymentGoThrough){
        res.send("Payment Successful!!,Your order will arrive soon");
    }else{
        res.send("Your payment was rejected");
    }
});