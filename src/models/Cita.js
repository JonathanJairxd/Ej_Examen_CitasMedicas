import mongoose, { Schema, model } from "mongoose";

const citaSchema = new Schema({
    codigo:{
        type:String,
        required: true,
        trim:true,
        unique:true
    },
    descripcion:{
        type:String,
        required: true,
        trim:true
    },
    id_paciente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Paciente",
        required: true
    },
    id_especialidad: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Especialidad",
        required: true
    }
}, {
    timestamps: true
});

export default model("Cita", citaSchema);
