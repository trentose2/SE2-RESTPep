const express = require('express');
const app = express();
const getDeliveryExamId = require('./core/getDeliveryExamId').getDeliveryExamId;
const deleteDeliveryExamId = require('./core/deleteDeliveryExamId');
const postgetDelivery = require('./core/GET&POSTdelivery')
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(PORT, () => console.log('Example app listening on port ' + PORT))

app.get('/deliveries/e/:examID', (req, res) => {
	try{
		let deliveryJson = getDeliveryExamId(req.params.examID);
		if(deliveryJson.status == 400){
			res.status(400);
			res.send("400 BAD REQUEST");
		}
		else if(deliveryJson.status == 404){
			res.status(404);
			res.send("404 ID NOT FOUND");
		}
		else if(deliveryJson.status == 200){
			res.contentType('application/json');
			res.status(200);
			res.json(deliveryJson.jsonData);
		}
	}catch(error){console.log(error);}
})

app.post('/deliveries', function (req, res) {

	var body = req.body;

	if(typeof body != 'undefined'||typeof body.examID != undefined ||
           typeof user.tested-id != undefined||typeof user.reviewed-id != undefined)
	{
		user.id = users.length + 1;

		users.push(req.body);

		res.status(201);

		res.send(users[users.length - 1]);
	}
	else
	{
		console.log("I dati ricevuti sono incompleti per creare un utente.");
		res.status(400).send();
	};
})

app.get('/deliveries', (req, res) => {
	try{
		let delivery = postgetDelivery.getdelivery;
		if(delivery.status == 200){
			res.contentType('application/json');
			res.status(200);
			res.json(Deliveries);
		}
	}catch(error){console.log(error);}
})

app.delete('/deliveries/e/:examID', (req, res) => {
	try{
		let response = deleteDeliveryExamId(req.params.examID);
		if(response.status == 204){
			res.status(200); //per qualche motivo mettendo 204 non manda la stringa "204 DELIVERY DELETED"
			res.send("204 DELIVERY DELETED");
		}
		else if(response.status == 400){
			res.status(400);
			res.send("400 BAD REQUEST");
		}
		else if(response.status == 404){
			res.status(404);
			res.send("404 ID NOT FOUND");
		}
	}catch(error){console.log(error);}
})
// supertest
