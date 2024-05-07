# Portafolio - Backend

## Mongo DB:

Sistema gestor de bases de datos No SQL líder en el mercado

## SQL vs No SQL

- **SQL**: 
    - Relacionales: Hay un conjunto de tablas, de capsulas de información, la cual se relaciona mediante índices
    - Tablas: La información se guarda en una tabla de una manera ordenada y de un sistema claro
    - Esquema
    - Guarda información de manera separada y luego se relaciona de alguna forma

- **NoSQL**: 
    - No relacionales: No tiene por qué existir ningún tipo de relación entre una colección y otra, aunque se puede simular este funcionamiento usando código nodeJs o mongus
    - JavaScript 
    - Orientada a documentos (Json, Bson): No se tienen tablas, se tienen colecciones de documentos (objetos JSON) pero en NoSQL se tienen objetos BSON: JSON binarios
    - Sencillez
    - Velocidad: Es muy rápida la velocidad y el rendimiento a la hora de trabajar con grandes cantidades de datos
    - Esquema libre: En cada uno de los documentos, no hay por qué tener la misma cantidad de campos o de columnas como una tabla SQL

    En una base de datos noSQL también se conoce como colección en lugar de tablas, en vez de filas tiene documentos y en vez de columnas tiene campos, en vez de registros tiene datos de documentos 

## Instalar Mongo DB

- Buscar en Google Mongodb y entrar en su página oficial que es: https://www.mongodb.com/
- Click en productos
- Por defecto aparece en comunity server
- Click en download
- Lanzar el ejecutable
- Aceptar el acuerdo de licencia
- En setup type, seleccionar complete
- En service configuration, dejarlo como default
- Click next
- Click next
- Click en install
- Crear en el directorio de disco local C una carpeta llamada data
- Dentro de la carpeta data crear otra carpeta llamada db; aquí se almacenarán las bases de datos y configuraciones de mongo
- Ir a archivos de programa
- Mongo db
- Acceder a la carpeta donde están los ejecutables (bin)
- Ejecutar mongod.exe; este programa es el que se debe tener en segundo plano siempre para poder estar trabajando con mongo
- Para ejecutar consulta se ejecuta mongo.exe
- Instalar mongo 3t

# Nodejs

## Creación de backend o API Rest

Servicio o programa en el backend que permite recibir peticiones http sea por get, por post, put o delete, por diferentes métodos que afecta al protocolo http, interactúa con una base de datos y devuelve un resultado en formato JSON

Pasos para crear:

- Ir a la consola sobre la cual se esté trabajando y lanzar el comando npm init; para iniciar un proyecto de nodejs y crear el fichero package.json, donde va la configuración del proyecto, las dependencias del proyecto etc
    - Pide el nombre del proyecto
    - Version 1.0.0
    - Descripción: Agregar una descripción
    - Entry point: punto de inicio del programa; se llamará index.js
    - Test command: nada, solo se le da enter
    - Git Repository nada, se le da enter
    - KeyWords nada, solo se le da enter
    - Autor: Poner el nombre
    - Licencia: MIT; luego yes
Con esos pasos queda el proyecto nodejs creado

## Dependencias

Instalar paquetes necesarios para desarrollar el backend con js; la instalación creará una carpeta llamada node_modules que es donde instalará todas las dependencias, además, en package.json agregará una nueva línea llamada dependencies, con todas estas dependencias

