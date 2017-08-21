import numeric from './numeric'
import string from './string'

export default function alphaDash(value) {
  return (string(value) || numeric(value)) && (/^[a-zA-Z0-9_-]+$/).test(value)
}
