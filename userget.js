function userget(){

    let imported = fs.readFileSync('./users.json', 'utf8', function (err, data) {
        if (err) throw err;
    });

    let utenti=JSON.parse(imported);

    return utenti['users'];

}

module.exports = userget;
