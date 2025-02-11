const bcrypt = require('bcrypt');
const auth = require('../../authentication');

const config = require('../../config');
const jwt = require('jsonwebtoken')
const secret = config.jwt.secret;

module.exports = function (dbInyect){

    const table = 'auth'

    let db = dbInyect;

    if(!db){
        db = require('../../db/mysql');
    }

    async function login(name, password, column){
        const data = await db.oneByName(table, name, column);
        return await bcrypt.compare(password, data[0].password)
            .then(result =>{
                if(result === true){
                    //Generar un token
                    console.log(name, password, column)
                    console.log(data[0].id)
                    // return auth.assignToken({ ...data[0] })
                    return jwt.sign({ name: data[0].name, id: data[0].id }, secret, { expiresIn: '1h' })
                }else{
                    console.log("Informacion innválida", result)
                }
            }).catch(err =>{
                throw new Error(err)
            })
    }

    async function addAuth(data){
        const authData = {
            id: data.id
        }
        if(data.name){
            authData.name = data.name
        }
        if(data.password){
            authData.password = await bcrypt.hash(data.password.toString(), 5)
        }

        return db.addAuth(table, authData)
    }

    return {
        login,
        addAuth,
    }
}