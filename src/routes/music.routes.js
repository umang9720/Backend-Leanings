const express = require("express");
const musicController = require("../controllers/music.controller");
const multer = require("multer");
const authMiddleware = require("../middlewares/auth.middleware")

//memory storage for multer for image upload/ form-data and storage in buffer
const upload = multer({ Storage: multer.memoryStorage() });

const router = express.Router();

router.post("/upload", authMiddleware.authArtist, upload.single("music"), musicController.uploadMusic);
router.post("/album", authMiddleware.authArtist, musicController.createAlbum);
router.get("/", authMiddleware.authUser, musicController.getAllMusic);
router.get("/albums", authMiddleware.authUser, musicController.getAllAlbums);
router.get("/albums/:albumId", authMiddleware.authUser, musicController.getAllAlbumByID);





module.exports = router;
