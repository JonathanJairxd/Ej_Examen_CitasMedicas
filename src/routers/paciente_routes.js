import {Router} from 'express'

const router = Router()

import { registrarPaciente, listarPacientes, detallePaciente, actualizarPaciente, eliminarPaciente } from '../controllers/paciente_controller.js'

import verificarAutenticacion from "../middlewares/autenticacion.js";

router.post("/registro", verificarAutenticacion ,registrarPaciente)

router.get("/listar", verificarAutenticacion ,listarPacientes)

router.get("/detalle/:id", verificarAutenticacion ,detallePaciente)

router.put("/actualizar/:id", verificarAutenticacion ,actualizarPaciente);

router.delete("/eliminar/:id", verificarAutenticacion ,eliminarPaciente);

export default router