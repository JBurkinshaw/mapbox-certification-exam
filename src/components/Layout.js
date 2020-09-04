import React from 'react'
import { useSelector } from 'react-redux'
import MapContainer from './MapContainer'
import Sidepanel from './Sidepanel'
import styled from 'styled-components/macro'

const FlexWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`

const FlexBody = styled.div`
  display: flex;
  flex: 1;
`

const Main = styled.main`
  flex: 1;
`
const Nav = styled.nav`
  /* 16em is the width of the columns */
  flex: 0 0 16em;
  /* put the nav on the left */
  order: -1;
  padding: 1em;
`

const SidepanelStyled = styled(Sidepanel)`
  height: 100%;
`

const Layout = () => {
  const mapZoom = useSelector((state) => state.map.zoom)
  const vehicleGeojson = useSelector((state) => state.map.vehicleGeojson)
  const selectedRoute = useSelector((state) => state.map.selectedRoute)

  return (
    <FlexWrapper>
      <FlexBody>
        <Main>
          <MapContainer id="map"/>
        </Main>
        <Nav>
          <SidepanelStyled
          id="testid"
            mapZoom={mapZoom}
            routeNumbers={Array.from(
                new Set(vehicleGeojson.features.map((f) => f.properties.route))
              ).sort()
            }
            selectedRoute={selectedRoute}
          />
        </Nav>
      </FlexBody>
    </FlexWrapper>
  )
}

export default Layout
