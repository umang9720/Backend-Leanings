const mongoose = require("mongoose")

async function connectDB() {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database Connected")
    }catch(err){
        console.log("Database not connected", err)
    }
}

module.exports=connectDB