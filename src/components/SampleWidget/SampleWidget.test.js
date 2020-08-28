import React from 'react'
import { render } from '@testing-library/react'
import SampleWidget from './index'

test('renders without crashing', async () => {
  const { getAllByText } = render(<SampleWidget />)

  const matches = await getAllByText("It's a widget!")

  expect(matches.length).toBe(1)
})
