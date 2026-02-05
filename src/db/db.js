const mongoose = require("mongoose");

async function connctDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("DB connected");
    } catch (error) {
        console.log("DB not conncted", error);
    }
}

module.exports = connctDB;
