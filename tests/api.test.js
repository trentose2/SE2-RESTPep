const url = 'http://localhost:3000';
var fetch = require('node-fetch');

const retreiveBackup = require('./utils/retreiveBackup');
const resetJSON = require('./utils/resetJSON');

const fileUser = 'db/users.json';
const fileTasks = 'db/tasks.json';
const fileGroups = 'db/groups.json';
const fileExams = 'db/exams.json';
const fileDeliveries = 'db/deliveries.json';

let fileBackupUser = null;
let fileBackupTasks = null;
let fileBackupGroups = null;
let fileBackupExams = null;
let fileBackupDeliveries = null;

beforeAll(() => {
    fileBackupDeliveries = retreiveBackup(fileDeliveries);
    fileBackupUser = retreiveBackup(fileUser);
    fileBackupTasks = retreiveBackup(fileTasks);
    fileBackupGroups = retreiveBackup(fileGroups);
    fileBackupExams = retreiveBackup(fileExams);
})

afterEach(() => {
    resetJSON(fileDeliveries, fileBackupDeliveries);
    resetJSON(fileUser, fileBackupUser);
    resetJSON(fileTasks, fileBackupTasks);
    resetJSON(fileGroups, fileBackupGroups);
    resetJSON(fileExams, fileBackupExams);
})


let ex = {
    "examId": 3,
    "testedId": 1,
    "reviewedId": 2,
    "examples": [{
            "id": 1,
            "soluzione": "false",
            "punteggio": 1
        },
        {
            "id": 2,
            "soluzione": "false",
            "punteggio": 0
        },
        {
            "id": 3,
            "soluzione": "true",
            "punteggio": 0
        }
    ]
}

var errorRes = { "jsonData": null, "status": 400 };
var notfoundRes = { "jsonData": null, "status": 404 };
const testExam = {
    destinatario: 100,
    deadline: "1010-10-10T10:10:10Z",
    tasksarray: [1, 10, 11, 100, 101],
    autore: 101010,
    condivisi: [110, 111, 101110]
};

var testData = { matricola: 200000, email: 'prova@prova.it', isTeacher: false };
var validTask = { aperta: true, consegna: "test post", risoluzione: "risposta...", punteggiomax: 10 };


test('Prova di connessione', () => {

    expect.assertions(1);

    var status;

    return fetch(url + '/')
        .then((res) => {
            status = res.status;
            expect(status).toEqual(200);
        })

});

test('GET user test', () => {

    expect.assertions(1);

    var status;
    return fetch(url + '/api/users')
        .then((res) => {
            status = res.status;
            return res.json();
        })
        .then(function() {
            expect(status).toEqual(200);
        });

});

test('GET(id) user test', () => {

    expect.assertions(1);

    var status;
    return fetch(url + '/api/users/0')
        .then((res) => {
            status = res.status;
            return res.json();
        })
        .then((jsonData) => {
            console.log(jsonData);
            console.log(status);
        })
        .then(function() {
            expect(status).toEqual(200);
        });

});


test('POST user test', () => {

    expect.assertions(1);

    let status;
    let jsonData;

    return fetch(url + '/api/users', {

            method: 'post',

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(testData)

        })
        .then((res) => {
            status = res.status;
            expect(status).toEqual(200)
        })

});


test('PUT(id) user test', () => {

    expect.assertions(1);

    let status;
    let jsonData;

    return fetch(url + '/api/users/0', {

            method: 'put',

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(testData)

        })
        .then((res) => {
            status = res.status;
            return res.json();
        })
        .then((jsonData) => {
            console.log(jsonData);
            console.log(status);
            expect(status).toEqual(200);
        })

});

test('DELETE(id) user test', () => {

    expect.assertions(1);

    let status;

    return fetch(url + '/api/users/0', {

            method: 'delete',

        })
        .then((res) => {
            status = res.status;
            expect(status).toEqual(204);
        })

});

//--------------- TASKS TEST --------------------

test('GET tasks test', () => {

    expect.assertions(1);

    var status;
    return fetch(url + '/api/tasks')
        .then((res) => {
            status = res.status;
            return res.json();
        })
        .then(function() {
            expect(status).toEqual(200);
        });

});

test('GET tasks(id) test', () => {

    expect.assertions(1);

    var status;
    return fetch(url + '/api/tasks/0')
        .then((res) => {
            status = res.status;
            return res.json();
        })
        .then((jsonData) => {
            // console.log(jsonData);
            // console.log(status);
        })
        .then(function() {
            expect(status).toEqual(200);
        });

});


test('POST tasks test', () => {

    expect.assertions(1);

    let status;
    //let jsonData;

    return fetch(url + '/api/tasks', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(validTask)
        })
        .then((res) => {
            status = res.status;
            expect(status).toEqual(201)
        })

});


test('PUT tasks(id) test', () => {

    expect.assertions(1);

    let status;
    //let jsonData;

    return fetch(url + '/api/tasks/0', {

            method: 'put',

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(validTask)

        })
        .then((res) => {
            status = res.status;
            return res.json();
        })
        .then(() => {
            //console.log(jsonData);
            //console.log(status);
            expect(status).toEqual(200);
        })

});

