module.exports = function (dbInyect){

    const table = 'like_review'

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

    function allByTwoId(reviewId, userId, column1, column2){
        return db.allByTwoId(table, reviewId, userId, column1, column2)
    }
    
    function addLike(body){
        return db.addLike(table, body)
    }
    
    function removeLike(reviewId, userId, column1, column2){
        return db.removeLike(table, reviewId, userId, column1, column2)
    }

    return {
        all,
        allById,
        allByTwoId,
        addLike,
        removeLike,
    }
}