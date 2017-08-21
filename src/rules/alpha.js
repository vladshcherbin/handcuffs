import string from './string'

export default function alpha(value) {
  return string(value) && (/^[a-zA-Z]+$/).test(value)
}
