const express = require('express');
const responses = require('../../red/responses');
const controller = require('./index')

const router = express.Router();

router.post('/', async function (req, res, next){
    try{
        const items = await controller.allById(req.body.id, req.body.column);
        responses.success(req, res, items, 200)
    }catch(err){
        next();
    }
});

router.post('/liked', async function (req, res, next){
    try{
        const items = await controller.allByTwoId(req.body.reviewId, req.body.userId, req.body.column1, req.body.column2);
        responses.success(req, res, items, 200)
    }catch(err){
        next();
    }
});

router.post('/addLike', async function (req, res, next){
    try{
        const items = await controller.addLike(req.body);
        responses.success(req, res, items, 200)
    }catch(err){
        next();
    }
});

router.delete('/removeLike', async function (req, res, next){
    try{
        const items = await controller.removeLike(req.body.reviewId, req.body.userId, req.body.column1, req.body.column2);
        responses.success(req, res, items, 200)
    }catch(err){
        next();
    }
});

module.exports = router;