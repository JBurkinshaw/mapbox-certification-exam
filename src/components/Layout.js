import React from 'react'
import MapContainer from './MapContainer'
import Sidepanel from './Sidepanel'
import styled from 'styled-components'

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

const Layout = () => {
  return (
    <FlexWrapper>
      <FlexBody>
        <Main>
          <MapContainer id="map"/>
        </Main>
        <Nav>
          <Sidepanel/>
        </Nav>
      </FlexBody>
    </FlexWrapper>
  )
}

export default Layout
