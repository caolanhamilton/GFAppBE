exports.getLocationDistance = (arrayOfLocations, userLat, userLon, radius) => {
  const geolib = require("geolib");
  let copyOfArrayOfLocations = [...arrayOfLocations];
  return copyOfArrayOfLocations
    .map((location) => {
      location["distance"] = geolib.convertDistance(
        geolib.getDistance(
          { latitude: location.lat, longitude: location.lng },
          { latitude: userLat, longitude: userLon }
        ),
        "mi"
      );
      return location;
    })
    .sort((a, b) => {
      return a.distance - b.distance;
    })
    .filter((location) => {
      if (Number(radius) > 99) {
        return location;
      } else {
        return location.distance <= Number(radius);
      }
    });
};
