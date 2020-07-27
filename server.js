const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
require('dotenv').config();

/** Create Server */
const app = express();
const port = process.env.PORT || 8000;
const serverAudience = app.get('env') === 'production' ? 'deployed url' : 'http://localhost:8000';

/** Middleware */
app.use(cors());
app.use(express.json());

/** Connect to MongoDB */
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, 
                        useCreateIndex: true,
                        useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully.');
});

/** Parse JWT formatted access tokens */
const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev-lkenkzaj.us.auth0.com/.well-known/jwks.json'
    }), 
    audience: `${serverAudience}`,
    issuer: 'https://dev-lkenkzaj.us.auth0.com/',
    algorithms: ['RS256']
});

/** Serve static assets if in production  */
if (app.get('env') === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

/** Routes */
const coursesRoute = require('./routes/courses');
app.use('/api/courses', coursesRoute);

app.listen(port, () => console.log(`Server is running on port ${port}`));