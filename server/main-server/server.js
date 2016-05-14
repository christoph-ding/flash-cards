// Dependencies
var express = require('express');
var path = require('path');

// Variabls
var root = '/../..';
var clientAssets = path.resolve(__dirname + root + '/client');

// Server
var server = express();
var port = process.env.PORT || 8000;
server.listen(port, function() {
  console.log('Flash-cards, hell yeah!' + '\n' + clientAssets);
});

// Static Files
server.use(express.static(path.resolve(clientAssets)));

server.get('/', function(req, res) {
  console.log('sending static files...');
  res.sendFile('index.html', { root: path.join(clientAssets + '/main-app/')});
})
