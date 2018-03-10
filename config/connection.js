var mysql = require("mysql");
// require("dotenv").config();

var connection = mysql.createConnection(
  process.env.DATABASE_URL
  // {
  // port: 3306,
  // host: "localhost",
  // user: "root",
  // password: "root",
  // host: process.env.DATABASE_URL,
  // user: process.env.DATABASE_URL,
  // password: process.env.DATABASE_URL,
  // database: "pizza_db"
  // socketPath: "/var/run/mysqld/mysqld.sock"
// }
);

// Make connection.
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Export connection for our ORM to use.
module.exports = connection;
