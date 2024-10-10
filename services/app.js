const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;
  
require("./routes")(app);

app.disable('x-powered-by'); //Remove X-Powered-By: Express header
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));