import React, { useState } from 'react'
import styled from 'styled-components'
import { Button, Box, Select, FormField } from 'grommet'

import { useDispatch } from 'react-redux'
import { setBasemapWaterColor, setSelectedRoute } from '../actions/mapActions'

const H1 = styled.h1`
  font-size: 2.5rem;
  line-height: 4rem;
`

const allRoutes = "All routes"

const Sidepanel = ({mapZoom, routeNumbers, selectedRoute}) => {
  const routeNumbersWithDefault = [ allRoutes, ...routeNumbers ]

  const [colorIndex, setColorIndex] = useState(0)
  const [options, setOptions] = useState(routeNumbersWithDefault);

  const dispatch = useDispatch()
  const setMapWaterColor = (color) => dispatch(setBasemapWaterColor(color))
  const setRoute = (selectedRoute) => dispatch(setSelectedRoute(selectedRoute))

  const toggleBasemapColor = () => {
    if (colorIndex === 0) {
      setMapWaterColor('#16c0ac')
      setColorIndex(1)
    } else {
      setMapWaterColor('#75cff0')
      setColorIndex(0)
    }
  }
  
  return (
    <>
      <H1>Vancouver TransLink Vehicle Locations</H1>
      {mapZoom <= 15 &&
        <Box align="center" justify="start" pad="small">
          <Button
            secondary
            label="Change Street Map Water Color" 
            onClick={() => toggleBasemapColor()}
          /> 
        </Box>
      }
      <Box align="center" justify="start" pad={{"top": "small"}}>
        <FormField label="Display route">
          <Select
            size="medium"
            placeholder="Route number"
            value={selectedRoute}
            options={options}
            onChange={({ option }) => setRoute(option)}
            onClose={() => setOptions(routeNumbersWithDefault)}
            onOpen={() => setOptions(routeNumbersWithDefault)}
            onSearch={text => {
              // The line below escapes regular expression special characters:
              // [ \ ^ $ . | ? * + ( )
              const escapedText = text.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');

              // Create the regular expression with modified value which
              // handles escaping special characters. Without escaping special
              // characters, errors will appear in the console
              const exp = new RegExp(escapedText, 'i');
              setOptions(routeNumbersWithDefault.filter(o => exp.test(o)));
            }}
          />
        </FormField>
      </Box>
    </>
  )
}

export default Sidepanel
