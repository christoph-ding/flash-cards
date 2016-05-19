// Dependencies
var morgan = require('morgan');
var bodyParser = require('body-parser'); 
var path = require('path');

module.exports = function (server, express) {

  var root = '/../..';
  var clientAssets = path.resolve(__dirname + root + '/client');

  // Serve static files
  server.use(express.static(path.resolve(clientAssets)));

  server.get('/', function(req, res) {
    console.log('sending static files...');
    res.sendFile('index.html', { root: path.join(clientAssets + '/main-app/')});
  })

  // Routing
}


