module.exports = function (dbInyect){

    const table = 'auth'

    let db = dbInyect;

    if(!db){
        db = require('../../db/mysql');
    }

    function addAuth(data){
        const authData = {
            id: data.id
        }
        if(data.name){
            authData.name = data.name
        }
        if(data.password){
            authData.password = data.password
        }

        return db.addAuth(table, authData)
    }

    return {
        addAuth,
    }
}