const passport = require('passport');
const jwtSecrete = require('./jwtConfig');
var express = require('express');
var app = express();
const jwt = require("jwt-simple");
const connectionString = 'postgres://postgres:TCGPC1@localhost:5432/store_products';
const { Client } = require('pg');
const bcrypt = require('bcrypt');

const client = new Client({
    connectionString: connectionString,
})
client.connect();

module.exports = app => {
    app.post('/loginData', async (req, res, next) => {
        const { password, email } = req.body;
        console.log("email", password, email)
        const statement = `select * from customer WHERE email = $1`;
        const userFound = await client.query(statement, [email]);
        if (userFound.rows[0] == undefined) {
            return res.status(404).json({ message: "user not found" });
        }
        try {
            const user = await bcrypt.compare(password, userFound.rows[0].password);
            if (!user) {
                return res.status(404).json({ message: "password is incorrect" });
            }
            const token = jwt.encode(userFound.rows[0], 'jwt-secret');
            return res.json({ user, token });

        } catch (e) {
            console.log(e);
        }


    })

}

