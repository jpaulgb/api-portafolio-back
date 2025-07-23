const ProyectosModel = require("../models/proyectos")
exports.Hola = (req,res)=>{
    console.log("hola desde el controlador")
    res.send("hola desde el controlador")
}
exports.proyectosList = async (req,res)=>{
    try {
        const proyectosList = await ProyectosModel.find({})
        return res.status(200).json(proyectosList)
    } catch (error) {
        return res.status(500).send(error)
    }
}
exports.crearProyecto = async (req,res)=>{
    try {
        const proyecto = req.body
        await ProyectosModel.create(proyecto)
        return res.status(201).json(proyecto)
    } catch (error) {
        return res.status(500).send(error)        
    }
}

