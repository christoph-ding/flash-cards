// database connection
var sequelize = require('sequelize');

var port;

var connection = new sequelize('flash', null, null, {
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
    front: sequelize.STRING,
    back: sequelize.STRING,
    bin: sequelize.INTEGER,
    next: sequelize.DATE,
    right: sequelize.STRING,
    wrong: sequelize.STRING
  },
  {
    tableName: 'Cards'
  }
);

Card.sync();

exports.Card = Card;
