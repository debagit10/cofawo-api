const POOL = require("pg").Pool;
require("dotenv").config();

const pool = new POOL({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
});

pool.connect((err) => {
  if (err) throw err;
  console.log("Connect to PostgreSQL successfully");
});

module.exports = pool;
