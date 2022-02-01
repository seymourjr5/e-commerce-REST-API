const pool = require('./db');

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

module.exports = { getCustomerById, getCustomerByUsername };