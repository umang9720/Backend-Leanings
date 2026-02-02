const mongoose = require("mongoose")

async function connectDB() {

    await mongoose.connect("mongodb+srv://devilwhite9720_db_user:W3fylFnBkvzuFn4g@backend-learning.pb2plef.mongodb.net/taryn")

    console.log("Db connected")

}

module.exports=connectDB