// Requerir los módulos
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';

// Se importan las rutas del usuario

import routerUsuario from './routers/usuario_routes.js';

import routerPaciente from './routers/paciente_routes.js';

import routerEspecialidad from './routers/especialidad_routes.js';

import routerCita from './routers/cita_routes.js';

// Inicializaciones
const app = express()
dotenv.config()

// Configuraciones 
app.set('port',process.env.port || 3000)
app.use(cors())

// Middlewares 
app.use(express.json())


// Rutas 
app.get('/',(req,res)=>{
    res.send("Server on")
})


// Ruta del usuario
app.use('/api/usuario',routerUsuario)

app.use('/api/paciente',routerPaciente)

app.use('/api/especialidad', routerEspecialidad)

app.use('/api/cita', routerCita)

// Rutas no encontradas
app.use((req,res)=>res.status(404).send("Endpoint no encontrado - 404"))


// Exportar la instancia de express por medio de app
export default  app