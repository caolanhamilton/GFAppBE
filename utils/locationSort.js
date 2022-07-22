exports.getLocationDistance = (arrayOfLocations, userLat, userLon) => {

  const geolib = require("geolib");
  let copyOfArrayOfLocations = [...arrayOfLocations];
  return copyOfArrayOfLocations
      .map((location) => {
        console.log(location)
      location["distance"] = geolib.convertDistance(geolib.getDistance(
        { latitude: location.lat, longitude: location.lng },
        { latitude: userLat, longitude: userLon }
      ), "mi");
      return location;
    })
    .sort((a, b) => {
      return a.distance - b.distance;
    });
}

