module.exports = function (dbInyect){

    const table = 'review'

    let db = dbInyect;

    if(!db){
        db = require('../../db/mysql');
    }

    function all(){
        return db.all(table)
    }

    function allById(id, column){
        return db.allById(table, id, column)
    }

    function oneByNamePassword(body){
        return db.oneByNamePassword(table, body)
    }
    
    function addReview(body){
        return db.addReview(table, body)
    }
    
    function removeReview(id){
        return db.removeReview(table, id)
    }
    return {
        all,
        allById,
        oneByNamePassword,
        addReview,
        removeReview,
    }
}