(() => {
	'use strict';
	const Tasks = require('firebase').database();

	module.exports = {
		get,
		create
	};

	function get(query) {
		return new Promise((resolve, reject) => {
			Tasks
				.ref('tasks/').once('value')
				.then(data => {
					resolve(data.val());
				})
				.catch(err => {
					reject(err);
				})
		})
	}

	function create(query) {
		return Tasks
			.ref('tasks/' + query.id).set({
			title       : query.title,
			description : query.description,
		});
	}

})();
