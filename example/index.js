import { addRule, validate } from '../src'

addRule('email', () => false)

const rules = {
  name: 'required|email'
}

const data = {
  name: 'Jack'
}

validate(data, rules)
