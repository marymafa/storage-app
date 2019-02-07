var express = require('express');
var app = express();
const passport = require('passport');
const { Client } = require('pg');
const connectionString = 'postgres://postgres:TCGPC1@localhost:5432/store_products';
const client = new Client({
    connectionString: connectionString,
})
client.connect();

module.exports = app => {
    app.get('/signUpData', async (req, res, next) => {
        var unitsData = await client.query(`SELECT * FROM cunstomer`)
        res.send(unitsData.rows[0]).status(201).end();
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            if (err) {
                console.log(err);
            }
            if (info !== undefined) {
                res.send(info.message);
                console.log(info.message);
            } else {
                res.status(201).send({
                    auth: true,
                    email: user.email,
                    password: user.password,
                    message: 'user found in db'
                })
                console.log('user found in db from route');
            }
        })(req, res, next)
    })
}


