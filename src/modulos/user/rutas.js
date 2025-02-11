const express = require('express');
const security = require('./security')
const responses = require('../../red/responses');
const controller = require('./index');

const router = express.Router();

// router.get('/', async function (req, res, next){
//     try{
//         const items = await controller.all();
//         responses.success(req, res, items, 200)
//     }catch(err){
//         next();
//     }
// });

router.get('/:id', async function (req, res, next){
    try{
        const items = await controller.oneById(req.params.id);
        responses.success(req, res, items, 200)
    }catch(err){
        next();
    }
});

router.post('/', async function (req, res, next){
    try{
        const items = await controller.oneByName(req.body.name, req.body.column);
        responses.success(req, res, items, 200)
    }catch(err){
        next();
    }
});

router.post('/addUser', async function (req, res, next){
    try{
        const items = await controller.addUser(req.body);
        responses.success(req, res, items, 200)
    }catch(err){
        next();
    }
});

// router.put('/delete/:id', async function (req, res, next){
//     try{
//         const items = await controller.removeUser(req.params.id);
//         responses.success(req, res, items, 200)
//     }catch(err){
//         next();
//     }
// });
// router.put('/removeUser/:id', async function (req, res, next){
//     try{
//         const items = await controller.removeUser(req.params.id);
//         responses.success(req, res, items, 200)
//     }catch(err){
//         next();
//     }
// });

module.exports = router;