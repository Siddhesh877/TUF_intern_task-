// const { DataTypes } = require('sequelize');
const conn = require('../config/db'); 
const mysql = require('mysql');
require('dotenv').config();
// Define the model schema
// const FormModel = sequelize.define('submittedform', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true
//   },
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   language: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   input: {
//     type: DataTypes.TEXT,
//     allowNull: false
//   },
//   code: {
//     type: DataTypes.TEXT,
//     allowNull: false
//   }
// }, {
//   timestamps: true
// });

// Sync the model with the database (optional, if not using migrations)
// FormModel.sync();
const FormModel= () =>{
  const connection = conn();
  const useDB = `USE ${process.env.DB_USER}`;
  connection.query(useDB, (err, results, fields) => {
    if (err) {
      console.log(err.message);
    }
  });
  const createUserTable = `CREATE TABLE IF NOT EXISTS ${process.env.DB_TABLE}(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    language VARCHAR(100) NOT NULL,
    input TEXT NOT NULL,
    code TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL,
    SubmissionToken TEXT,
    SubmissionResponse TEXT
  
  )`;
  connection.query(createUserTable, (err, results, fields) => {
    if (err) {
      console.log(err.message);
    }
  });
  return connection;
}



// Export the model for use in other parts of the application
module.exports = FormModel;
