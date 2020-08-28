import React, { useEffect, useRef, useState } from 'react'

// import { get } from 'axios'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import styled from 'styled-components'
// import { useDispatch } from 'react-redux'
// import { setHoveredVehicle } from '../actions/truckAction'
// import { setMarker, mapReady } from '../actions/mapMarkerAction'
// import { mapboxColourExpression } from '../constants/crewTypes'
import { getPositionData, gtfsArrayToGeojsonFeatures } from '../helpers'

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`

const streetsStyle = 'mapbox://styles/jburkinshaw/ckeaep0sy07ha19lgicqes99y'
// const rasterStyle = 'mapbox://styles/mapbox/satellite-v9'

// Generates HTML For mapbox popup
// const generatepopup = ({ callsign, vehicleType, message, type }) => {
//   return `<div class="${type}"><div><strong>New ${type} from callsign ${callsign}</strong></div><div class="content-paper">${message}</div></div>`
// }

// Restricts panning extent for the map
// const maxBounds = [
//   [-118.93, 54.6737], // Southwest coordinates
//   [-106.75, 58.5824], // Northeast coordinates
// ]

// let marker



const MapboxGLMap = ({basemapWaterColor}) => {
  const [map, setMap] = useState(null)
  const [popup, setPopup] = useState(null)
  const [hoveredPoint, setHoveredPoint] = useState(null)
  const [vehicleGeojson, setVehicleGeojson] = useState({ features: [], type: 'FeatureCollections' })
  const mapContainer = useRef(null)
  // const [popup, setPopup] = useState(null)
  // const dispatch = useDispatch()
  // const setHover = (id) => dispatch(setHoveredVehicle(id))
  // const setMapMarker = ({ lng, lat }) => dispatch(setMarker([lng, lat]))
  // const setMapReady = () => dispatch(mapReady())

  // Create the map initially
  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_MAP_KEY
    const geojsonUpdateFrequency = 10000;

    if (vehicleGeojson.features.length !== 0) return

    const updateVehiclePositions = async () => {
      const geoJson = await gtfsArrayToGeojsonFeatures(await getPositionData())
      setVehicleGeojson(geoJson);
      console.info('Vehicle positions updated')
      console.log(geoJson)
    }

    const initializeMap = async ({ setMap, setVehicleGeojson, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: streetsStyle,
        center: [-123.117619, 49.282457],
        zoom: 13,
      })

      // Create a popup
      setPopup(
        new mapboxgl.Popup({
          closeButton: true,
          closeOnClick: false,
        }),
      )

      // Initial set of vehicle positions
      updateVehiclePositions();

      // Update vehicle positions regularly
      let interval
      map.on('load', () => {
        setMap(map)
        map.resize()
        // setMapReady()
        interval = setInterval(async () => {
          updateVehiclePositions();
        }, geojsonUpdateFrequency);
      })
      return () => clearInterval(interval);
    }

    if (!map) initializeMap({ setMap, setVehicleGeojson, mapContainer })
  }, [map, vehicleGeojson])


  // Set source and style initially for positions
  useEffect(() => {
    if (!map) return
    if (map.getSource('positions') || vehicleGeojson.features.length === 0) return

    const baseData = {
      type: 'geojson',
      data: vehicleGeojson,
    }
    map.addSource('positions', baseData)
    map.addLayer({
      id: 'positions',
      type: 'circle',
      source: 'positions',
      // filter: ['has', 'vehicleType'],
      paint: {
        'circle-radius': 3,
        'circle-stroke-color': '#222',
        'circle-opacity': 0.5,
        'circle-stroke-width': 1,
        'circle-color': 'blue'
      },
    })

    let hoverFeatureId

    map.on('mouseenter', 'positions', async function (e) {
      debugger
      console.info("Mousenter triggered")

      map.getCanvas().style.cursor = 'pointer'

      if (e.features.length > 0) {
        if (hoverFeatureId) {
          // Set hoveredFeatureId to false
          map.setFeatureState(
            { source: 'positions', id: hoverFeatureId },
            { hover: false },
          )
        }

        hoverFeatureId = e.features[0].id
        map.setFeatureState(
          { source: 'positions', id: hoverFeatureId },
          { hover: true },
        )

        setHoveredPoint(hoverFeatureId)
      }

      const coordinates = e.features[0].geometry.coordinates.slice()
      
      // TODO Get properties here for html content

      // Set popup coordinates, set html and add to map
      popup.setHTML("<h5>popup content will go here</h5>")
        .setLngLat(coordinates)
        .addTo(map)
    })

    map.on('mouseleave', 'positions', function () {
      // Set the cursor back to the default
      map.getCanvas().style.cursor = ''

      // Doing a single leave is not always reliable
      vehicleGeojson.features.forEach(({ id }) => {
        map.setFeatureState(
          { source: 'positions', id },
          { hover: false })
      })

      setHoveredPoint(null)
    })
  }, [map, vehicleGeojson, popup])

  // Updates positions
  useEffect(() => {
    if (!map) return
    if (!map.getSource('positions')) return

    map.getSource('positions').setData(vehicleGeojson)
  }, [map, vehicleGeojson])

  // Update water color on basemap
  useEffect(() => {
    if (!map || !basemapWaterColor) return
    
    map.setPaintProperty('water', 'fill-color', basemapWaterColor);
    
  }, [basemapWaterColor])
  
// TODO DETERMINE WHAT ARE TRAINS AND BUSSES

  return (
    <MapContainer
      ref={(el) => {
        mapContainer.current = el
      }}
    />
  )
}

export default MapboxGLMap
