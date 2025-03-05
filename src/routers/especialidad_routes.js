import {Router} from 'express'

const router = Router()

import { registrarEspecialidad, 
    listarEspecialidad, 
    detalleEspecialidad, 
    actualizarEspecialidad, 
    eliminarEspecialidad } from '../controllers/especialidad_controller.js'


    import verificarAutenticacion from "../middlewares/autenticacion.js";

    router.post("/registro", verificarAutenticacion ,registrarEspecialidad)
    
    router.get("/listar", verificarAutenticacion ,listarEspecialidad)
    
    router.get("/detalle/:id", verificarAutenticacion ,detalleEspecialidad)
    
    router.put("/actualizar/:id", verificarAutenticacion ,actualizarEspecialidad);
    
    router.delete("/eliminar/:id", verificarAutenticacion ,eliminarEspecialidad);
    
    export default router