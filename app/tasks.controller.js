(() => {
	'use strict';
	const taskService   = require('./tasks.service.js');

	module.exports = {
		create,
		get
	};

	function create (req, res) {
		Promise.resolve()
			.then(() => {
				if(req.body.title && req.body.description) {
					return taskService.create(req.body)
				} else {
					throw (new Error(JSON.stringify({
						status : 400,
						type   : 'Title and decription are not exist',
					})));
				}
			})
			.then(data => {
				res.status(200).send(data);
			})
			.catch(err => {
				res.status(400).send(err);
			})
		}

		function get (req, res) {
			taskService.get()
			.then(data => {
				let resData = [];
				for (let key in data) {
					resData.push(data[key])
				}
				res.status(200).send(resData);
			})
			.catch(err => {
				res.status(400).send(err);
			})
	}
})();