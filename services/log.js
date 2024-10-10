const logger = require("./logger");

function log(req, res, next) {
  if (req.originalUrl != "/")
    logger.info("A new request for " + req.originalUrl);
  next();
}

module.exports = log;
