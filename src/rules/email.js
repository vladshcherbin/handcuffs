import string from './string'

export default function email(value) {
  return string(value) && (/^$|^.+@.+$/).test(value)
}
