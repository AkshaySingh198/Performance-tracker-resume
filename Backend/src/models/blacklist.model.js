const mongoose=require('mongoose')


const blacklistTokenSchema= new mongoose.Schema({
   token:{
    type:String,
    required:[true,"token is required for blacklisting"]
   }
   
},{
    timestamps:true
})

const tokenBlacklistModel=mongoose.model("blackListToken",blacklistTokenSchema)

module.exports=tokenBlacklistModel;