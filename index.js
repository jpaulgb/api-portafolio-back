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
