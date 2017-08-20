import { addRule, validate } from '../src'

addRule('email', () => false)

const data = {
  name: '',
  wife: {
    name: 'Susan'
  },
  pets: [[1], 2, { name: 'ss' }]
}

const rules = {
  pets: 'required',
  'pets.*': 'array',
  'pets.*.name': 'required',
  'pets.*.*': 'required'
}

validate(data, rules)
