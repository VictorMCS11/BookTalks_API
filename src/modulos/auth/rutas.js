const express = require('express');
const responses = require('../../red/responses');
const controller = require('./index')

const router = express.Router();

router.post('/', async function (req, res, next){
    try{
        const items = await controller.login(req.body.name, req.body.password, req.body.column);
        responses.success(req, res, items, 200)
    }catch(err){
        next();
    }
});

module.exports = router;