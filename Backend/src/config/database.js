const mongoose=require('mongoose')

async function connectToDB(){
    try{
        await mongoose.connect(process.env.MONGO_URI)

        console.log("connected to data base");

    }
    catch(err){
        console.log(err);
        
    }
}

module.exports=connectToDB;