import {Schema, model} from 'mongoose'

const especialidadSchema = new Schema({
    codigo:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    nombre:{
        type:String,
        required:true,
        trim:true
    },
    descripcion:{
        type:String,
        required:true,
        trim:true,
    }

})

export default model('Especialidad', especialidadSchema)