const asynchandle = require('express-async-handler');
const Form = require('../models/submissionModel');
const conn = require('../config/db');

const submitForm = asynchandle(async (req, res) => {
  const { name, language, input, code } = req.body;
    if(!name || !language || !input || !code){
        res.status(400);
        throw new Error('Please fill all fields');
    }
    const sql = `INSERT INTO submittedform (name, language, input, code) VALUES (?, ?, ?, ?)`;
    conn.query(sql, [name, language, input, code], (err, result) => {
        if(err){
            res.status(500);
            throw new Error('Error submitting form');
        }
        res.status(201).json({message: 'Form submitted successfully'});
    });
    conn.end();
});

const getForms = asynchandle(async (req, res) => {
    const sql = `SELECT * FROM submittedform`;
    conn.query(sql, (err, result) => {
        if(err){
            res.status(500);
            throw new Error('Error fetching forms');
        }
        res.status(200).json(result);
    });
    conn.end();
});

module.exports = { submitForm, getForms };