/* eslint-disable no-useless-escape */
import email from '../../src/rules/email'

describe('email rule', () => {
  test('should have "email" name', () => {
    expect(email().name).toBe('email')
  })

  test('should be valid when value is a valid email address', () => {
    expect(email()('prettyandsimple@example.com')).toEqual({ valid: true })
    expect(email()('very.common@example.com')).toEqual({ valid: true })
    expect(email()('disposable.style.email.with+symbol@example.com')).toEqual({ valid: true })
    expect(email()('other.email-with-dash@example.com')).toEqual({ valid: true })
    expect(email()('fully-qualified-domain@example.com')).toEqual({ valid: true })
    expect(email()('user.name+tag+sorting@example.com')).toEqual({ valid: true })
    expect(email()('dx@example.com')).toEqual({ valid: true })
    expect(email()('"very.(),:;<>[]\".VERY.\"very@\\ \"very\".unusual"@strange.example.com')).toEqual({ valid: true })
    expect(email()('example-indeed@strange-example.com')).toEqual({ valid: true })
    expect(email()('admin@mailserver1')).toEqual({ valid: true })
    expect(email()('#!$%&\'*+-/=?^_`{}|~@example.org')).toEqual({ valid: true })
    expect(email()('"()<>[]:,;@\\\"!#$%&\'-/=?^_`{}| ~.a"@example.org')).toEqual({ valid: true })
    expect(email()('example@s.solutions')).toEqual({ valid: true })
    expect(email()('user@localserver')).toEqual({ valid: true })
    expect(email()('user@[2001:DB8::1]')).toEqual({ valid: true })
  })

  test('should be invalid when value is a non-valid email address', () => {
    expect(email()('hey')).toEqual({ valid: false })
    expect(email()('hey.')).toEqual({ valid: false })
  })

  test('should be valid when value is an empty string', () => {
    expect(email()('')).toEqual({ valid: true })
  })

  test('should be invalid when value is a string with only whitespaces', () => {
    expect(email()(' ')).toEqual({ valid: false })
  })

  test('should be invalid when value is a number', () => {
    expect(email()(10)).toEqual({ valid: false })
  })

  test('should be invalid when value is a boolean value', () => {
    expect(email()(true)).toEqual({ valid: false })
  })

  test('should be invalid when value is an array', () => {
    expect(email()(['Jack'])).toEqual({ valid: false })
  })

  test('should be invalid when value is an object', () => {
    expect(email()({})).toEqual({ valid: false })
  })

  test('should be invalid when value is undefined', () => {
    expect(email()(undefined)).toEqual({ valid: false })
  })

  test('should be invalid when value is null', () => {
    expect(email()(null)).toEqual({ valid: false })
  })

  test('should be invalid when no value is provided', () => {
    expect(email()()).toEqual({ valid: false })
  })
})
