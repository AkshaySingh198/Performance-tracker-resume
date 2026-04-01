const {Schema}=require('mongoose')
const mongoose=require('mongoose')

const userSchema= new Schema({
    username:{
        type:String,
        unique:[true,"Username already taken"],
        required:true
    },
    email:{
        type:String,
        unique:[true,"Account already exist"],
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const userModel= mongoose.model('Users',userSchema)

module.exports=userModel;