- Abrir la consola que se utilice
- Ir a la carpeta del proyecto y lanzar los siguientes comandos:
    - **npm install express --save** (--save lo que hace es guardar esa dependencia en el proyecto actual, en este caso en el proyecto del backen que se va a hacer) (Framework para trabajar con el protocolo HTTP; permite definir rutas, tener un sistema de rutas, recibir peticiones HTTP, crear acciones, crear métodos y demás cosas fundamentales en cualquier desarollo web)
    - **npm install body-parser --save** (Sirve para convertir las peticiones que se hacen al backend a un objeto JSON usable por JavaScript mediante un post)
    - **npm install connect-multiparty --save** (Permite subir archivos al backend y poder trabajar con el protocolo file, puede recoger ficheros y guardarlo en una carpeta del servidor)
    - **npm install mongoose --save** (Es un ORM para trabajar con mongodb, se tiene uns serie de métodos que facilitan a la hora de trabajar con mongodb, permite crear modelos, entidades, permite hacer y trabajar con métodos que ya vienen hechos y son fáciles de usar y están documentados)
    - **npm install nodemon --save-dev** save-dev todo junto (dev indica que es una dependencia que solo va a funcionar en desarrollo, es decir que cuando se suba a un servidor, esta dependencia no tendrá que tenerse en cuenta) (Cuando se ejecute un servidor de nodejs, cada que se haga un cambio en el código, automáticamente se refresque y se vuelva a reiniciar el servidor, para no tener que hacerse manualmente)

## Alistar todo para crear el backend

- Crear el archivo index.js: es el fichero donde se va a configurar el proyecto de nodejs, la parte principal, la creación del servidor, la conexión a la base de datos, y sobre este archivo se estarán importando otros archivos

- Configurar un script en package.json
    - En el objeto JSON llamado "scripts", agregar uno llamado "start":"nodemon index.js"

## Creación de la base de datos

Utilizando Mongodb compass; seguir estos pasos para crear la base de datos:

- Abrir mongodb compass
- Donde dice databases dar click en el símbolo de más (+)
- Agregar el nombre de la base de datos y de la primera colección (tabla)
- Si se le quieren agregar datos, click en add data, insert document y agregar la información en un objeto JSON (arrojará automáticamente un id con la información agregada)
    EJEMPLO:

        {
            "name": "Blog",
            "description": "Blog personal",
            "category": "Informática",
            "langs": [
                "PHP",
                "MySQL",
                "CSS"
            ],
            "year": 2023.0
        }
        
- Si se quiere ver la información en formato JSON, se le da click en el símbolo "{}"

## Conectar mongodb con nodejs y con el proyecto

- Abrir el archivo index.js, activar el modo estricto ('use strict')
- Crear una variable que se llame mongoose; dentro de esta se cargará el módulo mongoose
    var mongoose = requiere('mongoose');
- Para la conexión a la base de datos, se debe usar el código mongoose.promise, indicándole que esto es una promesa y se iguala a global.promise
    mongoose.promise = global.promise;
- Para evitar que salga error al momento de la conexión, se pone el siguiente codigo:

    mongoose.set("strictQuery", false);

- Ahora se hace la conexión a la base de datos
    - mongoose.connect('url de la base de datos');
        - La url de una base de datos es: 'mongodb://127.0.0.1:puerto de mongo db (por defecto es 27017)/nombre de la base de datos
        - Al ser una promesa, se puede usar el método .then() para comprobar si sí conectó a la base de datos
        - En caso que haya un error, se puede capturar también

**EJEMPLO:**

    mongoose.connect('mongodb://127.0.0.1:27017/projects', {useNewUrlParser: true, useUnifiedTopology:true})
    .then(()=>{
        console.log("Conexión a la base de datos establecida exitosamente...");
    })
    .catch(err=>console.log(err));
    
- Para ejecutar el script y ver si nodejs conecta a mongodb, se usa por consola el comando npm start (dentro de la carpeta del backend)

## Creación de servidor con nodejs y express

Esto será el motor de la aplicación a nivel de backend porque express permitirá tener un sistema de rutas y recibir peticiones http y trabajar con el protocolo http de manera sencilla

pasos:

- crear un archivo llamado app.js, donde se guardará toda la configuración de express y de las peticiones body parcell

- Crear una variable para express y otra para body parser:

    var express = require('express');

    var bodyParser = require('body-parser');

    var app = express();

- Crear los middlewares (configuración necesaria):

