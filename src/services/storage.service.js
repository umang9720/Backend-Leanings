const ImageKit = require("@imagekit/nodejs");

const imageKit = new ImageKit({
   privateKey: process.env.IMAGEKIT_PRIVATE_KEY, // This is the default and can be omitted
});

async function uploadFile(file) {
   const response = await imageKit.files.upload({
      file,
      fileName: "music_" + Date.now(),
      folder: "Project_2/music",
   });

   return response;
}

module.exports = uploadFile;
