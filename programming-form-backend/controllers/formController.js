const asynchandle = require('express-async-handler');
const Form = require('../models/submissionModel');
const conn = Form();
const moment = require('moment-timezone');

const submitForm = asynchandle(async (req, res) => {
  const { name, language, input, code } = req.body;
    if(!name || !language || !code){
        res.status(400);
        throw new Error('Please fill all fields');
    }
    const utcTime = moment.utc();
    const istTime = utcTime.tz('Asia/Kolkata');
    console.log(istTime.format('YYYY-MM-DD HH:mm:ss'));
    const sql = `INSERT INTO submittedform3 (name, language, input, code, created_at) VALUES (?, ?, ?, ?, ?)`;
    conn.query(sql, [name, language, input, code,istTime.format('YYYY-MM-DD HH:mm:ss')], (err, result) => {
        if(err){
            res.status(500);
            console.log(err);
            throw new Error('Error submitting form');
        }
        res.status(201).json({message: 'Form submitted successfully'});
    });
    console.log(result);
});

const getForms = asynchandle(async (req, res) => {
    const sql = `SELECT * FROM submittedform3`;
    conn.query(sql, (err, result) => {
        if(err){
            res.status(500);
            throw new Error('Error fetching forms');
        }
        res.status(200).json(result);
        // console.log(result);
    });
});

module.exports = { submitForm, getForms };