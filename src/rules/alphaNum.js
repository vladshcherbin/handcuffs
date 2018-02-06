import isNumber from 'is-number'
import string from './string'

export default function alphaNum(value) {
  return (string(value) || isNumber(value)) && (/^$|^[a-z0-9]+$/i).test(value)
}
