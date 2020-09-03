import React, { useEffect, useState } from 'react'
import { DateTime } from 'luxon'
import { ThreeBounce } from 'styled-spinkit'
import styled from 'styled-components'

import { getRandomMapilliaryImage } from '../helpers'

const Image = styled.img`
  width: 100%;
  object-fit: cover;
  display: block;
  border: 1px grey;
`

const getTimestampString = (timestamp) => {
  return new DateTime(timestamp * 1000).toLocaleString({ weekday: 'short', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' })
}

const VehicleInfoPopup = ({ route, vehicle_id, bearing, timestamp, coordinates}) => {
  const [image, setImage] = useState(null)
  const [imageLoading, setImageLoading] = useState(true)

  useEffect(() => {
    const createImage = async () => {
      const img = new window.Image()

      const imgUrl = await getRandomMapilliaryImage(coordinates[0], coordinates[1])

      if (imgUrl) {
        img.src = imgUrl
        img.onload = () => {
          setImageLoading(false)
          setImage(img)
        }
      } else {
        setImageLoading(false)
      }

    }

    createImage()



  }, []);

  return (
    <div>
      <div>
        <strong>Vehicle {vehicle_id}</strong>
      </div>
      <div>Route: {route}</div>
      <div>Bearing: {bearing}°</div>
      <div>Last updated: {getTimestampString(timestamp)}</div><div>
      </div>
      <p></p>
      { imageLoading && <div>
          <strong>Searching Mapilliary images at this location...</strong>
          <ThreeBounce />
        </div> }
      { (!imageLoading && image) && <Image alt="Mapilliary" src={image.src}/> }
      { (!imageLoading && !image) && <span><strong>Could not find a Mapilliary image for this location</strong></span> }
    </div>
  )
  

}

export default VehicleInfoPopup