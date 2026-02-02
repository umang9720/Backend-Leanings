const express = require("express");

const app = express();
app.use(express.json());

const notes = [];

// post api
app.post("/notes", (req, res) => {
  // console.log(req.body)
  notes.push(req.body);
  res.status(201).json({
    message: "notes created sucesfully",
  });
});

// get api
app.get("/notes", (req, res) => {
  res.status(200).json({
    message: "notes fetched sucesfully",
    notes: notes,
  });
});

// delete api
app.delete("/notes/:index", (req, res) => {
  const index = req.params.index;
  //   console.log(index);

  delete notes[index];

  res.status(200).json({
    message: "notes deleted sucesfully",
  });
});

// delete api
app.patch("/notes/:index", (req, res) => {
  const index = req.params.index;
  const description = req.body.description;
  console.log(description);

  notes[index].description = description;

  res.status(200).json({
    message: "notes updated sucesfully",
  });
});
module.exports = app;
