const express = require('express')
const app = express()
const port = 2021
const router = require('./router')

app.use(router); // your middleware function must be above the router

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