---
   
    app.use(bodyParser.urlencoded({extended:false})); //configuración necesaria para bodyParser

    app.use(bodyParser.json());//cualquier tipo de petición se convierte a JSON
    
---
- Exportar el módulo:
    module.exports = app;

- Ir al index.js, crear una variable que se llame app, donde se carga el archivo app.js, indicando la ruta donde está

    var app = require('./app');

- Crear una variable llamada port, donde se le indica el puerto del servidor, para este ejemplo se usa el 3700

- Dentro de la conexión a la base de datos (en el then), allí crear el servidor
    - Usar el objeto app con el método listen

        app.listen(port, ()=>{
            console.log("Servidor corriendo correctamente en la URL: localhost:3700");
        });

    - Si se lanza el backend con npm start, todo debe funcionar correctamente
        - Agregar una ruta de pruebas
            - ir a app.js
            - En el apartado de rutas: 
                app.get('/',(req, res)=>{
                    res.status(200).send(
                        "< h1>Página de inicio< /h1>"
                    )//el (200 sería una respuesta exitosa por parte del servidor)
                });

                app.get('/test',(req, res)=>{
                    res.status(200).send({
                        message:"Hola mundo desde mi API de NodeJS"
                    })
                });

## Como usar el cliente RESTful

#### Métodos HTTP con los que se va a trabajar
- POST: Para guardar nuevos recursos dentro de un API o en el backend
- GET: Consultar detalle de algo, es decir sacar una información
- PUT: Para actualizar
- DELETE: Para borrar recursos de la base de datos y del backend

El cliente RESTful mas conocido y de los mejores se llama postman; para descargarlo solamente se busca en google postman y se busca la opción que vaya a descargas

Para usar postman, una vez descargado:

- click en el símbolo de +
- Puedo copiar la URL que creé, se pega en postman y se puede elegir el método HTTP que se desee
    - Con la ruta de test creada, solamente recibe peticiones por get, se le da enter o click en send y devuelve el formato JSON el resultado de esa petición


## Creación de modelos de la base de datos o entidades del backend

Para este proyecto de portafolio, en la base de datos se creó una colección llamada proyectos; pues ahora se creará una entidad llamada proyecto

- Crear una carpeta nueva llamada models, donde se crearán todos los modelos

- Agregar un archivo.js con el nombre conveniente

- Importar mongoose
    const mongoose = require ('mongoose');

- Definir un esquema de un modelo; para ello se carga el objeto de esquema
    const Schema = mongoose.Schema;

- Crear el esquema de project, el cual es el molde sobre el cual se trabajará para crear nuevos registros en la base de datos; se utiliza el objeto Schema y se le pasa como parámetro un objeto JSON con las propiedades que debe tener un proyecto
    
    var ProjectSchema = Schema({
        name: String,
        description: String,
        category: String,
        langs: [String],
        year: Number

    })

- exportar el módulo
    module.exports = mongoose.model('Project', ProjectSchema);

    **NOTA**: Project se pone en singular porque mongoose lo que hace es poner todo en minúscula y pluraliza la variable, así, en la base de datos quedaría una colección llamada projects, la cual es la que se creó y guarda los documentos en esa colección directamente
## Modelo vista controlador - MVC

Métodos y rutas que tendrá la aplicación web a nivel de backend

El MVC se encarga de separar la lógica de negocio de la interfaz de usuario.

### Controladores y rutas en node

- Importar el modelo del proyecto: 

    var Project = require('../models/project');

- Opcional (si se trabaja con imagenes, para eliminarlas si no cumple con las condiciones dadas) importar la librería fs 

    var fs = require('fs');

- Crear una carpeta dentro del backend llamada controller

- Crear un archivo.js con el nombre del controlador, para este caso será project.js

- Quitar las rutas de prueba creadas anteriormente

- Crear una variable llamada controller, dentro de esta variable habrán varios objetos JSON que en su interior contengan una función con los datos req y res necesarios:

