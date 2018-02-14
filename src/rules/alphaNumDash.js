import isNumber from 'is-number'
import string from './string'

export default function alphaNumDash(value) {
  return (string(value) || isNumber(value)) && (/^$|^[a-z0-9_-]+$/i).test(value)
}
