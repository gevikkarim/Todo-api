var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';
var Sequelize;

if (env === 'production') {
	sequelize = new Sequelize(process.env.DATABASE_URL, {
		dialect: 'postgres'
	});
} else {
	// on the 4th part of sequelize that is an object we add what 
	// database we want to use and where we want to save it

	sequelize = new Sequelize(undefined, undefined, undefined, {
		'dialect': 'sqlite',
		// __dirname gives us the folder name that we are in and
		// the rest is our file name
		'storage': __dirname + '/data/dev-todo-api.sqlite'
	});
}


var db = {};

db.todo = sequelize.import(__dirname + '/models/todo.js');
db.user = sequelize.import(__dirname + '/models/user.js');
db.token = sequelize.import(__dirname + '/models/token.js');
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.todo.belongsTo(db.user);
db.user.hasMany(db.todo);

module.exports = db;