const mongoose= require("mongoose")

const noteSchema = new mongoose.Schema({

    title:{ type: String, required:true},
    description:{ type: String, required:true},

})

const nodeModel = mongoose.model("note",noteSchema)


module.exports = nodeModel