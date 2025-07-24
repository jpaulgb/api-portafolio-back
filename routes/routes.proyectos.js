const express = require("express")
const proyectoControllers = require("../controllers/controllers.proyecto")
const router = express.Router()

router.get("/", proyectoControllers.proyectosList)
router.post("/",proyectoControllers.crearProyecto)
router.get("/:id",proyectoControllers.obtenerProyectoPorId)
router.put("/:id",proyectoControllers.modificarProyecto)
router.delete("/:id",proyectoControllers.eliminarProyecto)
router.delete("/nombre/:nombreParam", proyectoControllers.eliminarProyectoPorNombre)
module.exports = router