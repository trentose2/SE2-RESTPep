const express = require('express');
const bodyParser = require('body-parser');
const Exam = require('./core/exams/Exam');
const ExamId = require('./core/exams/ExamId');
const fs = require('fs');

const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(PORT, () => console.log('Example app listening on port ' + PORT))

app.get('/', (req, res) => {
    res.status(200);
    res.send('Hello World!');
})

app.post('/api/users', function(req, res) {

    var user = req.body;

    var message;

    var result = POSTuser(user.matricola, user.email, user.isTeacher);

    res.status(result.status);

    if (result.status != 200)
        message = { "message": "Error: " + result.status };
    else
        message = { 'url': url + "api/users/" + result.jsonData.id };

    process.on('uncaughtException', function(err) {
        console.error((new Date).toUTCString() + 'UncaughtException:', err.message);
        console.error(err.stack);
        res.status(500).send({ "message": "Error: " + 500 });
        process.exit(1);
    })
    res.send(message);

});

app.get('/api/users', function(req, res) {

    res.contentType('application/json');
    var result = GETuser();
    res.status(200);

    res.send(result.jsonData);
})

app.get('/api/users/:userId', function(req, res) {

    var message;

    var searchedId = req.params.userId;

    res.contentType('application/json');

    var result = GETuserId(Number.parseInt(searchedId));

    res.status(result.status);

    if (result.status != 200)
        message = { "message": "Error: " + result.status };
    else
        message = result.jsonData;

    res.send(message);

});

app.delete('/api/users/:userId', function(req, res) {

    var message;

    var searchedId = req.params.userId;

    res.contentType('application/json');

    var result = DELETEuserId(Number.parseInt(searchedId));

    res.status(result.status);

    if (result.status != 204)
        message = { "message": "Error: " + result.status };

    //il messaggio è undefined se l'eliminazione è andata a buon fine
    //204 indica No Content e non accetta nessun corpo

    res.send(message);

});

app.put('/api/users/:userId', function(req, res) {

    var user = req.body;

    var message;

    var searchedId = req.params.userId;

    res.contentType('application/json');

    var result = PUTuserId(Number.parseInt(searchedId), user.matricola, user.email, user.isTeacher);

    res.status(result.status);

    if (result.status != 200)
        message = { "message": "Error: " + result.status };
    else
        message = { "message": "Utente modificato" };


    res.send(message);


});

app.get('/api/exams', (req, res) => {
	let response = Exam.get();
	if(response.status != 500){
		res.contentType('application/json');
		res.status(response.status);
		res.json(response.jsonData);
	}
	else if(response.status == 500){
		res.status(response.status);
		res.send("500 INTERNAL SERVER ERROR");
	}
})

app.post('/api/exams', (req, res) => {
	let response = Exam.write(req.body);
	console.log("Response: ", response);
	if(response.status == 201){
		res.status(response.status);
		res.send("201 EXAM CREATED WITH ID: "+ response.examId.toString());
	}
	else if(response.status == 400){
		res.status(response.status);
		res.send("400 BAD REQUEST");
	}
})

app.get('/api/exams/:examID', (req, res) => {
	try{
		let response = ExamId.idGet(req.params.examID);
		if(response.status == 200){
			res.contentType('application/json');
			res.status(response.status);
			res.json(response.jsonData);
		}
		if(response.status == 400){
			res.status(response.status);
			res.send("400 BAD REQUEST");
		}
		if(response.status == 404){
			res.status(response.status);
			res.send("404 ID NOT FOUND");
		}
	}catch(error){console.log(error);}
})

app.delete('/api/exams/:examID', (req, res) => {
	try{
		let check = ExamId.idDelete(req.params.examID);
		if(check == 204){
			res.status(200); //per qualche motivo mettendo 204 non manda la stringa "204 EXAM DELETED"
			res.send("204 EXAM DELETED");
		}
		else if(check == 400){
			res.status(400);
			res.send("400 BAD REQUEST");
		}
		else if(check == 404){
			res.status(404);
			res.send("404 ID NOT FOUND");
		}
	}catch(error){console.log(error);}
})

app.put('/api/exams/:examID', (req,res) => {
	try{
			let check = ExamId.idPut(req.body, req.params.examID);
			if(check == 202){
				res.status(202);
				res.send("202 EXAM MODIFIED");
			}
			else if(check == 400){
				res.status(400);
				res.send("400 BAD REQUEST");
			}
			else if(check == 404){
				res.status(404);
				res.send("404 ID NOT FOUND");
			}
	}catch(error){console.log(error);}
})


app.get('/api/tasks', (req, res) => {

    let toSend = GETtasks();
    res.setHeader('Content-Type', 'application/json');
    res.status(toSend.status);
    res.send(toSend.jsonData);

})

app.get('/api/tasks/:id', (req, res) => {

    let toSend = GETtasksId(parseInt(req.params.id));
    res.status(toSend.status);
    if (toSend.status == 200) {
        res.send(toSend.jsonData);
    }

})

app.post('/api/tasks', (req, res) => {

    let toSend = POSTtasks(req.body);
    res.status(toSend.status);
    if (toSend.status == 201) {
        res.send(toSend.id.toString());
    }

})

app.put('/api/tasks/:id', (req, res) => {

    let toSend = PUTtasksId(req.body, req.params.id);
    res.status(toSend);
    res.send(toSend.toString());
})

app.delete('/api/tasks/:id', (req, res) => {

    let toSend = DELETEtasksId(req.params.id);
    res.status(toSend);
    res.send();
})
