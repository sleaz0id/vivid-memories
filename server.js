// GRAB THE PACKAGES/VARIABLES WE NEED
// ==================================================
var express = require('express');
var app     = express();
var ig      = require('instagram-node').instagram();

// CONFIGURE THE APP
// ==================================================
// tell node where to look for sire resoures
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

// set the view engine to ejs
app.set('view engine', 'ejs');

// configure instagram app with client-id
ig.use({
  client_id: 'b6431977aa074e5b85f698b334071dc8',
  client_secret: '9b99fc7910994c44b8c957fc48a89324'
});

// SET THE ROUTES
// ==================================================
// home page route - popular images

app.get('/', function(req, res) {

	// use the instagram package to get popular media
	ig.media_popular(function(err, medias, remaining, limit) {
	// render the home page and pass in the popular images
		res.render('pages/index', { grams: medias });
	});

});

// START THE SERVER
// ==================================================
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
