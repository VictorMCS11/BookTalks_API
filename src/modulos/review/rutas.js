const express = require('express');
const responses = require('../../red/responses');
const controller = require('./index')

const router = express.Router();

// router.get('/', async function (req, res, next){
//     try{
//         const items = await controller.all();
//         responses.success(req, res, items, 200)
//     }catch(err){
//         next();
//     }
// });

router.post('/', async function (req, res, next){
    try{
        const items = await controller.allById(req.body.id, req.body.column);
        responses.success(req, res, items, 200)
    }catch(err){
        next();
    }
});

router.post('/addReview', async function (req, res, next){
    try{
        const items = await controller.addReview(req.body);
        responses.success(req, res, items, 200)
    }catch(err){
        next();
    }
});

router.delete('/removeReview/:id', async function (req, res, next){
    try{
        const items = await controller.removeReview(req.params.id);
        responses.success(req, res, items, 200)
    }catch(err){
        next();
    }
});

module.exports = router;