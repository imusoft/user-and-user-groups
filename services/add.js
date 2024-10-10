const express = require("express");
const router = express.Router();
let data = []

router.post("/", (req, res) => {
    data = req.body
    return res.send("check")
});


module.exports = router;