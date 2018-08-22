const functions = require('firebase-functions');
const admin     = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.getTasks = functions.https.onCall(() => {
	return admin
		.database()
		.ref('tasks/')
		.once('value')
		.then(data => {
			let resData = [];
			for (let key in data.val()) {
				resData.push(data.val()[key])
			}
			return resData;
		})
});

exports.createTask = functions.https.onCall((query) => {
	return admin
		.database()
		.ref('tasks/' + query.id)
		.set({
			title       : query.title,
			description : query.description,
		})
});
