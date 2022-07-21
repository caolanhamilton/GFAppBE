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
  prisma.location
    .findMany({
      include: {
        category: {
          select: {
            name: true,
          }
        },
      },
    })
    .then((locations) => {
      res.json(locations);
    });
});
app.get("/locations/:id", (req, res) => {
  prisma.location
    .findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
    })
    .then((location) => {
      res.json(location);
    });
});
app.get("/categories/", (req, res) => {
  prisma.category
    .findMany({
      include: {
        locations: true,
      },
    })
    .then((categories) => {
      res.json(categories);
    });
});
app.get("/categories/:id", (req, res) => {
  prisma.category
    .findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: {
        locations: true,
      },
    })
    .then((categories) => {
      res.json(categories);
    });
});

//POST
app.post("/locations", (req, res) => {
  console.log(req.body.categoryId);
  prisma.location
    .create({
      data: {
        name: req.body.name,
        description: req.body.description,
        lat: req.body.lat,
        lng: req.body.lng,
        address: req.body.address,
        image: req.body.image,
        phone: req.body.phone,
        dedicatedGlutenFree: req.body.dedicatedGlutenFree,
        categoryId: req.body.categoryId,
      },
    })
    .then((location) => {
      res.json(location);
    });
});
app.post("/categories", (req, res) => {
  prisma.category.create({
    data: {
      name: req.body.name,
    }
  }).then((category) => {
    res.json(category);
  });
});

module.exports = app;
