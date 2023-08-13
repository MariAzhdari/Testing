const express = require("express");
const app = express();
const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "Mars.1994",
  port: 5432,
  database: "jwttutorial",
});

pool.query("SELECT * from users", (err, res) => {
  console.log(err, res);
  pool.end();
});


app.listen(8800, () => {
  console.log("Server is running on port 3000");
});
