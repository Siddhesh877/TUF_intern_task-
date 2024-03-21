const express = require('express');
const bodyParser = require('body-parser');
// const connectDB = require('./config/db');
const errorHandler = require('./Middleware/errorHandler');
const table = require('./models/submissionModel');
const cors = require('cors');


const app = express();
const port = 3001;
// connectDB();
table();

app.use(cors({
  origin: 'http://localhost:3000'
}));


// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/form', require('./routes/formRoutes'));

app.use(errorHandler);

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
