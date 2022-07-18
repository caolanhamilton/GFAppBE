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
  prisma.location
    .findUnique({
      where: {
        id: Number(req.params.id),
      },
    })
    .then((location) => {
      res.json(location);
    });
});
app.get("/categories/", (req, res) => {
  prisma.category.findMany({}).then((categories) => {
    res.json(categories);
  });
});
app.get("/categories/:id", (req, res) => {
  prisma.category
    .findUnique({
      where: {
        id: Number(req.params.id),
      },
    })
    .then((categories) => {
      res.json(categories);
    });
});

//POST
app.post("/locations", (req, res) => {});
app.post("/categories", (req, res) => {});

module.exports = app;
