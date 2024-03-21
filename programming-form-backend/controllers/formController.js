const asynchandle = require('express-async-handler');
const Form = require('../models/submissionModel');
const conn = Form();
const moment = require('moment-timezone');
const redis = require('redis');
const redisClient = require('../App');
const express = require('express');
const { get } = require('http');
const app = express();
// import getSubmissionResponse from '../services/judge0/index';
// import getResToken from '../services/judge0/index';
const getSubmissionResponse = require('../services/judge0/index').getSubmissionResponse;
const getResToken = require('../services/judge0/index').getResToken;
const submitForm = async (req, res) => {
    try{
    const { name, language, input, code } = req.body;
    const langcodemap={
        "c_pp":52,
        "javascript":93,
        "java":71,
        "python":92
    };
    if (!name || !language || !code) {
        res.status(400);
        throw new Error('Please fill all fields');
    }
    const utcTime = moment.utc();
    const istTime = utcTime.tz('Asia/Kolkata');
    // console.log(istTime.format('YYYY-MM-DD HH:mm:ss'));
    const langcode = langcodemap[language];
    if(!langcode){
        return res.status(400).json({ message: 'Invalid language' });
    }
    const resToken = await getResToken(code,langcode, input);
    console.log(resToken);
    await new Promise(r => setTimeout(r, 2000));
    const submissionResponse = await getSubmissionResponse(resToken);
    const sql = `INSERT INTO submittedform4 (name, language, input, code, created_at, SubmissionToken, SubmissionResponse) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    //cache layer
    const promise = new Promise((resolve, reject) => {

    conn.query(sql, [name, language, input, code, istTime.format('YYYY-MM-DD HH:mm:ss'),resToken.toString(), JSON.stringify(submissionResponse)   ], (err, result) => {
        if (err) {
            console.log(err);reject(err);

        }
        console.log("Set data to database");
        resolve(result);
    });
});
    await promise;
    //delete cache
    await redisClient.del("request", redis.print);
    console.log("Deleted cache");
    return res.status(200).json({ message: 'Form submitted successfully', submissionResponse,resToken });
}
catch (e) {
    console.log(e);
    return res.status(500).json({ message: 'Server Error' });
}
};

const cacheMiddleware = async (req, res, next) => {
    try {


        console.log("Middleware");
        console.log(redisClient);
        const isCached = await redisClient.get("request");
        if (isCached !== null) {
            console.log("Got data from cache");
            res.status(200).json(JSON.parse(isCached));
        } else {
            console.log("Retrieving from database");
            next();
        }
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Server Error' });
    }
}


const getForms = async (req, res) => {

    try {
        const sql = `SELECT name, language, input, code, SubmissionResponse, created_at FROM ${process.env.DB_TABLE}  `;
        conn.query(sql, async (err, result) => {
            if (err) {
                res.status(500);
                throw new Error('Error fetching forms');
            }
            //set data json to cache
            console.log("Setting data to cache");
            // console.log(result);
            // console.log(JSON.stringify(result));
            await redisClient.set("request", JSON.stringify(result), redis.print);
            res.status(200).json(result);
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Server Error' });
    }
}



module.exports = { cacheMiddleware, submitForm, getForms };