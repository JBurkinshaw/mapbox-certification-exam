const defaultState = {
  basemapWaterColor: '#75cff0'
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_BASEMAP_WATER_COLOR':
      return { ...state, basemapWaterColor: action.color }
    default:
      return state
  }
}
