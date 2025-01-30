const mysql = require('mysql');
const config = require('../config')

const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
}

let conexion;

function conMysql(){
    conexion = mysql.createConnection(dbconfig)
    conexion.connect((err) =>{
        if(err){
            console.log('[db err]', err);
            setTimeout(conmysql, 200);
        }else{
            console.log('DB Conectada!')
        }
    })

    conexion.on('error', err =>{
        console.log('[db err]', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            conMysql();
        }else{
            throw err;
        }
    })
}

conMysql()
//GET ALL
function all(table){
    return new Promise( (resolve, reject) =>{
        conexion.query(`SELECT * FROM ${table} LIMIT 8;`, (error, result) =>{
            return error ? reject(error) : resolve(result);
        })
    })
}
function allById(table, id, column){
    return new Promise( (resolve, reject) =>{
        conexion.query(`SELECT * FROM ${table} WHERE ${column}_id=?`, [id], (error, result) =>{
            return error ? reject(error) : resolve(result);
        })
    })
}

//GET ONE
function oneById(table, id){
    return new Promise( (resolve, reject) =>{
        conexion.query(`SELECT * FROM ${table} WHERE ${table}_id=${id}`, (error, result) =>{
            return error ? reject(error) : resolve(result);
        })
    })
}
function oneByNamePassword(table, data){
    return new Promise( (resolve, reject) =>{
        conexion.query(`SELECT * FROM ?? WHERE name=? AND password=?`, [table, data.name, data.password], (error, result) =>{
            return error ? reject(error) : resolve(result);
        })
    })
}
function oneByTitle(table, title){
    return new Promise( (resolve, reject) =>{
        conexion.query(`SELECT * FROM ${table} WHERE title='${title}' OR title LIKE '${title}%' OR title LIKE '%${title}%'`, (error, result) =>{
            return error ? reject(error) : resolve(result);
        })
    })
}
function oneByName(table, name){
    return new Promise( (resolve, reject) =>{
        conexion.query(`SELECT * FROM ${table} WHERE title='${name}'`, (error, result) =>{
            return error ? reject(error) : resolve(result);
        })
    })
}
function oneImage(table, name){
    return new Promise( (resolve, reject) =>{
        conexion.query(`SELECT * FROM ${table} WHERE title='${name}'`, (error, result) =>{
            return error ? reject(error) : resolve(result);
        })
    })
}

//ADD
function addBook(table, data){
    return new Promise( (resolve, reject) =>{
        conexion.query(`INSERT INTO ${table} (title, author, release_date, url_image) VALUES (?, ?, ?, ?)`, [data.title, data.author, data.url_image], (error, result) =>{
            return error ? reject(error) : resolve(result);
        })
    })
}
function addReview(table, data){
    return new Promise( (resolve, reject) =>{
        conexion.query(`INSERT INTO ${table} (score, content, user_id, book_id) VALUES (?, ?, ?, ?)`, [data.score, data.content, data.user.userId, data.book.bookId], (error, result) =>{
            return error ? reject(error) : resolve(result);
        })
    })
}
function addForumMessage(table, data){
    return new Promise( (resolve, reject) =>{
        conexion.query(`INSERT INTO ${table} (content, user_id, forum_id) VALUES (?, ?, ?)`, [data.content, data.user.userId, data.forum.forumId], (error, result) =>{
            return error ? reject(error) : resolve(result);
        })
    })
}
function addBook(table, data){
    return new Promise( (resolve, reject) =>{
        conexion.query(`INSERT INTO ${table} (title, author, release_date, url_image) VALUES (?, ?, ?, ?)`, [data.title, data.author, data.url_image], (error, result) =>{
            return error ? reject(error) : resolve(result);
        })
    })
}
function addUser(table, data){
    return new Promise( (resolve, reject) =>{
        conexion.query(`INSERT INTO ${table} (user_id, name, email, active) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE name = VALUES(name), email = VALUES(email), active = VALUES(active)`, [data.id, data.name, data.email, data.active], (error, result) =>{
            return error ? reject(error) : resolve(result);
        })
    })
}
function addAuth(table, data){
    return new Promise( (resolve, reject) =>{
        conexion.query(`INSERT INTO ${table} (id, name, password) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE name = VALUES(name), password = VALUES(password)
`, [data.id,data.name, data.password], (error, result) =>{
            return error ? reject(error) : resolve(result);
        })
    })
}
function addReview(table, data){
    return new Promise( (resolve, reject) =>{
        conexion.query(`INSERT INTO ${table} (score, content, user_id, book_id) VALUES (?, ?, ?, ?)`, [data.score, data.content, data.user.userId, data.book.bookId], (error, result) =>{
            return error ? reject(error) : resolve(result);
        })
    })
}
function addForumMessage(table, data){
    return new Promise( (resolve, reject) =>{
        conexion.query(`INSERT INTO ${table} (content, user_id, forum_id) VALUES (?, ?, ?)`, [data.content, data.user.userId, data.forum.forumId], (error, result) =>{
            return error ? reject(error) : resolve(result);
        })
    })
}

//REMOVE
function removeBook(table, id){
    return new Promise( (resolve, reject) =>{
        conexion.query(`DELETE FROM ${table} WHERE book_id=${id}`, (error, result) =>{
            return error ? reject(error) : resolve(result);
        })
    })
}
function removeUser(table, id){
    return new Promise( (resolve, reject) =>{
        conexion.query(`DELETE FROM ${table} WHERE user_id=${id}`, (error, result) =>{
            return error ? reject(error) : resolve(result);
        })
    })
}
function removeReview(table, id){
    return new Promise( (resolve, reject) =>{
        conexion.query(`DELETE FROM ${table} WHERE review_id=${id}`, (error, result) =>{
            return error ? reject(error) : resolve(result);
        })
    })
}
function removeForumMessage(table, id){
    return new Promise( (resolve, reject) =>{
        conexion.query(`DELETE FROM ${table} WHERE message_id=${id}`, (error, result) =>{
            return error ? reject(error) : resolve(result);
        })
    })
}

module.exports = {
    all, 
    allById,
    oneById,
    oneByNamePassword,
    oneByTitle,
    oneByName,
    addBook, 
    addUser,
    addAuth,
    addReview,
    addForumMessage,
    removeBook,
    removeUser,
    removeReview,
    removeForumMessage,
}