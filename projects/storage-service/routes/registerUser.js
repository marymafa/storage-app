const passport = require('passport');
var express = require('express');
var app = express();
var salt = 10;
const jwt = require("jwt-simple");
const bcrypt = require('bcrypt');
const connectionString = 'postgres://postgres:TCGPC1@localhost:5432/store_products';
const { Client } = require('pg');
const client = new Client({
    connectionString: connectionString,
})
client.connect();
module.exports = app => {
    app.post('/signUpData', async (req, res) => {
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);
        console.log("thi is the hashed password", hashedPassword)
        client.query('INSERT INTO  customer(username,email,password) VALUES($1,$2,$3)',
            [req.body.username, req.body.email, hashedPassword], (err, res) => { });
        const customer = await client.query('SELECT *  FROM customer WHERE id=id').then(users => {
            return users.rows[0];
            console.log("this is my users", users.rows[0].password)
        })
        const token = jwt.encode(customer, 'jwt-secret');
        console.log('this is the token', token);
        res.json(token);
    })
}




