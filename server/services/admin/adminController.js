// dependencies

// test data
var testData = ['hello', 'goodbye', 'ringo', 'paul', 'george', 'jon'];

// for router
module.exports = {
  saveCard: function (req, res) {
    res.send('card was successfully saved');
  },
  fetchCards: function(req, res) {
    res.send(testData);
  }
}
