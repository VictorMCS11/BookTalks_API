module.exports = function (dbInyect){

    const table = 'forum'

    let db = dbInyect;

    if(!db){
        db = require('../../db/mysql');
    }

    function all(){
        return db.all(table)
    }

    function allById(id){
        return db.allById(table, id)
    }

    function oneById(id){
        return db.oneById(table, id)
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
        oneById,
        addReview,
        removeReview,
    }
}