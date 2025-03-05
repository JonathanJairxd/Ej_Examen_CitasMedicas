import Cita from "../models/Cita.js";
import mongoose from "mongoose";

// Método para registrar una cita (CRUD - Create)
const registrarCita = async (req, res) => {
    const { codigo, descripcion, id_paciente, id_especialidad } = req.body;

    if (Object.values(req.body).includes("")) {
        return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" });
    }

    // Verificar si ya existe una cita con el mismo código
    const verificarCitaBDD = await Cita.findOne({ codigo });
    if (verificarCitaBDD) {
        return res.status(400).json({ msg: "Lo sentimos, el código de la cita ya está registrado" });
    }

    // Verificar que el paciente y la especialidad existan
    if (!mongoose.Types.ObjectId.isValid(id_paciente) || !mongoose.Types.ObjectId.isValid(id_especialidad)) {
        return res.status(400).json({ msg: "Paciente o especialidad no válidos" });
    }

    try {
        const nuevaCita = new Cita({ codigo, descripcion, id_paciente, id_especialidad });
        await nuevaCita.save();
        res.status(200).json({ msg: "Cita registrada con éxito" });
    } catch (error) {
        res.status(500).json({ msg: "Error al registrar cita" });
    }
}

// Método para listar todas las citas (CRUD - Read)
const listarCitas = async (req, res) => {
    try {
        const citas = await Cita.find()
            .select("-createdAt -updatedAt -__v")
            .populate("id_paciente", "nombre apellido email")
            .populate("id_especialidad", "nombre");
        res.status(200).json(citas);
    } catch (error) {
        res.status(500).json({ msg: "Error al obtener citas" });
    }
}

// Método para ver el detalle de una cita en particular
const detalleCita = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ msg: `Lo sentimos, no existe la cita con ID ${id}` });
    }

    try {
        const cita = await Cita.findById(id)
            .select("-createdAt -updatedAt -__v")
            .populate("id_paciente", "nombre apellido email")
            .populate("id_especialidad", "nombre");

        res.status(200).json(cita);
    } catch (error) {
        res.status(500).json({ msg: "Error al obtener cita" });
    }
}

// Método para actualizar una cita (CRUD - Update)
const actualizarCita = async (req, res) => {
    const { id } = req.params

    if (Object.values(req.body).includes("")) return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" })

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ msg: `Lo sentimos, no existe la cita con ID ${id}` });
    }

    try {
        await Cita.findByIdAndUpdate(id, req.body);
        res.status(200).json({ msg: "Cita actualizada con éxito" });
    } catch (error) {
        res.status(500).json({ msg: "Error al actualizar cita" });
    }
}

// Método para eliminar una cita (CRUD - Delete)
const eliminarCita = async (req, res) => {
    const { id } = req.params

    if (Object.values(req.body).includes("")) return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" })

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ msg: `Lo sentimos, no existe la cita con ID ${id}` });
    }

    try {
        await Cita.findByIdAndDelete(id);
        res.status(200).json({ msg: "Cita eliminada con éxito" });
    } catch (error) {
        res.status(500).json({ msg: "Error al eliminar cita" });
    }
}

export {
    registrarCita,
    listarCitas,
    detalleCita,
    actualizarCita,
    eliminarCita
}