**EJEMPLO:**
---
    var controller = {
        home: function(req, res){
            return res.status(200).send({
                message: 'Soy home'

            });

        },
        test: function(req, res){
            return res.status(200).send({
                message: 'Soy el método o acción test del controlador del project'
            })
        }

    }


- Exportar el módulo con un module.exports = variable a exportar, en este caso, controller
    module.exports=controller;

- Crear una ruta
    - Crear un fichero de rutas por cada uno de los controladores (crear una nueva carpeta llamada routes)
    - Dentro de esta carpeta crear un fichero con el mismo nombre del controlador.js, fichero configurador de las rutas del controlador en cuestión, en este caso project
    - En este archivo, importar el módulo de express
        var express = require('express');

    - Importar el controlador creado
        var projectController = require('../controllers/project');
    
    - Cargar el servicio de rutas para poder acceder a ellas
        var router=express.Router();
    
    - Crear una ruta dependiendo del método que se necesite, EJEMPLO:
        router.get('/home', projectController.home);//home es el método creado en el controlador project
        router.post('/test', projectController.test);//test es el método creado en el controlador project

    - Exportar el módulo con el método router, así se puede exportar la variable router con toda la configuración de rutas
        module.exports = router;

    - Cargar esta configuración de rutas en el app.js
        - Cargar el archivo de rutas en el apartado que se tiene para él (archivos de rutas)

            var project_routes = require('./routes/project');

        - Cargar las rutas el apartado que se tiene para rutas en el app.js, utilizando la constante creada anteriormente: 
            
            app.use('/api', project_routes)//project_routes es la variable creada donde se cargó el archivo de las rutas

## Método para guardar nuevos documentos en la base de datos

Mediante el siguiente ejemplo se muestra como guardar un nuevo documento en una colección de la base de datos

**Ejemplo:**
---
    
    //Crear un objeto dentro del JSON controller relacionado al guardado de proyectos:

    saveProject: function(req, res){
        var project = new Project(); //nuevo objeto de tipo Project

        var params = req.body;
        
        //Parámetros de la base de datos
        project.name=params.name;
        project.description=params.description;
        project.category=params.category;
        project.langs=params.langs;
        project.year=params.year;
        project.image=null; // Se añade mas tarde

        //Guardar el proyecto en la base de datos, recibe parámetos de error y de proyecto guardado
        project.save((err, projectStored)=>{
            //Si arroja un error:
            if (err) return res.status(500).send({message:'Error al guardar datos'});/**status 500 error */

            //Si no se guarda el project stored
            if(!projectStored) return res.status(404).send({message:'No se ha podido guardar el proyecto'});
                    //404 error al guardar
        
            //En caso de que guarde bien
            return res.status(200).send({project:projectStored});/**Si no se pone la propiedad project
            y solamente se pasa projectStored, crearía una propiedad llamada projectSotred, esto guarda
            en la base de datos el nuevo proyecto */
            
        });
        

    }

- Crear una ruta (en el archivo de rutas)

    router.post('/save-project', projectController.saveProject);//Carga el método save project en esta ruta

- Ir a postman, hacer una petición por POST:

    http://localhost:3700/api/save-project

    - Verificar, agregando estos parametros en postman en la opción body/x-www.form-urlencoded; Postman agrega automáticamente un id

## Obtener un proyecto de la base de datos por su id

Mediante el siguiente ejemplo se muestra como guardar un nuevo documento en una colección de la base de datos

**EJEMPLO**

    //Crear método llamado getProject, recibiendo como parámetros request y reponse
    getProject: function(req,res){

        //Recoger el valor del id del proyecto que llega por la url
        var projectId = req.params.id;

        //-----------------------------------------------------
        //Si se pone en la dirección opcional se hace este paso: 

        if (projectId==null) return res.status(404).send({message: 'El proyecto no existe'});

        //-----------------------------------------------------

        //Buscar el proyecto mediante el id ingresado por la url
        
        Project.findById(projectId,(err, project)=>{
            if (err) return res.status(500).send({message:'Error al devolver los datos'});
            if (!project) return res.status(404).send({message: 'El proyecto no existe'});
            return res.status(200).send({project})

        }); //Un find con mongoose, simplemente es buscar una cosa de la base de datos

    }

