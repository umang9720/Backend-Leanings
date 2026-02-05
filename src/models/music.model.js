const mongoose = require("mongoose");

const musicSchema = new mongoose.Schema({
    uri: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
        minlength: [1, "Title cannot be empty"],
    },
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
});

const musicModel = mongoose.model("music", musicSchema);

module.exports = musicModel;
