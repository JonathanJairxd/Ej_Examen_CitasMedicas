import Especialidad from "../models/Especialidad.js";

import mongoose from "mongoose";

// Método para registrar una especialidad (CRUD - Create)
const registrarEspecialidad = async (req, res) => {
    const { codigo, nombre, descripcion } = req.body

    if (Object.values(req.body).includes("")) {
        return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" });
    }

    // Verificar si ya existe una especialidad con el mismo código
    const verificarEspecialidadBDD = await Especialidad.findOne({ codigo })
    if (verificarEspecialidadBDD) {
        return res.status(400).json({ msg: "Lo sentimos, el código de especialidad ya está registrado" });
    }

    try {
        const nuevaEspecialidad = new Especialidad({ codigo, nombre, descripcion });
        await nuevaEspecialidad.save();
        res.status(200).json({ msg: "Especialidad registrada con éxito" });
    } catch (error) {
        res.status(500).json({ msg: "Error al registrar especialidad" });
    }
}

// Método para listar todas las especialidades (CRUD - Read)
const listarEspecialidad = async (req, res) => {
    try {
        const especialidades = await Especialidad.find().select("-__v");
        res.status(200).json(especialidades);
    } catch (error) {
        res.status(500).json({ msg: "Error al obtener especialidades" });
    }
}

// Método para ver el detalle de una especialidad en particular
const detalleEspecialidad = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ msg: `Lo sentimos, no existe la especialidad con ID ${id}` });
    }

    try {
        const especialidad = await Especialidad.findById(id).select("-__v");
        res.status(200).json(especialidad);
    } catch (error) {
        res.status(500).json({ msg: "Error al obtener especialidad" });
    }
}

// Método para actualizar una especialidad (CRUD - Update)
const actualizarEspecialidad = async (req, res) => {
    const { id } = req.params

    if (Object.values(req.body).includes("")) return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" })

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ msg: `Lo sentimos, no existe la especialidad con ID ${id}` });
    }

    try {
        await Especialidad.findByIdAndUpdate(id, req.body);
        res.status(200).json({ msg: "Especialidad actualizada con éxito" });
    } catch (error) {
        res.status(500).json({ msg: "Error al actualizar especialidad" });
    }
}

// Método para eliminar una especialidad (CRUD - Delete)
const eliminarEspecialidad = async (req, res) => {
    const { id } = req.params;

    if (Object.values(req.body).includes("")) return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" })

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ msg: `Lo sentimos, no existe la especialidad con ID ${id}` });
    }

    try {
        await Especialidad.findByIdAndDelete(id);
        res.status(200).json({ msg: "Especialidad eliminada con éxito" });
    } catch (error) {
        res.status(500).json({ msg: "Error al eliminar especialidad" });
    }
}

export {
    registrarEspecialidad,
    listarEspecialidad,
    detalleEspecialidad,
    actualizarEspecialidad,
    eliminarEspecialidad
}