var Sequelize = require('sequelize');

// on the 4th part of sequelize that is an object we add what 
// database we want to use and where we want to save it
var sequelize = new Sequelize(undefined, undefined, undefined, {
	'dialect': 'sqlite',
	// __dirname gives us the folder name that we are in and
	// the rest is our file name
	'storage': __dirname + '/data/dev-todo-api.sqlite'
});

var db = {};

db.todo = sequelize.import(__dirname + '/models/todo.js');
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
