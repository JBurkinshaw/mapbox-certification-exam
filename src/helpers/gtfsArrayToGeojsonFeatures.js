const gtfsArrayToGeojsonFeatures = (gtfsArray) => {
  // const uniqueRoutes = [...new Set(gtfsArray.map(gtfsObject => gtfsObject.vehicle.trip.route_id))];

  // const routeColors
  return {
    "type": "FeatureCollection",
    "features": gtfsArray.map((gtfsObject) => {
      return {
        type: "Feature",
        id: gtfsObject.id,
        properties: {
          // Depending on your data source, the properties available on "gtfsObject" may be different:
          route: gtfsObject.vehicle.trip.route_id,
          route_start: gtfsObject.vehicle.trip.start_time,
          vehicle_label: gtfsObject.vehicle.vehicle.label,
          bearing: gtfsObject.vehicle.position.bearing
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