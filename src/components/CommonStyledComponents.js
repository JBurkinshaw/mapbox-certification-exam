/*
  ! Common Styled Components

  Place all styled-components that are used across more than one
  React component in this file as a source of truth. Try to base
  as many styled components as possible from generalized components
  from here.

*/

import styled from 'styled-components/macro'

export const GenericContainer = styled('div')`
  width: 300px;
  height: 300px;
  border: 2px solid #333;
`
