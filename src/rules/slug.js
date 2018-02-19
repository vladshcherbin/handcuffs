import string from './string'

export default function slug(value) {
  return string(value) && (/^$|^[a-z0-9]+(?:-[a-z0-9]+)*$/).test(value)
}
