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
exports.eliminarProyectoPorNombre = async (req,res)=>{
    try {
        const nombre = req.body.nombre
        const {nombreParam} = req.params
        if(nombre != nombreParam){
            return res.status(400).json({message:"Datos inconsistentes"})
        }
        const proyecto = await ProyectosModel.findOneAndDelete({nombre:nombre})
        return res.status(200).json(proyecto)
    } catch (error) {
        return res.status(500).send(error)                                
    }
}