test('DELETE tasks(id) test', () => {

    expect.assertions(1);

    let status;

    return fetch(url + '/api/tasks/0', {

            method: 'delete',

        })
        .then((res) => {
            status = res.status;
            expect(status).toEqual(204);
        })

});




//test di groups

test('POSTgroup test', () => {
    expect.assertions(1);
    let status;
    return fetch(url + '/api/groups', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ groupname: 'nomegruppoprova', userlist: [1, 2, 3] })
        })
        .then((res) => {
            status = res.status;
            expect(status).toEqual(200)
        })
});


test('GETgroup test', () => {
    expect.assertions(1);
    let status;
    return fetch(url + '/api/groups')
        .then((res) => {
            status = res.status;
            return res.json();
        })
        .then(function() {
            expect(status).toEqual(200);
        });
});


test('GETgroupId test', () => {
    expect.assertions(1);
    let status;
    console.log("test GETgroupId");
    return fetch(url + '/api/groups/0')
        .then((res) => {
            status = res.status;
            return res.json();
        })
        .then((jsonData) => {
            console.log(jsonData);
            console.log(status);
        })
        .then(function() {
            expect(status).toEqual(200);
        });
});

test('DELETEgroupId test', () => {
    expect.assertions(1);
    let status;
    return fetch(url + '/api/groups/0', {
            method: 'delete',
        })
        .then((res) => {
            status = res.status;
            expect(status).toEqual(204);
        })
});


test('PUTgroupId test', () => {
    expect.assertions(1);
    let status;
    return fetch(url + '/api/groups/0', {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nomegruppo: 'nomegruppoprova', membri: [1, 2] })
        })
        .then((res) => {
            status = res.status;
            expect(status).toEqual(200);
        })

});

test('GET EXAM test', () => {
    expect.assertions(1);
    var status;
    return fetch(url + '/api/exams')
        .then((res) => {
            status = res.status;
            return res.json();
        })
        .then(function() {
            expect(status).toEqual(200);
        })
});

test('POST EXAM test', () => {
    expect.assertions(1);
    let status;
    let jsonData;

    return fetch(url + '/api/exams', {
            method: 'POST',
            body: JSON.stringify(testExam),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((res) => {
            status = res.status;
            expect(status).toEqual(201)
        })

});


test('GET(id) EXAM test', () => {
    expect.assertions(1);
    var status;
    return fetch(url + '/api/exams/1')
        .then((res) => {
            status = res.status;
            return res.json();
        })
        .then(function() {
            expect(status).toEqual(200);
        })

});

test('PUT(id) EXAM test', () => {
    expect.assertions(1);
    let status;
    let jsonData;

    return fetch(url + '/api/exams/1', {

            method: 'put',

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(testExam)

        })
        .then((res) => {
            status = res.status;
            return res.status;
        })
        .then((jsonData) => {
            expect(status).toEqual(202);
        })

});

test('DELETE(id) EXAM test', () => {
    expect.assertions(1);
    let status;
    let jsonData;

    return fetch(url + '/api/exams/1', {

            method: 'delete',

        })
        .then((res) => {
            status = res.status;
            return res.status;
        })
        .then((jsonData) => {
            expect(status).toEqual(200);
        })

});


test('GET deliveries test', () => {

    expect.assertions(1);

    let status;
    return fetch(url + '/api/deliveries')
        .then((res) => {
            status = res.status;
            return res.json();
        })
        .then(function() {
            expect(status).toEqual(200);
        });

});

test('POST test', () => {

    expect.assertions(1);
    let status;

    return fetch(url + '/api/deliveries', {

            method: 'post',

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(ex)

        })
        .then((res) => {
            status = res.status;
            expect(status).toEqual(200)
        })

});
//test delete by Ivan Berra
test('DELETE deliveries(examId) test', () => {

    expect.assertions(1);

    let status;

    return fetch(url + '/api/deliveries/1', {

            method: 'delete',

        })
        .then((res) => {
            status = res.status;
            expect(status).toEqual(204);
        })


});

test('GET deliveries(id) test', () => {

    expect.assertions(1);

    var status;
    return fetch(url + '/api/deliveries/1')
        .then((res) => {
            status = res.status;
            return res.json();
        })
        .then(function() {
            expect(status).toEqual(200);
        });

});

/*
test('GET deliveries test', () => {

    var status;
    fetch(url + '/deliveries')
        .then((res) => {
            status = res.status;
            return res.json();
        })
        .then(function() {
            expect(status).toEqual(200);
        });

});

var examples = {
	"id":1,
    "soluzione":"false",
    "punteggio":1
}

test('POST deliveries test', () => {

    var status;
    fetch(url + '/deliveries',{
		method: 'post',

		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},

		body: JSON.stringify(examples)
	})
        .then((res) => {
            status = res.status;
            expect(status).toEqual(200);
        })
});
*/