import { validate } from '../src'

// addRule('email', () => false)

const data = {
  name: 'Jack',
  wife: {
    name: 'Susan'
  },
  pets: [
    { name: 'Rex' },
    { surname: 'Tiger' }
  ],
  toys: [['one', 'two'], ['three'], [[]]]
}


const rules = {
  name: 'required',
  'wife.surname': 'required',
  'pets.*': 'required',
  'pets.*.name': 'required',
  'toys.*.*': 'required'
}

validate(data, rules)
