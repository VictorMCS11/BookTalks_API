module.exports = function (dbInyect){

    const table = 'book'

    let db = dbInyect;

    if(!db){
        db = require('../../db/mysql');
    }

    function all(){
        return db.all(table)
    }

    function allByTitle(title, column){
        return db.allByTitle(table, column, title)
    }
    
    function oneById(id){
        return db.oneById(table, id)
    }
    
    function oneByTitle(title){
        return db.oneByTitle(table, title)
    }
    function oneImage(title){
        return db.oneByTitle(table, title)
    }
    
    function addBook(body){
        return db.addBook(table, body)
    }
    
    function removeBook(id){
        return db.removeBook(table, id)
    }
    return {
        all,
        allByTitle,
        oneById,
        oneByTitle,
        oneImage,
        removeBook,
    }
}