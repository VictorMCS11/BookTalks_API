// const { response } = require('express');
const auth = require('../auth')

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

    function oneByName(name, column){
        return db.oneByName(table, name, column)
    }

    function oneByNamePassword(body){
        return db.oneByNamePassword(table, body)
    }
    
    async function addUser(body){
        db.oneByName(table, body.name, "name").then(async responseToCompare =>{
            if(responseToCompare){
                // console.log(responseToCompare)
                if(responseToCompare[0]?.name === body.name) return responseToCompare
            } 
            const response = await db.addUser(table, body);
            let insertId = response.insertId;
            if(body.userId == 0){
                insertId = response.insertId
            }else{
                insertId = body.userId
            }
    
            if(body.name && body.password){
                const response2 = await auth.addAuth({
                    id: insertId,
                    name: body.name,
                    password: body.password
                })
                return response2
            }
            return response
        })
    }
    
    function removeUser(id){
        return db.removeUser(table, id)
    }

    return {
        all,
        oneById,
        oneByName,
        oneByNamePassword,
        addUser,
        removeUser,
    }
}