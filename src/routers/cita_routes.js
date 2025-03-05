import {Router} from 'express'

const router = Router()

import { registrarCita, listarCitas, detalleCita, 
    actualizarCita, eliminarCita
} from '../controllers/cita_controller.js'

import verificarAutenticacion from "../middlewares/autenticacion.js";

router.post("/registro", verificarAutenticacion ,registrarCita)

router.get("/listar", verificarAutenticacion ,listarCitas)

router.get("/detalle/:id", verificarAutenticacion ,detalleCita)

router.put("/actualizar/:id", verificarAutenticacion ,actualizarCita)

router.delete("/eliminar/:id", verificarAutenticacion ,eliminarCita)

export default router