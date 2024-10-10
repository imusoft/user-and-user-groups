const express = require("express");
const router = express.Router();
const fs = require('fs');

const fileName = './data.json';

router.post("/", (req, res) => {
    let addData = JSON.stringify(req.body)
    console.log(addData)
    fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) {
            console.log(err)
        } else {
            let obj = data ? JSON.parse(data) : [];
            obj.push(JSON.parse(addData))
            fs.writeFile(fileName, JSON.stringify(obj), err => {
                if (err) {
                    console.log(err)
                } else {
                    res.send(JSON.stringify(obj))
                }
            })
        }
    })
    // fs.writeFile(fileName, data, err => {
    //     if (err) {
    //         console.log(err)
    //     } else {
    //         res.send("data added")
    //     }
    // })
});


module.exports = router;