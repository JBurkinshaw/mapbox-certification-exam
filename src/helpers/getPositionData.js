import Pbf from 'pbf';
import * as GtfsRealtimePbf from 'gtfs-realtime-pbf-js-module'

const getPositionData = async () => {
  const apiKey = process.env.REACT_APP_TRANSLINK_API_KEY
  const url = `https://gtfs.translink.ca/v2/gtfsposition?apikey=${apiKey}`
  let response = await fetch(url);
  if (response.ok) {
    // if HTTP-status is 200-299
    // get the response body (the method explained below)
    const bufferRes = await response.arrayBuffer();
    const bufferUint8Arr = new Uint8Array(bufferRes)
    const pbf = new Pbf(bufferUint8Arr);
    const obj = GtfsRealtimePbf.FeedMessage.read(pbf);

    return obj.entity
  } else {
    console.error("error:", response.status);
  }

}

export default getPositionData