import doubleNumber from './doubleNumber'

describe('Sample helper function', () => {
  it('retrieves a helper', () => {
    const response = doubleNumber(2)

    expect(response).toBe(4)
  })
})
