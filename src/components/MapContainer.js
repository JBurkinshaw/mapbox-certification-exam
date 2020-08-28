import React from 'react'
import { useSelector } from 'react-redux'
import { Box } from 'grommet'
import Map from './Map'

/*
  Map Container fills the map area with the map.
*/
const MapContainer = () => {
  const basemapWaterColor = useSelector((state) => state.map.basemapWaterColor)

  return (
    <Box fill>
      <Map
        basemapWaterColor={basemapWaterColor}
      />
    </Box>
  )
}

export default MapContainer
