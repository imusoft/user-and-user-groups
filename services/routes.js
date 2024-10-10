const express = require("express");
const helmet = require('helmet');

const add = require("./add")
const log = require("./log")

module.exports = function (app) {
  app.use(log);
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
  });

  app.use(helmet.frameguard({ action: 'DENY' }));
  app.use(helmet.noSniff());
  app.use(helmet.referrerPolicy());
  app.use(helmet.hsts({maxAge: 31536000}));
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Methods", "");
    if (req.method === "OPTIONS") res.sendStatus(200);
    else next();
  })

  app.use(express.json({ limit: "50mb" })); //100kb by default
  app.use("/add", add);
};