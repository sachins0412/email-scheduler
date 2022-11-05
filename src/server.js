const app = require("./app");

const connect = require("./db/connect");

connect();

app.listen(3000);
