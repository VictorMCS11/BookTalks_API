const express = require('express');
const responses = require('../../red/responses');
const controller = require('./index');
const multer = require('multer')
const path = require('path');

const router = express.Router();

const diskStorage = multer.diskStorage({
    destination: path.join(__dirname + '../../../images/bookcovers'),
    filename: (req, file, cb) =>{
        cb(null, Date.now() + '-bookcover-' + file)
    }
})

const fileUpload = multer({
    storage: diskStorage
}).single('image')

router.get('/', async function (req, res, next){
    try{
        const items = await controller.all();
        responses.success(req, res, items, 200)
    }catch(err){
        next();
    }
});
router.post('/bookSearch', async function (req, res, next){
    try{
        const items = await controller.allByTitle(req.body.title, req.body.column);
        responses.success(req, res, items, 200)
    }catch(err){
        next();
    }
});

router.get('/:id', async function (req, res, next){
    try{
        const items = await controller.oneById(req.params.id);
        responses.success(req, res, items, 200)
    }catch(err){
        next();
    }
});

router.post('/book', async function (req, res, next){
    try{
        const items = await controller.oneByTitle(req.body.title, req.body.column);
        responses.success(req, res, items, 200)
    }catch(err){
        next();
    }
});

// router.get('/images', async function (req, res, next){
//     try{
//         const items = await controller.oneByTitle(req.params.title);
//         responses.success(req, res, items, 200)
//     }catch(err){
//         next();
//     }
// });

router.post('/addBook', async function (req, res, next){
    try{
        const items = await controller.addBook(req.body);
        responses.success(req, res, items, 200)
    }catch(err){
        next();
    }
});

router.put('/removeBook/:id', async function (req, res, next){
    try{
        const items = await controller.removeBook(req.params.id);
        responses.success(req, res, items, 200)
    }catch(err){
        next();
    }
});

module.exports = router;