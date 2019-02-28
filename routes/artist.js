var express = require('express');
var router = express.Router();
var SpotifyWebApi = require('spotify-web-api-node');

// setting the spotify-api goes here:
var clientId = 'b1cfbd61a75d4b8da301272f5ae6cdc1',
    clientSecret = 'e0be5d508c5e421cb7e470c55343a3cc';

// Create the api object with the credentials
var spotifyApi = new SpotifyWebApi({
    clientId: clientId,
    clientSecret: clientSecret
});

// Retrieve an access token.
spotifyApi.clientCredentialsGrant().then(
    function (data) {
        console.log('The access token expires in ' + data.body['expires_in']);
        console.log('The access token is ' + data.body['access_token']);

        // Save the access token so that it's used in future calls
        spotifyApi.setAccessToken(data.body['access_token']);
    },
    function (err) {
        console.log('Something went wrong when retrieving an access token', err);
    }
);

router.get('/:id', (req, res, next) => {
// Get Artists albums
spotifyApi.getAlbumTracks(req.params.id, { limit : 5, offset : 1 }).then(
    function(data) {
      res.render('albumtracks', {data: data.body})
    },
    function(err) {
      console.error(err);
    }
  );
})


module.exports = router;