const express = require("express");
const router = express.Router();
const fs = require('fs');

const fileName = './data.json';

router.post("/", (req, res) => {
    fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) {
            console.log(err)
        } else {
            let obj = data ? JSON.parse(data) : []
            deleteData = req.body;
            tempdata = []
            obj.map( (x, i) => {
                if (x.email != deleteData.email) {
                    tempdata.push(x)
                }
            })
            let update = JSON.stringify(tempdata); //convert it back to json
            fs.writeFile(fileName, update, 'utf8', (err) => {
                if (err) {
                    console.log(err)
                } else {
                    res.send(JSON.parse(update))
                }
            });
        }
    })
});


module.exports = router;