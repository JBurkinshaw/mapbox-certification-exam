const defaultState = {
  basemapWaterColor: '#75cff0',
  zoom: 13,
  vehicleGeojson: { features: [], type: 'FeatureCollections' },
  selectedRoute: 'All routes'
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_BASEMAP_WATER_COLOR':
      return { ...state, basemapWaterColor: action.color }
    case 'SET_ZOOM':
      return { ...state, zoom: action.zoom }
    case 'SET_VEHICLE_GEOJSON':
      return { ...state, vehicleGeojson: action.vehicleGeojson }
    case 'SET_SELECTED_ROUTE':
      return { ...state, selectedRoute: action.selectedRoute }
    default:
      return state
  }
}
