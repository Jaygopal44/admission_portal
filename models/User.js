const mongoose = require('mongoose')

// Create Schema
const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        Required : true
    },
    email : {
        type : String,
        Required : true
    },
    password : {
        type : String,
        Required : true
    },
    image : {
        public_id: {
            type : String,
            required : true
        },
        url: {
            type : String,
            required : true
        }
    },
    role: {
        type:String,
        default:'student'
    }

},{timestamps : true})

const UserModel = mongoose.model('user' , UserSchema)
module.exports = UserModel