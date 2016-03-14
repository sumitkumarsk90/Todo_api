var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;

var todos = [{
	id : 1,
	description : 'Meet mom for lunch',
	completed : false
}, {
	id : 2, 
	description : 'Go to market',
	completed : false
}, {
	id : 3,
	description : 'Play table tennis',
	completed : false
}];

app.get('/', function (req, res) {
	res.send('Todo API Root');
});

app.get('/todos', function (req, res) {
	res.json(todos);
});

app.get('/todos/:id', function (req, res) {
	var todoId = parseInt(req.params.id, 10);
	var retObj;
	//Iterate of todos array. Find the match.
	todos.forEach(function (jsonObj) {
		if(jsonObj.id === todoId){
			retObj = jsonObj;
		}
	});

	if(typeof retObj === 'undefined'){
		res.status(404).send();
	} else {
		res.json(retObj);
	}

});

app.listen(PORT, function () {
	console.log('Express running on port no ' + PORT  + '!');
});