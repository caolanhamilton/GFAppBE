const express = require("express");
const { PrismaClient } = require("@prisma/client");
const PORT = 8080;
const app = express();
app.use(express.json());
//Prisma
const prisma = new PrismaClient();

//ENDPOINTS

//GET
app.get("/locations", (req, res) => {
  prisma.location.findMany({}).then((locations) => {
    res.json(locations);
  });
});
app.get("/locations/:id", (req, res) => {
 
});
app.get("/categories/", (req, res) => {
  res.send("All categories!");
});
app.get("/categories/:id", (req, res) => {
  res.send(`Category with id ${req.params.id}!`);
});

//POST
app.post("/locations", (req, res) => {});
app.post("/categories", (req, res) => {});

module.exports = app;
