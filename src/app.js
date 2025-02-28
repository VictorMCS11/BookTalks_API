const express = require('express');
const config = require('./config.js');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const app = express();

const user = require('./modulos/user/rutas.js');
const auth = require('./modulos/auth/rutas.js');
const book = require('./modulos/book/rutas.js');
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
    origin: ['http://booktalks.site', 'http://192.168.1.107:5173', 'http://192.168.1.107:5174', 'http://localhost:5173', 'http://localhost:5174'],  // Permite todos los orígenes (no recomendado en producción),
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    credentials: true, // Si necesitas enviar cookies o encabezados de autenticación
}));

//configuración
app.set('port', config.app.port);

//Comprobar que funciona correctamente
app.get('/', (req, res) => {
    res.send('API funcionando correctamente 🚀');
});

//rutas
app.use('/api/users', user);
app.use('/api/login', auth);
app.use('/api/books', book);
app.use('/api/reviews', review);
app.use('/api/forums', forum);
app.use('/api/forumMessages', forumMessage);
app.use('/api/likeReview', likeReview);
app.use(error);

module.exports = app; 