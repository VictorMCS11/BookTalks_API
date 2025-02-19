const express = require('express');
const config = require('./config.js');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const app = express();

const user = require('./modulos/user/rutas.js');
const auth = require('./modulos/auth/rutas.js');
const book = require('./modulos/book/rutas.js');
// const bookCover = require('./images/bookcovers');
const review = require('./modulos/review/rutas.js');
const forum = require('./modulos/forum/rutas.js');
const forumMessage = require('./modulos/forum_message/rutas.js');
const likeReview = require('./modulos/like_review/rutas.js');

const error = require('./red/errors.js')

//Middleware 
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'images/bookcovers')))
app.use(cors({
    origin: function (origin, callback) {
        // Lista de orígenes permitidos
        const allowedOrigins = [
            'http://185.166.39.53', // IP de tu frontend en Hostinger
            'http://localhost:5174', // Si quieres permitir tu frontend en localhost
            // Puedes añadir más orígenes aquí
        ];

        if (allowedOrigins.indexOf(origin) !== -1 || !origin) { // !origin permite acceso desde herramientas como Postman
            callback(null, true); // Permite el origen
        } else {
            callback(new Error('No permitido por CORS'), false); // Rechaza la solicitud
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    credentials: true, // Si necesitas enviar cookies o encabezados de autenticación
}));

//configuración
app.set('port', config.app.port);

//rutas
app.use('/api/users', user);
app.use('/api/login', auth);
app.use('/api/books', book);
// app.use('/api/bookcover', bookCover);
app.use('/api/reviews', review);
app.use('/api/forums', forum);
app.use('/api/forumMessages', forumMessage);
app.use('/api/likeReview', likeReview);
app.use(error);

module.exports = app; 