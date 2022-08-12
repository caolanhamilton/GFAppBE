const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { getLocationDistance } = require("./utils/locationSort");
const { initializeApp } = require("firebase-admin/app");
const PORT = 8080;
const app = express();
app.use(express.json());
//Prisma
const prisma = new PrismaClient();
let firebaseapp = null;

const firebaseAuthMiddleware = (req, res, next) => {
  var admin = require("firebase-admin");
  var serviceAccount = require("./gfapp-356213-firebase-adminsdk-irn59-14d2615798.json");
  if (!firebaseapp) {
    firebaseapp = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  const tokenString = req.headers.authorization?.split(" ");
  console.log(tokenString, "in middleware");

  if (!tokenString) {
    return res.status(401).send("Unauthorized, no header provided");
  } else if (!tokenString[1]) {
    return res.status(401).send("Unauthorized, no token provided");
  } else {
    const token = tokenString[1];
    admin
      .auth()
      .verifyIdToken(token)
      .then((decodedToken) => {
        res.locals.decodedUserToken = decodedToken;
        next();
      })
      .catch((error) => {
        return res.status(401).send("Unauthorized, invalid token");
      });
  }
};

//ENDPOINTS

//User endpoints

app.post("/users", firebaseAuthMiddleware, (req, res) => {
  prisma.user
    .create({
      data: {
        id: res.locals.decodedUserToken.uid,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      },
    })
    .then((user) => {
      res.json(user);
    });
});

app.delete("/users", firebaseAuthMiddleware, (req, res) => {
  console.log("deleteBe");
  prisma.user
    .delete({
      where: {
        id: res.locals.decodedUserToken.uid,
      },
    })
    .then(() => {
      res.json("user deleted");
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/users/getByUserId", firebaseAuthMiddleware, (req, res) => {
  prisma.user
    .findUnique({
      where: {
        id: res.locals.decodedUserToken.uid,
      },
      include: {
        favouritedLocations: true,
        postedLocations: true,
        postedReviews: true,
      },
    })
    .then((user) => {
      res.json(user);
    });
});

app.patch("/users/favourites", firebaseAuthMiddleware, (req, res) => {
  prisma.location
    .update({
      where: {
        id: Number(req.body.locationId),
      },
      data: {
        favouritedBy: {
          disconnect: {
            id: res.locals.decodedUserToken.uid,
          },
        },
      },
    })
    .then((location) => {
      res.json(location);
    });
});

app.get("/users/favourites", firebaseAuthMiddleware, (req, res) => {
  prisma.location
    .findMany({
      where: {
        favouritedBy: {
          some: {
            id: {
              equals: res.locals.decodedUserToken.uid,
            },
          },
        },
      },
      include: {
        favouritedBy: true,
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
          });
          location.avgRating = aggregations._avg.overallRating;
          location.avgSafetyRating = aggregations._avg.safetyRating;
          return location;
        })
      ).then((resolvedLocations) => {
        res.json(
          getLocationDistance(
            resolvedLocations,
            req.query.lat,
            req.query.long,
            req.query.radius
          )
        );
      });
    });
});

app.post("/users/favourites", firebaseAuthMiddleware, (req, res) => {
  prisma.location
    .update({
      where: {
        id: Number(req.body.locationId),
      },
      data: {
        favouritedBy: {
          connect: {
            id: res.locals.decodedUserToken.uid,
          },
        },
      },
    })
    .then((location) => {
      res.json(location);
    });
});

//Location endpoints

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
        favouritedBy: true,
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
          });
          location.avgRating = aggregations._avg.overallRating;
          location.avgSafetyRating = aggregations._avg.safetyRating;
          return location;
        })
      ).then((resolvedLocations) => {
        res.json(
          getLocationDistance(
            resolvedLocations,
            req.query.lat,
            req.query.lng,
            req.query.radius
          )
        );
      });
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
        favouritedBy: true,
      },
    })
    .then((location) => {
      res.json(location);
    });
});

app.post("/locations", firebaseAuthMiddleware, (req, res) => {
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
        userId: res.locals.decodedUserToken.uid,
      },
    })
    .then((location) => {
      res.json(location);
    });
});

app.get("/locations/reviews/:location", (req, res) => {
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

app.post("/locations/reviews", firebaseAuthMiddleware, (req, res) => {
  prisma.review
    .create({
      data: {
        locationId: req.body.locationId,
        reviewText: req.body.reviewText,
        overallRating: req.body.overallRating,
        safetyRating: req.body.safetyRating,
        userId: res.locals.decodedUserToken.uid,
      },
    })
    .then((review) => {
      res.json(review);
    });
});

//Category endpoints

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

module.exports = app;
