import { Schema, model } from "mongoose";

const pacienteSchema = new Schema({
    nombre:{
        type:String,
        require:true,
        trim:true
    },
    apellido:{
        type:String,
        require:true,
        trim:true
    },
    fecha_nacimiento:{
        type:Date,
        require:true,
        trim:true
    },
    genero:{
        type:String,
        require:true,
        enum: ['Masculino', 'Femenino']
    },
    ciudad:{
        type:String,
        require:true,
        trim:true
    },
    direccion:{
        type:String,
        trim:true,
        default:null
    },
    telefono:{
        type:Number,
        trim: true,
        default:null
    },
    email:{
        type:String,
        require:true,
        trim:true,
        unique:true
    }
},{
    timestamps:true
})


export default model('Paciente', pacienteSchema)