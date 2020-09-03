const getRandomMapilliaryImage = async (longitude, latitude) => {
  const clientId = process.env.REACT_APP_MAPILLIARY_KEY
  const url = `https://a.mapillary.com/v3/images?client_id=${clientId}&closeto=${longitude},${latitude}`
  let response = await fetch(url);
  if (response.ok) {
    const searchJson = await response.json()

    if (searchJson.features?.length > 0) {
      // Get a random array element
      const imageKey = searchJson.features[Math.floor(Math.random() * searchJson.features.length)].properties?.key 
      // const imageUrl = `https://a.mapillary.com/v3/images/${imageKey}?client_id=${clientId}`
      const imageUrl = `https://images.mapillary.com/${imageKey}/thumb-640.jpg`
      return imageUrl
    }

    return null
  } else {
    console.error("error:", response.status);
  }

}

export default getRandomMapilliaryImage