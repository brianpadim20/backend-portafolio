'use strict'

//Constantes

const mongoose = require('mongoose'); //Solicita mongoose para conectarse a la bd
const app = require('./app');
const port = 3700

//Se crea la promesa global
mongoose.Promise = global.Promise; 

//Para que no arroje ningún mensaje al ejectuar por consola
mongoose.set("strictQuery", false); 

//Conexión a la base de datos

mongoose.connect('mongodb://127.0.0.1:27017/projects', {useNewUrlParser: true, useUnifiedTopology:true})
.then(()=>{
    console.log("Conexión a la base de datos establecida exitosamente...");

    //Creación del servidor
    app.listen(port, ()=>{
        console.log("Servidor corriendo correctamente en la URL: localhost:3700");
    });

})
.catch(err=>console.log(err)); 