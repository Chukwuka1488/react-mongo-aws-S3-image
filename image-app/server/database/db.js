
// Establish Database connection
const mongoose = require('mongoose');


const mongoURI = process.env.MONGODB_URI;


// Connect to MongoDB.
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const conn = mongoose.connection;

// If something goes wrong then log the connection Error
const connectionError = conn.on('error', () =>
  console.log('MongoDB connection failed.')
);

// If everything works fine then log Connected Successfully
const connected = conn.once('open', () =>
  console.log('MongoDB connected successfully.')
);

module.exports = { connectionError, connected };
