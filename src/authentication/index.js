const jwt = require('jsonwebtoken')
const config = require('../config');
const auth = require('../modulos/auth');

const secret = config.jwt.secret;

function assignToken(data){
    return jwt.sign({ name: data.name }, secret, { expiresIn: '1h' });
}

function verifyToken(token){
    return jwt.verify(token, secret)
}

const tokenCheck = {
    confirmToken: function(req, userId){
        const decoded = decodeHeader(req);

        if(decoded.id !== userId){
            throw new Error('No tienes privilegios para hacer esto', 401)
        }
    }
}

function obtainToken(authorization){
    if(!authorization){
        throw new Error('No viene token', 401);
    }
    if(authorization.indexOf('Bearer ') === -1){
        throw new Error('Formato inválido', 401)
    }

    let token = authorization.replace('Bearer ', '')

    return token
}

function decodeHeader(req){
    const authorization = req.headers.authorization || '';
    const token = obtainToken(authorization);
    const decode = verifyToken(token);

    req.name = decode;

    return decode;
}

module.exports = {
    assignToken,
    tokenCheck
}