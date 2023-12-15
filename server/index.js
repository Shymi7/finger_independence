const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {password, dbConnectionString} = require("./config");
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(dbConnectionString, {useNewUrlParser: true, useUnifiedTopology: true});

app.use(cors());

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/score', require('./routes/score')); // Add this line


// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});