- Crear la ruta
    router.get('/project/:id?', projectController.getProject);

- En postman, abrir la url que se creó y el id del proyecto; ejemplo: localhost:3700/api/proyecto/63f6d0468cb657b25e854a41 y verificar si sí aparece

## Devolver el listado de proyectos

Para ver como devolver un listado de registros de la base de datos; se explicará con el siguiente código:


**EJEMPLO**

    // Obtener la lista completa de la base de datos
    getProjects: function(req,res){

        /*Se usa .find({}) para obtener la lista completa .sort('year') para ordenar la lista por año 
        (se puede usar -year para cambiar el orden la lista) y .exec para la función de callback*/

        Project.find({}).sort('year').exec((err, projects)=>{
            if (err) return res.status(500).send({message:'Error al cargar los datos'});
            if (!projects) return res.status(404).send({message: 'No hay proyectos a mostrar'});
            return res.status(200).send({projects});

        });/*Find lo que hace es sacar todos los documentos que hay dentro de 
        una entidad o colección*/

    }

- Crear la ruta

    router.get('/projects', projectController.getProjects);

- Buscar en postman por método get con la url creada; ejemplo: localhost:3700/api/projects

## Actualizar datos
Para ver como actualizar un registro de la base de datos; se explicará con el siguiente código:

**EJEMPLO**

    //Actualizar un proyecto

    updateProject:function(req,res){
        //Recoger por la url el id del documento a actualizar
        var projectID = req.params.id;

        //Objeto completo con los datos del proyecto a actualizar
        var update = req.body; //objeto completo con los datos actualizados del proyecto

        //Buscar el proyecto por el id del proyecto y actualizarlo
        Project.findByIdAndUpdate(projectID, update, {new:true} ,(err, projectUpdated)=>{
            if (err) return res.status(500).send({message:'Error al actualizar el proyecto'});
            if (!projectUpdated) return res.status(404).send({message:'No existe el proyecto solicitado'});
            return res.status(200).send({project:projectUpdated});

        });

    }

Usar el modelo Project con el método findbyIdAndUpdate; si le paso un objeto, pues actualiza el documento que tenga en la base de datos con el objeto que se le haya pasado. Como parámetro se le pasa la variable anteriormente creada como projectID para que el método sepa que documento de la base de datos tiene que actualizar y luego el objeto update para sustituir los datos que vaya en el objeto por los nuevos, como tercer parámetro se le pasa una función de callback (error y projectUpdated)

Crear una ruta nueva

    router.put('/project/:id', projectController.updateProject);

## Borrar proyectos de la base de datos desde el backend

Para ver como eliminar un registro de la base de datos; se explicará con el siguiente código:

**EJEMPLO**

    deleteProject: function(req,res){

        //Se recoge mediante la url el registro que se quiere eliminar
        var projectID = req.params.id;

        //Se utilizar el findByIdAndRemove, pasando como parámetros el id creado anteriormente, y una función de callback
        Project.findByIdAndRemove(projectID, (err,projectRemoved)=>{
            if (err) return res.status(500).send({message:'Error al eliminar el proyecto'});
            if (!projectRemoved) res.status(404).send({message:'No se puede eliminar ese proyecto'});
            return res.status(200).send({project:projectRemoved});

        });

    }

- Crear la ruta

    router.delete('/delete/:id', projectController.deleteProject);

- Eliminar en postman por método delete con la url creada; ejemplo: localhost:3700/api/delete/id
- Verificar que se haya eliminado de la base de datos
## Subir imagenes

Para ver como agregar una imagen en la base de datos; se explicará con el siguiente código:

- Importar una librería llamada fs

    var fs = require('fs');
    
**EJEMPLO DEL CÓDIGO**

