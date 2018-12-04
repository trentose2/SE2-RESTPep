var fs = require("fs");

function esisteUser(idUser) {
    let imported = fs.readFileSync('db/users.json', 'utf8')

    let utenti = JSON.parse(imported);
    var lookingAt = idUser;
    if (utenti.nextId <= idUser)
        return -1;

    else if (
        (utenti.users[lookingAt] != null &&
            utenti.users[lookingAt] != undefined &&
            utenti.users[lookingAt].id == idUser)
    )
        return lookingAt;

    else {
        let beginSearch = 0;
        let endSearch = utenti.users.length - 1;
        lookingAt = ((beginSearch + endSearch) / 2);
        do {
            lookingAt = ((beginSearch + endSearch) / 2);
            if (utenti.users[lookingAt] == null) {
                let indice = lookingAt - 1;
                while (indice >= beginSearch && utenti.users[indice] == null)
                    indice--;
                if (indice < beginSearch) {
                    indice = lookingAt + 1;
                    while (indice <= endSearch && utenti.users[indice] == null)
                        indice++;
                    if (indice > endSearch)
                        return -1;
                    else {
                        if (utenti.users[indice] < idUser)
                            beginSearch = indice + 1;
                        else if (utenti.users[indice] > idUser)
                            endSearch = indice - 1;
                        else if (utenti.users[indice] == idUser)
                            return lookingAt;
                    }
                } else {
                    if (utenti.users[indice] < idUser)
                        beginSearch = indice + 1;
                    else if (utenti.users[indice] > idUser)
                        endSearch = indice - 1;
                    else if (utenti.users[indice] == idUser)
                        return lookingAt;
                }
            } else if (utenti.users[lookingAt] < idUser)
                beginSearch = lookingAt + 1;
            else if (utenti.users[lookingAt] > idUser)
                endSearch = lookingAt - 1;
            else if (utenti.users[lookingAt] == idUser)
                return lookingAt;
        } while (beginSearch <= endSearch)
        return -1;
    }
}

module.exports = esisteUser;