(() => {
	'use strict';

	let TaskController = require('./tasks.controller');

	module.exports = app => {
		app.post('/task', 		TaskController.create);
		app.get('/task',		TaskController.get);
	};
})();