const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "superhost",
  password: "superhost",
  database: "superhost"
});
module.exports = connection;
