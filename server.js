const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');

//Load env vars
dotenv.config({ path: './config/config.env'});

//Connect to database
connectDB();


const app = express();

//Routes
const hospitals = require('./routes/hospitals');
const auth = require('./routes/auth');

app.use(express.json());
app.use(cookieParser());
app.use('/api/v1/hospitals', hospitals);
app.use('/api/v1/auth/', auth);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log('server running in ', process.env.NODE_ENV, ' mode on port ', PORT));

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1));
});
