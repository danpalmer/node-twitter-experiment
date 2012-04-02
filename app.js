var twitter = require('ntwitter');
var express = require('express');
var app = express.createServer();
var io = require('socket.io').listen(app);

// Set up application and resource serving
var port = process.env.PORT || 3000
app.listen(port, function () {
  console.log('listning on port: ' + port);
});
app.use('/public', express.static(__dirname + '/public/'));
app.get('/', function (req, res) {
	res.sendfile(__dirname + '/page.html');
});

// Compatibility for Socket.IO on Heroku
io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});

// Start Twitter streaming
var credentials = {
  consumer_key: 'q4XHXUEYXUvweBPeU1zg',
  consumer_secret: '6YMcriFzY5hDOrrLAqllPXC0WJM0KLdvefwkCnGU',
  access_token_key: '13166432-pAwJhob339gWGkJTXkBw1H9C5osYkojR9bU9keyl6',
  access_token_secret: 'EdXVYwTxqNmB3DrbUkz3a6fctKhzajYHJ5dlg20azFA'
}

t = new twitter(credentials);
t.stream('statuses/filter', {'locations':'-160.0,-90.0,160.0,90.0'}, function(stream) {
  stream.on('data', function (data) {
    if (data.coordinates) {
    	io.sockets.emit('tweet', {
	    		coordinates: data.coordinates.coordinates,
	    		text: data['text'] 
	    });
    }
  });
});