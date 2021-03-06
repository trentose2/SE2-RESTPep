const fs = require('fs');
const esisteDeliveryExamId = require('../utils/esisteDeliveryExamId');

const file = './db/deliveries.json';


//RITORNA TUTIT LE DELIVERIES AVENTI LO STESSO EXAMID
function getDeliveryExamId(examId){
  let examID = parseInt(examId);
  let response = {"status": null, "jsonData": []};

  if (examID >= 0 && typeof examID === "number") {
    let deliveryIndex = esisteDeliveryExamId(examID);
    if(deliveryIndex > -1){
      let deliveryJSON = fs.readFileSync(file, 'utf8');
      var deliveries = JSON.parse(deliveryJSON);
      //CICLO PRINCIPALE CHE RIEMPIE RESPONSE CON TUTTE LE DELIVERY RICHIESTE
      do{
    //    console.log("delivery taken at deliveryIndex: ", deliveryIndex);
        response.jsonData.push(deliveries.deliveries[deliveryIndex]);
        deliveries.deliveries.splice(deliveryIndex, 1);
        deliveryIndex = deliveries.deliveries.findIndex(obj => obj.examId == examID);
      }while(deliveryIndex != -1);

      response.status = 200;
      return response;
    }
    else if(deliveryIndex == -1) {response.status = 404; return response;}
  }
  else {response.status = 400; return response;}
}

module.exports.getDeliveryExamId = getDeliveryExamId;
