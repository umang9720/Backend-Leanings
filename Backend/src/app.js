const express = require("express");
const postModel = require("./models/post.model");
const multer = require("multer");
const uploadFile = require("./services/storage.service");
const cors = require("cors");


const app = express();
app.use(express.json()); //use for raw data
app.use(cors()); //use for cors issues

//memory storage for multer for image upload/ form-data and storage in buffer 
const upload = multer({ Storage: multer.memoryStorage() }); 

app.post("/create-post", upload.single("image"), async (req, res) => {

  const response = await uploadFile(req.file.buffer);

  const post = await postModel.create({
    image: response.url,
    caption: req.body.caption,
  });

return res.status(201).json({
  message:"Post created successfully",
  post
})


});


app.get("/feed", async(req,res)=>{
  const posts = await postModel.find()

  return res.status(200).json({
  message:"Post fetched successfully",
  posts
})
})

module.exports = app;
