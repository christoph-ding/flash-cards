// dependencies
var morgan = require('morgan');
var bodyParser = require('body-parser'); 
var path = require('path');

module.exports = function (server, express) {

  // path
  var root = '/../..';
  var clientAssets = path.resolve(__dirname + root + '/client');

  // logging
  server.use(morgan('dev'));

  // serve static files
  server.use(express.static(path.resolve(clientAssets)));

  server.get('/', function(req, res) {
    console.log('sending static files...');
    res.sendFile('index.html', { root: path.join(clientAssets + '/main-app/')});
  })

  // routing
  // admin
  var adminRouter = express.Router();
  server.use('/admin', bodyParser.json(), adminRouter);
  require('../services/admin/adminRouter.js')(adminRouter);

}


