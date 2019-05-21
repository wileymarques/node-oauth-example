const express = require('express');
const fetch = require('node-fetch');

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

    const method = 'POST';
    const url = `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`;
    const headers = {
        accept: 'application/json',
    };

    fetch(url, {
        method,
        headers,
    })
        .then(response => response.json())
        .then(response => {
            // Once we get the response, extract the access token from
            // the response body
            const accessToken = response.access_token;
            // redirect the user to the welcome page, along with the access token
            res.redirect(`/welcome.html?access_token=${accessToken}`);
        })
        .catch(error => {
            console.error(error);
        });
});

app.use(express.static(__dirname + '/public'));
app.listen(8080);
