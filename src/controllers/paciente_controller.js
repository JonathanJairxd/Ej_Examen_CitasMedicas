import Paciente from "../models/Paciente.js"
import mongoose from "mongoose"


// Método para crear un paciente
const registrarPaciente = async (req, res) => {

    // desestructurar el email
    const { email } = req.body

    //  Validar todos los camposs
    if (Object.values(req.body).includes("")) return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" })

    // Obtener el usuario en base al email
    const verificarEmailBDD = await Paciente.findOne({ email })

    // Verificar si el paciente ya se encuentra registrado
    if (verificarEmailBDD) return res.status(400).json({ msg: "Lo sentimos, el email ya se encuentra registrado" })
    
    try{
        // Crear una instancia del Paciente
        const nuevoPaciente = new Paciente(req.body)
        // Guardar en BDD
        await nuevoPaciente.save()
        // Presentar resultados
        res.status(200).json({ msg: "Paciente registrado con éxito" })
    } catch(error){
        res.status(500).json({ msg: "Error al registrar paciente" })
    }
}



// Método para listar todos los pacientes (CRUD - Read)
const listarPacientes = async (req, res) => {
    try {
        const pacientes = await Paciente.find().select("-createdAt -updatedAt -__v");
        res.status(200).json(pacientes);
    } catch (error) {
        res.status(500).json({ msg: "Error al obtener pacientes" });
    }
}

// Método para ver el detalle de un paciente en particular
const detallePaciente = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ msg: `Lo sentimos, no existe el paciente con ID ${id}` });
    }

    try {
        const paciente = await Paciente.findById(id).select("-createdAt -updatedAt -__v");
        res.status(200).json(paciente);
    } catch (error) {
        res.status(500).json({ msg: "Error al obtener paciente" });
    }
}


// Método para actualizar un paciente (CRUD - Update)
const actualizarPaciente = async (req, res) => {
    const { id } = req.params

    if (Object.values(req.body).includes("")) return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" })

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ msg: `Lo sentimos, no existe el paciente con ID ${id}` });
    }

    try {
        await Paciente.findByIdAndUpdate(id, req.body);
        res.status(200).json({ msg: "Paciente actualizado con éxito" });
    } catch (error) {
        res.status(500).json({ msg: "Error al actualizar paciente" });
    }
}


// Método para eliminar (dar de baja) un paciente (CRUD - Delete)
const eliminarPaciente = async (req, res) => {
    const { id } = req.params

    if (Object.values(req.body).includes("")) return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" })

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ msg: `Lo sentimos, no existe el paciente con ID ${id}` });
    }

    try {
        await Paciente.findByIdAndDelete(id);
        res.status(200).json({ msg: "Paciente eliminado con éxito" });
    } catch (error) {
        res.status(500).json({ msg: "Error al eliminar paciente" });
    }
}


export {
    registrarPaciente,
    listarPacientes,
    detallePaciente,
    actualizarPaciente,
    eliminarPaciente
}