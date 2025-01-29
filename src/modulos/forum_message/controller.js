module.exports = function (dbInyect){

    const table = 'message'

    let db = dbInyect;

    if(!db){
        db = require('../../db/mysql');
    }

    function allById(id, column){
        return db.allById(table, id, column)
    }
    
    function oneById(id){
        return db.oneById(table, id)
    }
    
    // function oneByTitle(title){
    //     return db.oneByTitle(table, title)
    // }
    
    function addForumMessage(body){
        return db.addForumMessage(table, body)
    }
    
    function removeForumMessage(id){
        return db.removeForumMessage(table, id)
    }
    return {
        allById,
        oneById,
        addForumMessage,
        removeForumMessage,
    }
}