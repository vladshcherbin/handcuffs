import numeric from './numeric'
import string from './string'

export default function alphaNum(value) {
  return (string(value) || numeric(value)) && (/^[a-zA-Z0-9]+$/).test(value)
}
