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
});
app.get("/locations/:id", (req, res) => {
  res.send(`Location with id ${req.params.id}!`);
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
