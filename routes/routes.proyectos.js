const express = require("express")
const proyectoControllers = require("../controllers/controllers.proyecto")
const router = express.Router()

router.get("/", proyectoControllers.proyectosList)
router.post("/",proyectoControllers.crearProyecto)

module.exports = router