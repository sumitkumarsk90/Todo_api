var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

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

//POST /todos
app.post('/todos', function (req,res) {
	var body = req.body;
	body.id = todoNextId++;
	todos.push(body);
	console.log('Description :  ' + body.description);
	res.json(body);
});

app.listen(PORT, function () {
	console.log('Express running on port no ' + PORT  + '!');
});