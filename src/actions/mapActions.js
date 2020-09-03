export const setBasemapWaterColor = (color) => ({
  type: 'SET_BASEMAP_WATER_COLOR',
  color,
})

export const setZoom = (zoom) => ({
  type: 'SET_ZOOM',
  zoom,
})

export const setVehicleGeojson = (vehicleGeojson) => ({
  type: 'SET_VEHICLE_GEOJSON',
  vehicleGeojson,
})

export const setSelectedRoute = (selectedRoute) => ({
  type: 'SET_SELECTED_ROUTE',
  selectedRoute,
})
