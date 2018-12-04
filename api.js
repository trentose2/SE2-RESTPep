const express = require('express')
const bodyParser = require('body-parser');
const exampost = require('./exampost');
const examidget = require('./examidget');
const fs = require('fs');
const taskpost = require('./taskpost');

const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(PORT, () => console.log('Example app listening on port ' + PORT))

/*
var users = [];

app.post('/api/users', function (req, res) {

	var user = req.body;

	if(typeof user != 'undefined'         ||
	   typeof user.matricola != undefined ||
           typeof user.email != undefined     ||
           typeof user.isTeacher != undefined)
	{
		user.id = users.length + 1;

		users.push(req.body);

		res.status(201);

		res.send(users[users.length - 1]);
	}
	else
	{
		console.log("I dati ricevuti sono incompleti per creare un
utente.");
		res.status(400).send();
	};
});

app.get('/api/users', function (req, res) {

	res.contentType('application/json');

	var result = users;

	process.on('uncaughtException', function (err) {
		console.error((new Date).toUTCString() + 'UncaughtException:',
err.message);
		console.error(err.stack);
		res.status(500).send();
		process.exit(1);
	})

	res.status(200);
	res.send(result);
})

app.get('/api/users/:userId', function (req, res) {

	var searchedId = req.params.userId;

	if (searchedId < 1 || isNaN(searchedId))
	{
		res.status(400).send();
		return;
	}

	for (var i = 0; i < users.length; i++)
	{
		if(users[i].id == searchedId)
		{
			res.status(200);
			res.send(users[searchedId - 1]);
			return;
		}
	}

	res.status(404).send();

});

app.delete('/api/users/:userId', function (req, res) {

	var searchedId = req.params.userId;

	if (searchedId < 1 || isNaN(searchedId))
	{
		res.status(400).send();
		return;
	}

	for (var i = 0; i < users.length; i++)
	{
		if(users[i].id == searchedId)
		{
			res.status(204);
			delete users[searchedId - 1];
			res.send();
			return;
		}
	}

	res.status(404).send();

});

let examJson = fs.readFileSync('./exams.json', 'utf8', function(err, data){
	if (err) throw err;
	let parsedJson = JSON.parse(data);
});
var exams = JSON.parse(examJson);

var examsIdCounter=1;

app.get('/exams', (req, res) => {
		res.contentType('application/json');
		res.json(exams);
		res.status(200);
})

app.post('/exams', (req, res) => {
	let newexam = req.body;
	let check = exampost(newexam.destinatario, newexam.deadline, newexam.tasksarray, newexam.autore, newexam.condivisi);
	if(check==200){
		try{
		newexam.id=exams.nextid;
		exams.exams.push(newexam);
		res.status(201);

	}catch(error){
			console.log(error);
			res.status(500);
			res.send("500 INTERNAL SERVER ERROR");
		}
		exams.nextid ++;
		let newJson = JSON.stringify(exams);
		fs.writeFileSync('./exams.json', newJson);
		res.status(201);
		res.send("201 CREATED");
	}
	else{
		res.status(400);
		res.send("400 BAD REQUEST");
	}
})

app.get('/exams/:examID', (req, res) => {
	res.contentType('application/json');
	let check = examidget(req.params.examID);
	console.log(check);
	if(check==200){
		const index = exams.exams.findIndex(obj => obj.id == req.params.examID);
		if(index != -1){
		res.json(exams.exams[index]);
		res.status(200);
		}
		else{
			res.status(404);
			res.send("404 ID NOT FOUND");
		}
	}
	else{
		res.status(400);
		res.send("400 BAD REQUEST");
	}
})

app.delete('/exams/:examID', (req, res) => {
	let check = examidget(req.params.examID);
	console.log(check);
	if(check == 200){
		const index = exams.exams.findIndex(obj => obj.id == req.params.examID);
		console.log('index: ', index);
		if(index != -1){
		exams.exams.splice(index, 1);
		let newJson = JSON.stringify(exams);
		fs.writeFileSync('./exams.json', newJson);
		res.status(204);
		res.send("204 EXAM DELETED");
		}
		else{
			res.status(404);
			res.send("404 ID NOT FOUND");
		}
	}
	else{
		res.status(400);
		res.send("400 BAD REQUEST");
	}
})

app.put('/exams/:examID', (req,res) => {
	let check = examidget(req.params.examID);
	if(check == 200){
		let newexam = req.body;
		const index = exams.exams.findIndex(obj => obj.id == req.params.examID);
		if(index != -1){
			check = exampost(newexam.destinatario, newexam.deadline, newexam.tasksarray, newexam.autore, newexam.condivisi);
			if(check == 200){
				exams.exams[index] = newexam;
				let newJson = JSON.stringify(exams);
				fs.writeFileSync('./exams.json', newJson);
				res.status(202);
				res.send("202 EXAM MODIFIED");
			}
			else{
				res.status(400);
				res.send("400 BAD REQUEST");
			}
		}
		else{
			res.status(400);
			res.send("404 ID NOT FOUND");
		}
	}
	else{
		res.status(400);
		res.send("400 BAD REQUEST");
	}
})

app.listen(PORT, () => console.log('Example app listening on port ' + PORT))
*/

