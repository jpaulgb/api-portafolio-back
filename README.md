# Introducción a Express.js

<img src="img/JavierSanchez.png" alt="Header Javier">

## Objetivo

Vamos a desarrollar una API conectada a MongoDB. El propósito de este repositorio es centralizar la documentación necesaria para construir una API utilizando Express, ya que a su formador no le agrada completamente la que está disponible en línea. Este tutorial incluirá enlaces a secciones específicas de la documentación existente, así como información adicional propia. Además, se planea proporcionar un video de apoyo para facilitar el proceso.

## primeros pasos
Recuerda debes tener instalado [Node.js](https://nodejs.org/en/download), despues crea y entra a la carpeta donde vas a guardar el proyecto. 
```
mkdir app
cd app
```
Una vez dentro de la carpeta usa el siguiente comando para crear un archivo que contendra la informacion de configuracion del proyecto (recuerda personalizarla). Deja el punto de entrada como index.js
```
npm init -y
```

Vamos a instalar express.js

```
npm install express
```
les debe aparecer un archivo package-lock.json y una carpeta node_modules, en este momento es buena idea crear el .gitignore para que no se suba esta ultima.
```
touch .gitignore
```
dentro poner
```
node_modules
```
Ahora vamos a crear un archivo llamado index.js
```
touch index.js
```
Vamos  a instalar nodemon para que nos recarge el servidor siempre que realicemos cambios (opcional)
```
npm install nodemon --develop
```

al final de esta seccion deben tener algo parecido a esto: 



<img src="img/primeros_pasos.png" alt="estructura de carpetas y archivos al final primeros pasos">

## Hola Mundo

Dentro de index.js vamos a poner el siguiente codigo:
```
const express = require("express")
const app = express()

const PORT = 3006
app.set("port",PORT)

app.get("/",(req,res)=>{
    console.log("hola mundo")
    res.send("hola mundo")
})

app.listen(PORT,()=>{
    console.log(`Escuchando en el puerto ${PORT}`)
})

```

Para levantar el servidor vamos a correr el siguiente comando en una consola al nivel del index.js
```
node index.js
```
Si abren el navegador y escriben la dirección 127.0.0.1:3006, encontrarán el clásico "Hola Mundo".

## Prueba de Rutas

Para Detectar errores en las rutas de los archivos de manera temprana vamos a empezar creando la carpeta routes 

```
mkdir routes
touch routes/router.proyectos.js
```

y vamos a poner el siguiente código
```
const express = requiere("express")
const router = express.Router()
router.get("/"),(req,res)=>{
    console.log("hola desde rutas")
    res.send("hola desde rutas")
}
module.exports = router
``` 
despues añadimos las siguientes lineas de código a app.js
```
// esto en las importaciones
const proyectoRoutes = require("./routes/routes.proyectos.js")
// esto encima del app.get
app.use("/api/author/",authorRoutes)
```

y lo probamos en el navegador, debe aparecer el texto hola desde routes y el log esta en la consola donde se levanto el servidor.
```
127.0.0.1:3005/api/author/
```

## Prueba de Controlador
Una vez el archivo router/author esta funcionando pasamos a el controlador creamos
```
mkdir controllers
touch controllers/routes.proyectos.js
```
y ponemos el siguiente codigo:
```
exports.Hola = (req,res)=>{
    console.log("Hola desde el controlador")
    res.send("hola desde el controlador")
}
```
modificamos el archivo rotes/author

```
const express = require("express")
const proyectoControllers = require("../controllers/controllers.proyecto")
const router = express.Router()

router.get("/", proyectoControllers.Hola)

module.exports = router

```
y lo probamos en el navegador en la misma ruta anterior
## .env
instalamos dotenv aunque no es necesario en las nuevas versiones.
```
npm install dotenv
```
para probar que nos quedo bien modificamos index.js
```
const express = require("express")
const proyectoRoutes = require("./routes/routes.proyectos")//
require("dotenv").config()
const app = express()
const PORT = process.env.PORT || 3006
app.set("port",PORT)
app.get("/",(req,res)=>{
    console.log("hola mundo")
    res.send("hola mundo")
})
app.use("/api/proyectos",proyectoRoutes)//
app.listen(PORT,()=>{
    console.log(`Escuchando en el puerto ${PORT}`)
})
```
y en el archivo .env que creamos a la altura del index.js agregamos 
```
PORT = 3005
```
y no olvidar agregar el .env al .gitignore
```
node_modules
.env
```
## paso a paso para el link de mongodb
Recuerden tienen que primero crear una cuenta en MongoDB, despues crear el clouster gratis seguir los siguientes pasos:
ir a la paguina de clouster, y dar click al boton de conectar
<img src="img/clouster.png" alt="">
despues seleccionar mongogoDB for VS code
<img src="img/forVisual.png" alt="">
finalmente compiar el link y traerlo listo para la clase 
<img src="img/link.png" alt="Header Javier">
cualquier cosa me pueden escribir por whatsapp para instrucciones adicionales.

## conectar la base de datos
en .env agregamos MONGO_DB_URI que obtuvimos en el paso anterior
```
PORT = 3005
MONGO_DB_URI = "mongodb+srv://Usuario_bd:clave_del_usuario_bd_no_de_la_cuenta@cluster0.z0kf7n2.mongodb.net/"
```
Recuerden el nombre y la contraseña no es la de entrar a mongo, es la de la base de datos.
### cambios en index.js
en index.js queda:
```
const express = require("express")
const proyectoRoutes = require("./routes/routes.proyectos")//
const { default: mongoose } = require("mongoose")
require("dotenv").config()
const app = express()
const PORT = process.env.PORT || 3006
app.set("port",PORT)
app.get("/",(req,res)=>{
    console.log("hola mundo")
    res.send("hola mundo")
})
app.use(express.json())
app.use("/api/proyectos",proyectoRoutes)//
mongoose.connect(process.env.MONGO_DB_URI)
.then(()=> console.log("conect to DB"))
.catch((err)=>console.error(err.message))
app.listen(PORT,()=>{
    console.log(`Escuchando en el puerto ${PORT}`)
})
```
## Modelo
Vamos a crear el archivo proyecto.js y vamos a poner lo siguiente
```
const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ProyectoSchema = new Schema({
    nombre : {
        type : String,
        required:true,
        maxLength:100
    },
    imagen : {
        type: String,
        required : true,
        maxLength: 100
    },
    repo:{
        type: String,
        required : true,
        maxLength: 100        
    },
    tecnologias:{
        type:[String]
    },
    descripcion : {
        type: String,
        required : true,
        maxLength: 500   
    }
})

module.exports = mongoose.model("Proyecto",ProyectoSchema)
```
## controladores rutas y prueba en postman
### crear proyecto
Ahora vamos a construir los controladores y sus rutas, en models/controllers.proyecto.js agregar las lineas
```
const ProyectosModel = require("../models/proyectos")
```
```
exports.crearProyecto = async (req,res)=>{
    try {
        let nombre = req.body.nombre
        const imagen = req.body.imagen
        const repo = req.body.repo
        const tecnologias = req.body.tecnologias
        const descripcion = req.body.descripcion
        nombre = nombre.replace(/\s+/g, '_')
        await ProyectosModel.create({
            nombre,
            imagen,
            repo,
            tecnologias,
            descripcion
        })
        return res.status(201).json(nombre)
    } catch (error) {
        console.error(error)
        return res.status(500).send(error)        
    }
}
``` 
en routes/routes.proyectos.js agregar la linea
```
router.post("/",proyectoControllers.crearProyecto)

```
en postman poner la ruta 
```
127.0.0.1:3005/api/proyectos
```
y en body poner el siguiente json
```
  {
    "nombre": "Proyecto 1",
    "imagen": "proyecto-default.jpg",
    "repo": "https://github.com/usuario/proyecto",
    "tecnologias": [
      "React",
      "Bootstrap",
      "Vite"
    ],
    "descripcion": "Este es el proyecto n\u00famero 1, dise\u00f1ado para mostrar una tarjeta interactiva con modal."
  }
```
<img src="img/crear_postman.png" alt="crear proyecto en postam">

### Listar proyectos

Ya creamos, ahora vamos a ver todos los proyectos guardados
en el controlador agregamos
```
exports.proyectosList = async (req,res)=>{
    try {
        const proyectosList = await ProyectosModel.find({})
        return res.status(200).json(proyectosList)
    } catch (error) {
        return res.status(500).send(error)
    }
}
```
en rutas agregamos
```
router.get("/", proyectoControllers.proyectosList)
```
y probamos como se ve en la imagen
<img src="img/lista_postman.png" alt="listar proyectos en postam">

### Traer proyecto por ID
en el controlador agregamos 
```
exports.obtenerProyectoPorId = async (req,res)=>{
    try {
        const {id} = req.params
        const proyecto = await ProyectosModel.findById(id)
        return res.status(200).json(proyecto)
    } catch (error) {
        console.error(error)
        return res.status(500).send(error)                
    }
}
```
en rutas 
```
router.get("/:id",proyectoControllers.obtenerProyectoPorId)
```
para probar en postman es necesario que usen un id de alguno de sus registros, para eso usar el endpoint anterior y usar uno de los id de los elementos creados
<img src="img/traer_proyecto.png" alt="traer proyecto en postam">

### Modificar Proyecto

Este controlador es un poco una combinación entre el de crear y el de traer por id, el controlador quedaria:
```
exports.modificarProyecto = async (req,res)=>{
    try {
        const {id} = req.params
        const proyecto = req.body
        if(id.length!=24){
            return res.status(400).json({message:"id no valido"})
        }
        const proyectoCambiado = await ProyectosModel.findByIdAndUpdate(id,proyecto,{new:true})
        if(proyectoCambiado == null){
            return res.status(404).json({message:"proyecto no encontrado"})
        }
        return res.status(200).json(proyectoCambiado)
    } catch (error) {
        return res.status(500).send(error)                        
    }
}
```
en rutas agregamos 
```
router.put("/:id",proyectoControllers.modificarProyecto)
```
Como cuando traemos por id tenemos que usar un id de un registro de nuestra BD
<img src="img/modificar_postman.png" alt="modificar proyecto en postam">

### eliminar proyecto por id
esta funcionalidad es mas sencilla, en el controlador ponemos:
```
exports.eliminarProyecto = async (req,res)=>{
    try {
        const {id} = req.params
        if(id.length!=24){
            return res.status(400).json({message:"id no valido"})
        }
        await ProyectosModel.findByIdAndDelete(id)
        return res.status(200).json({message:`Proyecto con ${id} eliminado`})
    } catch (error) {
        return res.status(500).send(error)                        
    }
}
```
en rutas 
```
router.delete("/:id",proyectoControllers.eliminarProyecto)
```
<img src="img/eliminar_postman.png" alt="eliminar proyecto en postam">