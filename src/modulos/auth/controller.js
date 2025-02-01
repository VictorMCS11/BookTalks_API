const bcrypt = require('bcrypt');
const auth = require('../../authentication');


module.exports = function (dbInyect){

    const table = 'auth'

    let db = dbInyect;

    if(!db){
        db = require('../../db/mysql');
    }

    async function login(name, password, column){
        const data = await db.oneByName(table, name, column);
        return bcrypt.compare(password, data[0].password)
            .then(result =>{
                if(result === true){
                    //Generar un token
                    return auth.asignarToken({ ...data[0] })
                }else{
                    throw new Error("Informacion innválida")
                }
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