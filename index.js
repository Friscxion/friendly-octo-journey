const express = require('express')
const app = express()
const port = 2021
const router = require('./router')
const bodyParser = require("body-parser");

app.use(bodyParser.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(router); // your middleware function must be above the router

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
