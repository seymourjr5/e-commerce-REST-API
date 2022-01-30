const pool = require('../db');

const productRouter = require('express').Router()

module.exports = productRouter;

productRouter.param('id', async (req, res, next, id) =>{
    try{
        const dbQuery= await pool.query(`SELECT * FROM product WHERE id = ${id}`);
        if(dbQuery.rows.length === 1){ 
            req.id = id;
            req.product = dbQuery.rows[0];
            next();
    }else{
        res.status(404).send("The id provided does not exist");
    }
    }catch(err){
        console.error(err.message);
    }
});

//get all products
productRouter.get('/', async (req, res) =>{
    try{
        const allProducts = await pool.query("SELECT * FROM product");
        res.status(200).send(allProducts.rows);
    }catch(err){
        console.error(err.message);
    }
});

//get a single product
productRouter.get('/:id',  (req, res) =>{
        res.status(200).send(req.product);
});

//Create a new product 
productRouter.post('/', async (req, res) =>{
   try{ 
       const { id, name, description, price } = req.body;
       const dbQuery = await pool.query(`SELECT id FROM product`);
       if((dbQuery.rows.find(element => element.id === id)) === undefined){
            const newProduct = await pool.query(`INSERT INTO product VALUES(${id}, '${name}', '${description}', ${price})`);
            res.status(201).send();
    }else{
            res.status(404).send("The product with the id already exists");
    }
    }catch(err){
        console.error(err.message);
    }
});

//update a product 
productRouter.put('/:id', async (req, res) =>{
    try{
        const { id, name, description, price } = req.body;
        const updatedProduct = await pool.query(`UPDATE product SET id = ${id}, name = '${name}', description = '${description}', price = ${price} WHERE id = ${id}`);
        res.status(205).send();
    }catch(err){
        console.error(err.message);
    }
});

//delete a product
productRouter.delete('/:id', async(req, res) =>{
    try{    
        const deletedProduct = await pool.query(`DELETE FROM product WHERE id = ${req.id}`);
        res.status(204).send();
    }catch(err){
        console.error(err.message);
    }
});