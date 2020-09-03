import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { useDispatch } from 'react-redux'


// import { get } from 'axios'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import styled from 'styled-components'
import VehicleInfoPopup from './VehicleInfoPopup'
import { setZoom, setVehicleGeojson } from '../actions/mapActions'
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
const satelliteStyle = 'mapbox://styles/mapbox/satellite-v9'

const MapboxGLMap = ({ basemapWaterColor, vehicleGeojson, selectedRoute, mapZoom }) => {
  const dispatch = useDispatch()

  const setMapZoom = (zoom) => dispatch(setZoom(zoom))
  const [map, setMap] = useState(null)
  const [popup, setPopup] = useState(null)
  const [markerCoords, setMarkerCoords] = useState(null)
  const marker = useRef();
  const prevZoom = useRef();
  const setGeojson = (vehicleGeojson) => dispatch(setVehicleGeojson(vehicleGeojson))
  const mapContainer = useRef(null)

  // Use to track styling so styledata does not fire too many times
  let isStyling = useRef(false)


  const updatePopup = (reactElement, lng, lat) => {
    const placeholder = document.createElement('div');
    ReactDOM.render(reactElement, placeholder);

    popup.setDOMContent(placeholder)
      .setLngLat({lng: lng, lat: lat})
      .addTo(map);
  }

  console.log(selectedRoute)

  // Create the map initially
  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_MAP_KEY
    const geojsonUpdateFrequency = 10000;

    if (vehicleGeojson.features.length !== 0) return

    const updateVehiclePositions = async () => {
      const geoJson = await gtfsArrayToGeojsonFeatures(await getPositionData())
      setGeojson(geoJson);
      console.info('Vehicle positions updated')
      console.log(geoJson)
    }

    const initializeMap = async ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: streetsStyle,
        center: [-123.117619, 49.282457],
        zoom: mapZoom,
      })

      // Create a popup
      setPopup(
        new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false,
        }),
      )

      // Initial set of vehicle positions
      updateVehiclePositions();

      let interval
      // Map load event
      map.on('load', () => {
        setMap(map)
        map.resize()
        // Update vehicle positions regularly
        interval = setInterval(async () => {
          updateVehiclePositions();
        }, geojsonUpdateFrequency);
      })

      // Map click event
      map.on('click', (e) => {
        map.flyTo({
          center: e.lngLat
        });
        
        setMarkerCoords(e.lngLat)
      })

      return () => clearInterval(interval);
    }

    if (!map) initializeMap({ setMap, setGeojson, mapContainer })
  }, [map])

   useEffect(() => {
    if (!map) return

    map.on('zoomend', () => {
      const zoom = map.getZoom()
      console.log(zoom)
      setMapZoom(zoom)

      if (zoom > 15) {
        if (prevZoom.current <= 15) {
          map.setStyle(satelliteStyle)
          isStyling.current = true
        }
      } else {
        if (prevZoom.current >= 15) {
          map.setStyle(streetsStyle)
          isStyling.current = true
        }
      }

      prevZoom.current = zoom
    })
   }, [map])

   useEffect(() => {
    if (!map) return

    map.on('styledata', () => {
      if (isStyling.current === true) {
        addSourceAndLayer()
        isStyling.current = false
      }
    })
   }, [map])

  // Create marker and move if the cooords are updated
  useEffect(() => {
    if (!marker.current && markerCoords) {
      const htmlMarker = new mapboxgl.Marker()
        .setLngLat(markerCoords)
        .addTo(map)
      
      marker.current = htmlMarker
    } else if (markerCoords) {
      marker.current.setLngLat(markerCoords)
    }
  }, [markerCoords])

  // Filter selected route
  useEffect(() => {
    if (!map) return

    setPositionMapFilter()
  }, [selectedRoute])

  const setPositionMapFilter = () => {
    if (!map) return
    if (!map.getSource('positions') || vehicleGeojson.features.length === 0) return
    // Set a filter if relevant
    if (selectedRoute && selectedRoute !== "All routes") {
      map.setFilter('positions', ['==', ['get', 'route'], selectedRoute])
    } else {
      // Remove filter
      map.setFilter('positions', null)
    }
  }

  const addSourceAndLayer = () => {
    if (!map) return

    const baseData = {
      type: 'geojson',
      data: vehicleGeojson,
    }

    if (!map.getSource('positions')) {
      map.addSource('positions', baseData)
    }
    if (!map.getLayer('positions')) {
      map.addLayer({
        id: 'positions',
        type: 'circle',
        source: 'positions',
        // filter: ['has', 'vehicleType'],
        paint: {
          'circle-radius': [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            5,
            3,
          ],
          'circle-stroke-color': '#222',
          'circle-opacity': 0.5,
          'circle-stroke-width': [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            1,
            0.5,
          ],
          'circle-color': [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            'red',
            'blue',
          ]
        },
      })
    }
  
    setPositionMapFilter()
  }

  // Set source and style initially for positions
  useEffect(() => {
    if (!map) return
    if (map.getSource('positions') || vehicleGeojson.features.length === 0) return

    addSourceAndLayer() 

    let hoverFeatureId
    map.on('mouseenter', 'positions', async function (e) {
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
      }

      const coordinates = e.features[0].geometry.coordinates.slice()
      
      const { route, vehicle_id, bearing, timestamp } = e.features[0].properties

      // Set popup coordinates, set react element and add to map
      updatePopup(
        <VehicleInfoPopup 
          route={route}
          vehicle_id={vehicle_id}
          bearing={bearing}
          timestamp={timestamp}
          coordinates={coordinates}
        />, coordinates[0], coordinates[1])
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

      popup.remove()
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

  return (
    <MapContainer
      ref={(el) => {
        mapContainer.current = el
      }}
    />
  )
}

export default MapboxGLMap
