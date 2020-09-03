import React from 'react'
import { useSelector } from 'react-redux'
import { Box } from 'grommet'
import Map from './Map'

/*
  Map Container fills the map area with the map.
*/
const MapContainer = () => {
  const basemapWaterColor = useSelector((state) => state.map.basemapWaterColor)
  const vehicleGeojson = useSelector((state) => state.map.vehicleGeojson)
  const selectedRoute = useSelector((state) => state.map.selectedRoute)
  const mapZoom = useSelector((state) => state.map.zoom)

  return (
    <Box fill>
      <Map
        basemapWaterColor={basemapWaterColor}
        vehicleGeojson={vehicleGeojson}
        selectedRoute={selectedRoute}
        mapZoom={mapZoom}
      />
    </Box>
  )
}

export default MapContainer
