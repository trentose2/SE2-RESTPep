const checktaskid = require('./checktaskid');
const fs = require('fs');

function DELETEtasksId (inputId){

	if(inputId == null){
		return 400;
	}

	inputId = parseInt(inputId);
	let res = null;
	let check = checktaskid(inputId);
	if(check==200){
		try{
			let data = fs.readFileSync('db/tasks.json', 'utf8');
			var obj = JSON.parse(data);
			let indexToDelete = obj.tasks.findIndex(task => task.id == inputId);
			obj.tasks.splice(indexToDelete, 1);
			json = JSON.stringify(obj); //reconvert to JSON
			fs.writeFileSync('db/tasks.json',json, (err) => {
				if (err) return console.log(err);
			});
			res = 200;

		}catch(error){
			console.log(error);
			res = 500;
		}
	}
	else if(check==400){
		res = 400;
	}
	else{
		res = 404;
	}

	return res;

}

module.exports = DELETEtasksId;
