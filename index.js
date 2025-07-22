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
