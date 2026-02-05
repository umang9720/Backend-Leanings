const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
        minlength: [1, "Title cannot be empty"],
    },
    musics: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "music",
    }],
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
});

const albumModel = mongoose.model("album", albumSchema);

module.exports = albumModel
