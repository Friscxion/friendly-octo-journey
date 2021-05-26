const express = require("express");
const fs = require('fs').promises;
const router = express.Router();

let _LOCK_ = false;
let status = "open";

router.get('/open', (req, res) => {
    const {exec} = require('child_process');
    if(_LOCK_) return res.send("denied");
    _LOCK_ = true
    status="open";
    exec('python3 ./open.py', (err, stdout, stderr) => {
            if (err) console.error(`exec error: ${err}`);
            _LOCK_ = false;
        }
    );
    res.send("ok")
})

router.get('/close', (req, res) => {
    const {exec} = require('child_process');
    if(_LOCK_) return res.send("denied");
    _LOCK_ = true
    status="closed"
    exec('python3 ./close.py', (err, stdout, stderr) => {
            if (err) console.error(`exec error: ${err}`);
            _LOCK_ = false;
        }
    );
    res.send("ok");
})

router.get('/pending', (req, res) => {
    if(_LOCK_) return res.send("denied");
    res.send("ok")
})

router.get('/status', (req, res) => {
    res.send(status)
})

router.get('/sunrise_sunset', (req, res) => {
    const today = require("./today").get();
    res.send(today)
})

router.get('/params', (req, res) => {
    fs.readFile('params.json').then(resp=>res.send(JSON.parse(resp.toString())))
})

router.post('/params', (req, res) => {
    fs.writeFile('params.json',req.body).then(res=>console.log(res))
})


module.exports=router;
