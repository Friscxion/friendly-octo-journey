const express = require("express");
const router = express.Router();

let _LOCK_ = false;

router.get('/open', (req, res) => {
    const {exec} = require('child_process');
    if(_LOCK_) return res.send("nop");
    _LOCK_ = true

    exec('python3 ./open.py', (err, stdout, stderr) => {
            if (err) console.error(`exec error: ${err}`);
            _LOCK_ = false;
        }
    );
    res.send("ok")
})

router.get('/close', (req, res) => {
    const {exec} = require('child_process');
    if(_LOCK_) return res.send("nop");
    _LOCK_ = true

    exec('python3 ./close.py', (err, stdout, stderr) => {
            if (err) console.error(`exec error: ${err}`);
            _LOCK_ = false;
        }
    );
    res.send("ok");
})

router.get('/pending', (req, res) => {
    if(_LOCK_) return res.send("nop");
    res.send("ok")
})

module.exports=router;
