const express = require('express');
const bodyParser = require('body-parser');
// const connectDB = require('./config/db');
const errorHandler = require('./Middleware/errorHandler');
const table = require('./models/submissionModel');
const cors = require('cors');
const cron = require('node-cron');
const redis = require('redis');
require('dotenv').config();

const app = express();
const port = process.env.PORT||3001;
table();

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.get("/healthCheck", (req, res) => {
  res.send("Hello World");
});
// TODO: Add your backend URL here
const backendUrl=process.env.BACKEND_URL;
cron.schedule("*/180 * * * * *", async function () {
  console.log("Restarting server");

  await https
    .get(backendUrl, (res) => {
      if (res.statusCode === 200) {
        console.log("Restarted");
      } else {
        console.error(`failed to restart with status code: ${res.statusCode}`);
      }
    })
    .on("error", (err) => {
      console.log("hi");
      console.error("Error ", err.message);
    });
});

const allowedOrigins = ['http://localhost:3000','https://tuf-intern-task-five.vercel.app'];
app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin 
    // (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));


// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


let redisClient;
(async () => {
  redisClient = redis.createClient({
    url: process.env.REDIS_URL,
  }); 

  redisClient.on("error", (error) => {
    console.error(error);
  });
  await redisClient.connect();
  console.log("Connected to Redis");
})();
module.exports = redisClient;

// Routes
app.use('/api/form', require('./routes/formRoutes'));

app.use(errorHandler);

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


