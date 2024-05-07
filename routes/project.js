'use strict'

//Importar el módulo express, para poder crear las rutas
var express = require('express');

//Importar el controlador de projects
var projectController = require('../controllers/project');

//Cargar el router o servicio de rutas para acceder a ellas
var router=express.Router();

//Configuración del middleware para el connect-multiparty
var multipart=require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir:'./uploads'});

//crear una ruta por get, en este caso será la ruta home
//home es el método creado en el controlador project
router.get('/home', projectController.home);

//test es el método creado en el controlador project
router.post('/test', projectController.test);

//Carga el método save project en esta ruta (guardar un nuevo proyecto)
router.post('/save-project', projectController.saveProject);

//Obtener un proyecto desde la base de datos
router.get('/project/:id?', projectController.getProject); /*Se le pasa parámetro por la url que sea 
obligatorio (/:id), si se quiere que el parámetro sea opcional, se le pone un signo de iterrogación al 
final (/id?), si queda vacío, se toma como null */

//Lista de proyectos de la base de datos
router.get('/projects', projectController.getProjects);

//Actualizar un proyecto 
router.put('/project/:id', projectController.updateProject);/**En este caso, el id no es opcional
puesto que se necesita un ID para actualizar un proyecto */

//Elimina un proyecto
router.delete('/project/:id', projectController.deleteProject);

//Subir imagenes (con el middleware configurado)
router.post('/upload-image/:id', multipartMiddleware, projectController.uploadImage);

//Obtener imagen desde la API
router.get('/get-image/:image', projectController.getImageFile);

// Ruta para enviar el correo del formulario
router.post('/api/send-mail', projectController.sendForm);

//Exportar la ruta; así se puede usar la variable router, con toda la configuración de rutas fuera de aquí
module.exports = router;