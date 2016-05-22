// dependencies
var express = require('express');
var path = require('path');

// server
var server = express();
var port = process.env.PORT || 8000;

// middleware
require('./middleware.js')(server, express);

server.listen(port, function() {
  console.log('Flash-cards, hell yeah!');
});

// database
var db = require(path.join(__dirname, '../db/dbConfig.js'));

// middleware
require('./middleware.js')(server, express);

// export
module.exports = server;