uploadImage: function(req,res){

        //Recoger id del proyecto sobre el cual se guardará la imagen
        var projectId = req.params.id;

        //Variable por defecto en caso que no suba la imagen
        var failName = 'Imagen no subida...';
        
        //En caso que exista este elemento con los archivos que se vayan subiendo, que haga:
        if (req.files){
            //Sacar diferentes valores para guardar esa imagen en la base de datos
            var filePath = req.files.image.path;

            //omar el nombre del archivo guardado en el disco, pasando como parámetro el separador que aparece en la parte path del archivo subido, en windows aparece por doble barra invertida
            var fileSplit = filePath.split('\\');

            //guardará el valor de la posición 1 de fileSplit, que es el nombre del archivo subido
            var fileName = fileSplit[1];

            //Sacar separar la extensión de la imagen
            var extSplit = fileName.split('\.');

            //Guardar la extensión de la imagen
            var fileExt = extSplit[1];

            //validar que se subió una imagen y guardar todo lo del findByIdAndUpdate dentro de este if
            if(fileExt=='png' || fileExt == 'jpg' || fileExt=='jpeg' || 'gif'){
                Project.findByIdAndUpdate(projectId, {image:fileName},{new:true}, (err,projectUpdated)=>{
                    if (err) return res.status(500).send({message:'La imagen no se ha subido'});
    
                    if (!projectUpdated) return res.status(404).send({message:'La imagen no existe'});
                    
                    return res.status(200).send({project:projectUpdated});
    
                });
            }else{
                fs.unlink(filePath, (err)=>{
                    return res.status(200).send({message:'La extensión no es válida'});
                });

            }         

        }
    
    }

-  Configurar el connect multiparty
    - Ir al fichero de las rutas, configurar un middleware (que es un método que se ejecute antes de que se ejecute el método o la acción del controlador)
        - Crear una variable que se llame multipart; la cual importe el connect multi party
            var multipart = require('connect-multiparty');

        - Crear una variable para indicar donde se guardarán los archivos y las imagenes subidas a la base de datos
            var multipartMiddleware = multipart({ uploadDir: './uploads'});
        
    - Crear la carpeta uploads dentro de donde se está haciendo el backend

- Crear la ruta, aplicando el middleware configurado del connect multiparty, pasandolo como segundo parámetro

    router.post('/upload-image/:id', multipartMiddleware,projectController.uploagImage);

- Ir a postman y hacer los siguientes pasos:
    - Abrir alguno de los documentos guardados en la base de datos (copiar su id)
    - Pegar la ruta con el id copiado en postman (con método post)
    - Seleccionar la pestaña body el radio button form data
    - Donde dice key escribir el nombre, en este caso image
    - Donde dice text, seleccionar el desplegable y seleccionar file, darle click en select file y selecciona un archivo y ejecutar la acción dando click en send



## Configuración de CORS en nodejs

Permite acceso cruzado entre dominios y evita fallos a la hora de trabajar la parte de frontend con la parte del backend

- Abrir el app.js
- En la parte que se comentó en la creación de este repositorio de CORS
- Pegar el siguiente código:
    // Configurar cabeceras y cors
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
        next();
    });

- Siempre se ejecuta esto antes de cada petición, va a configurar las cabeceras y pasará a la ejecución de las rutas y el método o la acción correspondiente, así se permite el acceso de un dominio a otro y no habrá problema para desarrollar la aplicación en el frontend

## Método para devolver una imagen desde el backend

En el controlador de project, agregar este método:

---
getImageFile: function(req,res){
        //Nombre del archivo, que se le va a pasar por la URL
        var file = req.params.image;
        var path_file = './uploads/'+file;

        fs.stat(path_file,(err, stats)=>{
            if (err){
                return res.status(200).send({
                    message:"No existe la imagen..."

                });

            }if (stats.isFile()){
                return res.sendFile(path.resolve(path_file));

            }else{
                return res.status(200).send({
                    message:"No es un archivo..."
                
                });

            }

        });

    }

---

Crear la ruta para este método