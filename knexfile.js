const pg = require("pg");
const keys = require("./config/keys");
module.exports = {
  client: "pg",
  connection: keys.DB_URI
};
