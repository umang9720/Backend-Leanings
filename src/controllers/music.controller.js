const musicModel = require("../models/music.model");
const albumModel = require("../models/album.model");
const jwt = require("jsonwebtoken");
const uploadFile = require("../services/storage.service");

//for uploading music
async function uploadMusic(req, res) {

    const { title } = req.body;
    const file = req.file;
    // console.log("BODY:", req.body);
    // console.log("FILE:", req.file);

    const response = await uploadFile(file.buffer.toString("base64"));

    const music = await musicModel.create({
        uri: response.url,
        title,
        artist: req.user.id,
    });

    res.status(201).json({
        message: "Music uploaded successfully",
        music: {
            id: music._id,
            uri: music.uri,
            title: music.title,
            artist: music.artist,
        },
    });

}

//for uploading albums
async function createAlbum(req, res) {

    const { title, musics } = req.body
    // console.log(req.body)

    const album = await albumModel.create({
        title,
        artist: req.user.id,
        musics: musics,
    })

    res.status(201).json({
        message: "Album created successfully",
        album: {
            id: album._id,
            title: album.title,
            artist: album.artist,
            musics: album.musics,
        }
    })
}

//for getting music for homepage
async function getAllMusic(req, res) {
    const musics = await musicModel.find()
    .limit(2)
    .populate("artist", "username")

    res.status(200).json({
        message: "Music fetched successfully",
        musics: musics
    })
}

//for getting all albums
async function getAllAlbums(req, res) {
    const albums = await albumModel
    .find()
    .populate("artist", "username").populate("musics")
    // const albums = await albumModel.find().select("title artist").populate("artist", "username")

    res.status(200).json({
        message: "Albums fetched successfully",
        albums: albums
    })
}

//for getting a particular album by Id
async function getAllAlbumByID(req, res) {
    const albumId = req.params.albumId
    const albums = await albumModel.findById(albumId).populate("artist", "username").populate("musics")
    console.log(albums)

    return res.status(200).json({
        message: "Albums fetched successfully",
        albums: albums
    })
}
module.exports = { uploadMusic, createAlbum, getAllMusic, getAllAlbums, getAllAlbumByID };