/*

//tasks tenute in memoria dal server
var tasks = [{id: 0, aperta: false, consegna: 'Domanda 1 | scelta 1 | scelta 2 | scelta 3 | scelta 4', risoluzione:'1|4', punteggiomax: 10}];

//id della prossima task da inserire
let taskIdCounter=1;

app.get('/tasks', (req, res) => {
	try{
		res.json(tasks);
	}catch(error){
		res.status(500);
		res.send("500 INTERNAL SERVER ERROR");
	}
	})

app.post('/tasks', (req, res) => {
	let newtask = req.body;
	console.log(newtask);
	//taskpost guarda se i campi sono formattati bene
	let check = taskpost(newtask.aperta, newtask.consegna, newtask.risoluzione, newtask.punteggiomax);
	if(check==200){
		try{
			newtask.id=taskIdCounter;
			tasks.push(newtask);
		}catch(error){
			console.log(error);
			res.status(500);
			res.send("500 INTERNAL SERVER ERROR");
		}
		taskIdCounter++;
		res.status(201);
		res.json(newtask);
	}
	else{
		res.status(400);
		res.send("400 BAD REQUEST");
	}
})

app.get('/tasks/:id', (req, res) => {

	let id =  req.params.id;
	if (id > tasks.length || id < 0 || isNaN(id)) {
		res.status(404);
		res.send('404 NOT FOUND');
		return;
	}
	else{
		res.send(tasks[id-1]);
	}
});

*/

const GETtasks = require('./core/GETtasks');
const POSTtasks = require('./core/POSTtasks');
const GETtasksId = require('./core/GETtasksId');
const DELETEtasksId = require('./core/DELETEtasksId');
const PUTtasksId = require('./core/PUTtasksId');

app.get('/tasks', (req, res) => {

	let toSend = GETtasks();
	res.setHeader('Content-Type', 'application/json');
	res.status(toSend.status);
	res.send(toSend.jsonData);

})

app.get('/tasks/:id', (req, res) => {

	let toSend = GETtasksId(parseInt(req.params.id));
	res.status(toSend.status);
	if(toSend.status == 200){
		res.send(toSend.jsonData);
	}

})

app.post('/tasks', (req, res) => {

	let toSend = POSTtasks(req.body);
	res.status(toSend.status);
	if(toSend.status == 201){
		res.send(toSend.id.toString());
	} 

})

app.put('/tasks/:id', (req, res) => {
	
	let toSend = PUTtasksId(req.body, req.params.id);
	res.status(toSend);
	res.send(toSend.toString());
})

app.delete('/tasks/:id', (req, res) => {

	let toSend = DELETEtasksId(req.params.id);
	res.status(toSend);
	res.send(toSend.toString());

})







