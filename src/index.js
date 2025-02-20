const app = require('./app.js');

app.listen(app.get('port'), '0.0.0.0', () =>{
    console.log('Servidor escuchando en el puerto', app.get('port'));
});