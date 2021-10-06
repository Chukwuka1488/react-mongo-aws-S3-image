const express = require('express');
const cors = require('cors');
const path = require('path');

// Importing DotEnv package for Environmental variables.
const dotenv = require('dotenv');
const app = express();

const userRouter = require('./routes/userRoutes');

// environment variable
// setting up environment variables from ./config.env file.
dotenv.config({ path: path.join(__dirname, 'config.env') });

/**
 * Note: this should be below the dotEnv file else there is an undefined uri
 */
// Connect to Database.
require('./database/db');

// middleware
app.use(cors());
app.use(express.json());

//localhost:9000/api/users/setProfilePic
app.use('api/users', userRouter);

app.get('/', (req, res) =>
  res.json({ success: true, message: 'server is running' })
);

app.listen(9000, () => console.log('listening on port 9000'));
