// database connection
var sequelize = require('sequelize');

var port;

var connection = new Sequelize('flash-cards', null, null {
  dialect: 'postgres',
  port: 5432
})

// connect
connection
  .authenticate()
  .then(function () {
    console.log('connected to flash cards');
  })
  .catch(function (err) {
    console.log("something went wrong connecting to flash cards");
  })

// card table
var Card = connection.define('Card', {
    front: Sequelize.STRING,
    back: Sequelize.STRING,
    bin: Sequelize.INTEGER,
    next: Sequelize.DATE,
    right: Sequelize.STRING,
    wrong: Sequelize.STRING
  },
  {
    tableName: 'Flash-Cards'
  }
);

Card.sync();

exports.Card = Card;
