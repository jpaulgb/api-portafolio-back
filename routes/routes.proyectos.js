const express = require("express")
const proyectoControllers = require("../controllers/controllers.proyecto")
const router = express.Router()

router.get("/", proyectoControllers.proyectosList)
router.post("/",proyectoControllers.crearProyecto)
router.get("/:id",proyectoControllers.obtenerProyectoPorId)
module.exports = router