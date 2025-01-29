const respuestas = require('./responses');

function errors(err, req, res, next){
    console.log('[error', err)
    const message = err.message || 'Internal error';
    const status = err.statusCode || 500;

    respuestas.error(req, res, message, status);
}

module.exports = errors;
