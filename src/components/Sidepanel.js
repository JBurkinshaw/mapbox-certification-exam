import React, { useState } from 'react'
import styled from 'styled-components'
import { Button } from 'grommet'

import { useDispatch } from 'react-redux'
import { setBasemapWaterColor } from '../actions/mapActions'

const H1 = styled.h1`
  font-size: 2.5rem;
  line-height: 4rem;
`

const Sidepanel = () => {
  const [colorIndex, setColorIndex] = useState(0)
  const dispatch = useDispatch()
  const setMapWaterColor = (color) => dispatch(setBasemapWaterColor(color))


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
      <Button
        secondary
        label="Change Water Color" 
        onClick={() => toggleBasemapColor()}
      />
    </>
  )
}

export default Sidepanel
