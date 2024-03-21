const mysql = require('mysql');
require('dotenv').config();
const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = require('../.env');

const connectDB = () => {
const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

conn.connect((err) => {
  if (err) {
    console.log('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to the database as id ' + conn.threadId);
})
process.on('exit', () => {
  conn.end();
});
  return conn;
};
module.exports = connectDB;
