const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = new express();
const port = 5678;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/spotify_access_token', (req, res, next) => {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_SECRET;

  // We need, annoyingly, a base64-encoded string of our id:secret, for spotify.
  // We can use Buffers to do this for us.
  const authString = Buffer.from(clientId + ':' + clientSecret).toString(
    'base64'
  );

  // TODO: use authString in a request to Spotify!
  res.send({access_token :  process.env.SPOTIFY_OATH});//I took the tokenId generated in https://developer.spotify.com/console/get-artist/?id=0OdUWJ0sBjDrqHygGUXeCF
});

app.listen(port, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info(`==> 🌎  Listening on port ${port}.`);
  }
});
