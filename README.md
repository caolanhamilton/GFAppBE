# Gluten Free Eats API

Gluten Free Eats API provides a REST API for consumption by an [iOS and Android app](https://github.com/caolanhamilton/GlutenFreeEatsApp.git) that allows sufferers of celiac disease and gluten intolerance to crowdsource safe places to dine out.

## Features

Allows GET, POST, PATCH and DELETE requests to:

-   Add new spots to eat
-   Add reviews on spots
-   Add new users
-   Add favourites
-   Edit favourites
-   Delete locations
-   Delete users
-   Delete comments

## Live version

You can visit a live version of the app hosted with Appetize.io here which makes requests to this API:
- [Andriod mobile](https://appetize.io/app/m5pvitw5adbhaz7hjdc2m2oybq?device=pixel4xl&osVersion=12.0&scale=75)
- [Andriod tablet](https://appetize.io/app/m5pvitw5adbhaz7hjdc2m2oybq?device=galaxytabs7&osVersion=12.0&scale=75).

Note performance in the web simulator is much slower than when installed on a physical device.

## Technologies used

Gluten Free Eats API is a Node.JS application running an Express server. It interacts with a PSQL database via the Prisma ORM. It uses Firebase Admin SDK to parse JavaScript Web Tokens to authenticate sensitive requests from the front-end. The API is hosted on Heroku.
