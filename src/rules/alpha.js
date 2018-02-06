import string from './string'

export default function alpha(value) {
  return string(value) && (/^$|^[a-z]+$/i).test(value)
}
