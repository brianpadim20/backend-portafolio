'use strict'
const nodemailer = require('nodemailer')

//importar el modelo projecs
var Project = require('../models/project');

//Importar la librería fs (para eliminar imagenes en caso que no cumplan con la condición
var fs = require('fs');

//importar el objeto path (Módulo de nodeJS que permite cargar rutas físicas del sistema de archivos)
var path = require('path')
/**
 * la función recibe una request y una response (req, res), req es para recibir los datos que
 * se envíen por post y res es para retornar una respuestastatus 200 (bien recibido) enviando 
 * un mensaje
 */

var controller = {
    home: function(req, res){
        return res.status(200).send({
            mensaje: 'Soy home'

        });

    },
    test: function(req, res){
        return res.status(200).send({
            mensaje: 'Soy el método o acción test del controlador del project'
            
        });
    },
    
    //Guardar una nueva colección en la base de datos
    saveProject: function(req, res){
        var project = new Project(); //nuevo objeto de tipo Project

        var params = req.body;

        project.nombre=params.nombre;
        project.description=params.description;
        project.category=params.category;
        project.langs=params.langs;
        project.year=params.year;
        project.image=null; // Se añade mas tarde

        project.save((err, projectStored)=>{
            //Si arroja un error:
            if (err) return res.status(500).send({mensaje:'Error al guardar datos'});/**status 500 error */

            //Si no se guarda el project stored
            if(!projectStored) return res.status(404).send({mensaje:'No se ha podido guardar el proyecto'});
                    //404 error al guardar
        
            //En caso de que guarde bien
            return res.status(200).send({project:projectStored});/**Si no se pone la propiedad project
            y solamente se pasa projectStored, crearía una propiedad llamada projectSotred, esto guarda
            en la base de datos el nuevo proyecto */
            
        });
        

    },

    //Obtener un proyecto de la base de datos
    getProject: function(req,res){
        var projectId = req.params.id;

        //-----------------------------------------------------
        //Si se pone en la dirección opcional se hace este paso: 

        if (projectId==null) return res.status(404).send({mensaje: 'El proyecto no existe'});

        //-----------------------------------------------------
        
        Project.findById(projectId,(err, project)=>{
            if (err) return res.status(500).send({mensaje:'Error al devolver los datos'});
            if (!project) return res.status(404).send({mensaje: 'El proyecto no existe'});
            return res.status(200).send({project})

        }); //Un find con mongoose, simplemente es buscar una cosa de la base de datos

    },
    
    // Obtener la lista completa de la base de datos
    getProjects: function(req,res){
        Project.find({}).sort('year').exec((err, projects)=>{
            if (err) return res.status(500).send({mensaje:'Error al cargar los datos'});
            if (!projects) return res.status(404).send({mensaje: 'No hay proyectos a mostrar'});
            return res.status(200).send({projects});

        });/*Find lo que hace es sacar todos los documentos que hay dentro de 
        una entidad o colección*/

    },

    //Actualizar un proyecto
    updateProject:function(req,res){
        var projectID = req.params.id;
        var update = req.body; //objeto completo con los datos actualizados del proyecto

        Project.findByIdAndUpdate(projectID, update, {new:true} ,(err, projectUpdated)=>{
            if (err) return res.status(500).send({mensaje:'Error al actualizar el proyecto'});
            if (!projectUpdated) return res.status(404).send({mensaje:'No existe el proyecto solicitado'});
            return res.status(200).send({project:projectUpdated});

        });

    },

    //Eliminar un proyecto
    deleteProject: function(req,res){
        var projectID = req.params.id;
        Project.findByIdAndRemove(projectID, (err,projectRemoved)=>{
            if (err) return res.status(500).send({mensaje:'Error al eliminar el proyecto'});
            if (!projectRemoved) res.status(404).send({mensaje:'No se puede eliminar ese proyecto'});
            return res.status(200).send({project:projectRemoved});

        });

    },

    uploadImage: function(req,res){
        //Recoger id del proyecto sobre el cual se guardará la imagen
        var projectId = req.params.id;
        var failnombre = 'Imagen no subida...';

        if (req.files){//En caso que exista este elemento con los archivos que se vayan subiendo, que haga:
            var filePath = req.files.image.path;
            var fileSplit = filePath.split('\\');
            var filenombre = fileSplit[1];
            var extSplit = filenombre.split('\.');
            var fileExt = extSplit[1];

            if(fileExt=='png' || fileExt == 'jpg' || fileExt=='jpeg' || 'gif'){
                Project.findByIdAndUpdate(projectId, {image:filenombre},{new:true}, (err,projectUpdated)=>{
                    if (err) return res.status(500).send({mensaje:'La imagen no se ha subido'});
    
                    if (!projectUpdated) return res.status(404).send({mensaje:'La imagen no existe'});
                    
                    return res.status(200).send({project:projectUpdated});
    
                });
            }else{
                fs.unlink(filePath, (err)=>{
                    return res.status(200).send({mensaje:'La extensión no es válida'});
                });

            }         

        }else{
            return res.status(200).send({mensaje:failnombre});
        
        }

    },

    //Método para obtener imagen desde la API
    getImageFile: function(req,res){
        //Nombre del archivo, que se le va a pasar por la URL
        var file = req.params.image;
        var path_file = './uploads/'+file;

        fs.stat(path_file,(err, stats)=>{
            if (err){
                return res.status(200).send({
                    mensaje:"No existe la imagen..."

                });

            }if (stats.isFile()){
                return res.sendFile(path.resolve(path_file));

            }else{
                return res.status(200).send({
                    mensaje:"No es un archivo..."
                
                });

            }

        });

    },

    //Método para enviar correos alcorreo
    sendForm: function (req, res) {
        var { nombre, correo, telefono, mensaje } = req.body;
        const transporter = nodcorreoer.createTransport({
            host:"smtp.gmail.com",
            // port:3700,
            // secure:true,
            auth:{
                user:"portafoliobps@gmail.com",
                pass:"Munch3n123"

            }

        });

        async function main(){
            const info = await transporter.sendMail({
                from:"portafoliobps@gmail.com",
                to:"brianpadim@gmail.com",
                telefono: telefono,
                text: `Nombre: ${nombre}\nCorreo: ${correo}\nAsunto: ${telefono}\nMensaje: ${mensaje}`

            });

            console.log("Mensaje enviado: %s", info.mensajeId)
        }

    }

};

module.exports=controller;