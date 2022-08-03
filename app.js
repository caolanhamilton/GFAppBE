const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { getLocationDistance } = require("./utils/locationSort");
const PORT = 8080;
const app = express();
app.use(express.json());
//Prisma
const prisma = new PrismaClient();
//ENDPOINTS

//GET
app.get("/locations", (req, res) => {
  const { sort, filter } = req.query;
  const filterObj = filter ? { [filter]: true } : {};

  prisma.location
    .findMany({
      where: filterObj,
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
    })
    .then((locations) => {
      Promise.all(
        locations.map(async (location) => {
          const aggregations = await prisma.review.aggregate({
            _avg: {
              overallRating: true,
              safetyRating: true,
            },
            where: {
              locationId: location.id,
            },
          })
          location.avgRating = aggregations._avg.overallRating;
          location.avgSafetyRating = aggregations._avg.safetyRating;
          return location;
        })
      ).then((resolvedLocations) => {
        res.json(getLocationDistance(resolvedLocations, req.query.lat, req.query.lng, req.query.radius));
      })
    })
      
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
    .findMany({
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
app.get("/reviews/:location", (req, res) => {

  prisma.review
    .findMany({
      where: {
        locationId: Number(req.params.location),
      },
    })
    .then((reviews) => {
      res.json(reviews);
    });
});

//POST
app.post("/locations", (req, res) => {
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
        userId: req.body.userId,
      },
    })
    .then((location) => {
      res.json(location);
    });
});
app.post("/categories", (req, res) => {
  prisma.category
    .create({
      data: {
        name: req.body.name,
      },
    })
    .then((category) => {
      res.json(category);
    });
});

app.post("/reviews", (req, res) => {
  prisma.review
    .create({
      data: {
        locationId: req.body.locationId,
        reviewText: req.body.reviewText,
        overallRating: req.body.overallRating,
        safetyRating: req.body.safetyRating,
        userId: req.body.userId,
      },
    })
    .then((review) => {
      res.json(review);
    });
});

module.exports = app;
