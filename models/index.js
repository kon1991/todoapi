var mongoose = require('mongoose')
mongoose.set('debug', true)
mongoose.connect('mongodb://localhost/todoapi')

var connection = mongoose.connection;

connection.on('connected', function() {
    console.log('connected to db');
});
//mongoose.Promise = Promise;

module.exports.Todo = require('./todo');