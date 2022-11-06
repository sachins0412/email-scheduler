const app = require("./app");

const connect = require("./db/connect");

const PORT = process.env.PORT || 3000;

connect();

app.listen(PORT, () => console.log("server listening on port ", PORT));
