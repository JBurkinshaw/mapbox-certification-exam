const gtfsArrayToGeojsonFeatures = (gtfsArray) => {
  // const uniqueRoutes = [...new Set(gtfsArray.map(gtfsObject => gtfsObject.vehicle.trip.route_id))];

  // const routeColors
  return {
    "type": "FeatureCollection",
    "features": gtfsArray.map((gtfsObject, index) => {
      return {
        type: "Feature",
        id: index,
        properties: {
          // Depending on your data source, the properties available on "gtfsObject" may be different:
          route: gtfsObject.vehicle.trip.route_id,
          vehicle_label: gtfsObject.vehicle.vehicle.label,
          vehicle_id: gtfsObject.vehicle.vehicle.id,
          bearing: gtfsObject.vehicle.position.bearing,
          timestamp: gtfsObject.vehicle.timestamp
        },
        geometry: {
          type: "Point",
          coordinates: [
            gtfsObject.vehicle.position.longitude,
            gtfsObject.vehicle.position.latitude
          ]
        }
      }
    })
  }
}

export default gtfsArrayToGeojsonFeatures