var Sequelize = require('sequelize');

// on the 4th part of sequelize that is an object we add what 
// database we want to use and where we want to save it
var sequelize = new Sequelize(undefined, undefined, undefined, {
	'dialect': 'sqlite',
	// __dirname gives us the folder name that we are in and
	// the rest is our file name
	'storage': __dirname + '/basic-sqlite-database.sqlite'
});
// here we make a model of our data so sequelize will knows 
// how to make our table in database wit SQL now todo is 
// the name and the rest is our data model or validation 
// for table like type in description has to be a string, 
// allowNull means can't be empty and so on
var Todo = sequelize.define('todo', {
	description: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			len: [1, 250]
		}
	},
	completed: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false
	}
})
// this part is for puting data or syncing data in our table
sequelize.sync({
	// set to true is deleting the table and creating it again
	// set to false that is by default is creating if the table 
	// is not exiest already
	force: true
}).then(function() {
	console.log('Everything is synced');
// find todo by id number
	Todo.findById(1).then(function (todo) {
		if (todo) {
			console.log(todo.toJSON());
		} else {
			console.log('Todo not found');
		}
	})
	// with our variable name this part is creating the table
	Todo.create({
			description: 'muck your wife'
		}).then(function(todo) {
			return Todo.create({
				description: 'suck your wife'
			});
			// find a word in description
		}).then(function() {
			//return Todo.findById(1)
			return Todo.findAll({
				where: {
					description: {
						$like: '%suck%'
					}
				}
			});
		}).then(function (todos) {
			if (todos) {
				todos.forEach(function (todo) {
					console.log(todo.toJSON());
				});
				
			} else {
				console.log('no todo found!');
			}
		}).catch(function(e) {
			console.log(e);
		});
});