// app.js
// We define the route handlers

const express = require("express");
const studentData = require("./studentData.json");

//Create an instance of an Express application
const app = express();

//Define our routes
//Health check rout
// GET / method = GET path = /
app.get("/", (req, res) => {
  //handler goes here
  res.status(200).json({ data: "Service is running" }); // this will send json data to the body in our inspect - network tools
});

// GET /students
// define path + method and handler
// catch errors
app.get("/students", (req, res) => {
  try {
    const { students } = studentData;
    res.status(200).json({ data: students });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//GET /students/:id
app.get("/students/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { students } = studentData;
    const student = students.find((student) => student.id === id);
    if (student) {
      res.status(200).json({ data: student });
    } else res.status(404).json({ error: `No student with id of ${id}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = app;
