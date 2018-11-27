const express = require('express')
const bodyParser = require('body-parser');
const exampost = require('./exampost');
const examidget = require('./examidget');
const fs = require('fs');

const app = express()
const PORT = process.env.PORT || 3000


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Hello World!'))

let examJson = fs.readFileSync('./exams.json', 'utf8', function(err, data){
	if (err) throw err;
	let parsedJson = JSON.parse(data);
});
var exams = JSON.parse(examJson);

var examsIdCounter=1;

app.get('/exams', (req, res) => {
		res.contentType('application/json');
		res.json(exams);
})

app.post('/exams', (req, res) => {
	let newexam = req.body;
	let check = exampost(newexam.destinatario, newexam.deadline, newexam.tasksarray, newexam.autore, newexam.condivisi);
	if(check==200){
		try{
		newexam.id=exams.nextid;
		exams.exams.push(newexam);

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


app.listen(PORT, () => console.log('Example app listening on port ' + PORT))
