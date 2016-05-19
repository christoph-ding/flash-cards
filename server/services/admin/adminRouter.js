var adminController = require('./adminController.js');

module.exports = function (server) {
  server.route('/save')
    .get(adminController.saveCard);
}
