import isString from '../src/utilities'

describe('Utilities', () => {
  test('should be true when value is a string', () => {
    expect(isString('hey')).toBe(true)
  })

  test('should be false when value is not a string', () => {
    expect(isString(12)).toBe(false)
  })
})
