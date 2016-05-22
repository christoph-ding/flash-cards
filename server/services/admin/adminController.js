// dependencies
var path = require('path');

// database
var db = require(path.join(__dirname, '../../db/dbConfig.js'));

// test data
var testData = ['hello', 'goodbye', 'ringo', 'paul', 'george', 'jon'];

// for router
module.exports = {
  saveCard: function (req, res) {
    var newCard = req.body;
    console.log('newCard: ', newCard);
    // there will only ever be a single card with a specific 'front'
    db.Card.find({where: {front: newCard.front}})
      .then(function (card) {
        // if that card exists, we simply 'replace' it
        if (card) {
          card.update({
            back: newCard.back,
            bin: newCard.bin,
            next: newCard.next,
            right: newCard.right,
            wrong: newCard.wrong
          })  
        } else {
            db.Card.create({
              front: newCard.front,
              back: newCard.back,
              bin: newCard.bin,
              next: newCard.next,
              right: newCard.right,
              wrong: newCard.wrong      
            })
          }
      })
      .then(function() {
        res.sendStatus(200);
      })
  },

  fetchCards: function(req, res) {
    res.send(testData);
  }
}
