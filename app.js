'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var app =express();

// cargar archivos de rutas
var project_routes = require('./routes/project');

//middlewares (método que se ejecuta antes de ejecutar la acción de un controlador)
app.use(bodyParser.urlencoded({extended:false})); //configuración necesaria para bodyParser
app.use(bodyParser.json());//cualquier tipo de petición se convierte a JSON
app.use(express.json());


// Configurar cabeceras y CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');/**Cuando se vaya a publicar la aplicación, en lucar de *
    se tiene que poner la url permitida o los origenes permitidos*/
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//rutas
app.use('/api',project_routes);

// exportar el módulo 

module.exports = app; //Exporta app que es la que tiene toda la configuración de los middlewares