const express = require("express");
const router = express.Router();
const fs = require('fs');

const fileName = './data.json';

router.post("/", (req, res) => {
    fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) {
            console.log(err)
        } else {
            if (data && data.length) {
                return res.send(data)
            }
        }
    })
});


module.exports = router;