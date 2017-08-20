import { addRule, validate } from '../src'

addRule('email', () => false)

const data = {
  name: 'Jack',
  wife: {
    name: 'Susan'
  }
}

const rules = {
  name: 'required',
  'wife.name': 'required',
  pets: 'required|array'
}

validate(data, rules)
