const delivery = require('../core/GET&POSTdelivery');
var examples = {
	"id":1,
    "soluzione":"false",
    "punteggio":1
}
let examples_String=JSON.stringify(examples);
test('valid open question', () => {
	var received = delivery.postdelivery(1,1,3,examples); 
	expect(received.status).toBe(200);
});

/*test('valid open question', () => {
	var received = delivery.getdeliveryid(1); 
	expect(received.status).toBe(200);
});*/

test('valid open question', () => {
	var received = delivery.getdelivery(); 
	expect(received.status).toBe(200);
});

test('It is a Json', () =>{
	expect(delivery.isJson(examples_String)).toBe(true);
})

//UNVALID

test('It is a Json', () =>{
	expect(delivery.isJson("sasfaf")).toBe(false);
})

test('unvalid field exam_ID', () => {
	var received = delivery.postdelivery('ciao',45,54,[7,"false", 44]);
	expect(received.status).toBe(400);
});

test('unvalid field tested_ID', () => {
	var received = delivery.postdelivery(3,'ciali',34,[7,"false", 44]);
	expect(received.status).toBe(400);
});

test('unvalid field reviewed_ID', () => {
	var received = delivery.postdelivery(2,45,"crisre",[7,"false", 44]);
	expect(received.status).toBe(400);
});

test('unvalid field examples', () => {
	var received = delivery.postdelivery('ciao',45,54,34,null);
	expect(received.status).toBe(400);
});

test('multiple unvalid field ID', () => {
	var received = delivery.postdelivery('ciao','robe',45,null);
	expect(received.status).toBe(400);
});

/*test('delivery not found', () => {
	var received = delivery.getdeliveryid(-1);
	expect(received.status).toBe(404);
});

test('unvalid ID field', () => {
	var received = delivery.getdeliveryid("ciao come va");
	expect(received.status).toBe(404);
});
*/