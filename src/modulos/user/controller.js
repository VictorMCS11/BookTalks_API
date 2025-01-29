module.exports = function (dbInyect){

    const table = 'user'

    let db = dbInyect;

    if(!db){
        db = require('../../db/mysql');
    }

    function all(){
        return db.all(table)
    }

    function oneById(id){
        return db.oneById(table, id)
    }

    function oneByNamePassword(body){
        return db.oneByNamePassword(table, body)
    }
    
    function addUser(body){
        return db.addUser(table, body)
    }
    
    function removeUser(id){
        return db.removeUser(table, id)
    }
    return {
        all,
        oneById,
        oneByNamePassword,
        addUser,
        removeUser,
    }
}