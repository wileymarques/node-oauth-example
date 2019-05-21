const express = require('express');

// Import the axios library, to make HTTP requests
const axios = require('axios');

// This is the client ID and client secret that you obtained
// while registering the application
const clientID = '18f79e70d33f78613d8b';
const clientSecret = '01a63be62fda84fa30cf5e5778f0a3c6e7b30757';

const app = express();

// Declare the redirect route
app.get('/oauth/redirect', (req, res) => {
    // The req.query object has the query params that
    // were sent to this route. We want the `code` param
    const requestToken = req.query.code;
    axios({
        // make a POST request
        method: 'post',
        // to the Github authentication API, with the client ID, client secret
        // and request token
        url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
        // Set the content type header, so that we get the response in JSOn
        headers: {
            accept: 'application/json',
        },
    }).then(response => {
        // Once we get the response, extract the access token from
        // the response body
        const accessToken = response.data.access_token;
        // redirect the user to the welcome page, along with the access token
        res.redirect(`/welcome.html?access_token=${accessToken}`);
    });
});

app.use(express.static(__dirname + '/public'));
app.listen(8080);
