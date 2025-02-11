const auth = require('../../authentication');

module.exports = function authCheck(){
    function middleware(req, res, next){
        const id = req.body.userId
        auth.tokenCheck.confirmToken(req, id);
        next();
    }
    return middleware
}