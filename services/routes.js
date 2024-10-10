const express = require("express");
const helmet = require('helmet');
const log = require("./log");

const get = require("./get")
const add = require("./add");
const edit = require("./edit");
const del = require("./delete");

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
  app.use("/get", get);
  app.use("/add", add);
  app.use("/edit", edit);
  app.use("/delete", del);
};