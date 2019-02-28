var express = require('express');
var router = express.Router();
var SpotifyWebApi = require('spotify-web-api-node');

// setting the spotify-api goes here:
var scopes = ['user-read-private', 'user-read-email']
// var redirectUri = 'http://localhost:3000/auth/spotify'

// Create the api object with the credentials
var spotifyApi = new SpotifyWebApi({
  redirectUri: 'http://localhost:3000/users/auth/spotify/redirect',
  clientSecret: 'e0be5d508c5e421cb7e470c55343a3cc',
  clientId: 'b1cfbd61a75d4b8da301272f5ae6cdc1'
});

var authorizeURL = spotifyApi.createAuthorizeURL(scopes);

router.get('/auth/spotify', (req, res) => {
  debugger
  res.redirect(authorizeURL)
  // if(req.query.code) {
  //   res.redirect('/users/auth/spotify/redirect')
  // }
})

router.get('/auth/spotify/redirect', (req, res) => {
  debugger
  spotifyApi.authorizationCodeGrant(req.query.code).then(
    function(data) {
      console.log('The token expires in ' + data.body['expires_in']);
      console.log('The access token is ' + data.body['access_token']);
      console.log('The refresh token is ' + data.body['refresh_token']);
   
      // Set the access token on the API object to use it in later calls
      spotifyApi.setAccessToken(data.body['access_token']);
      spotifyApi.setRefreshToken(data.body['refresh_token']);
      spotifyApi.getMe()
      .then(function(data) {
        debugger
        res.render('userinfo', {data})
      }) 
    },
    function(err) {
      console.log('Something went wrong!', err);
    }
  );
})

module.exports = router;
