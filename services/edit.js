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
            changeData = req.body;
            obj.map( (x, i) => {
                if (x.email == changeData.email) {
                    obj[i].group = changeData.group
                    let update = JSON.stringify(obj); //convert it back to json
                    fs.writeFile(fileName, update, 'utf8', (err) => {
                        if (err) {
                            console.log(err)
                        } else {
                            res.send(JSON.parse(update))
                        }
                    });
                }
            })
        }
    })
});

module.exports = router;