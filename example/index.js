import { validate } from '../src'

const data = {
  name: 'Jack',
  wife: {
    name: 'Susan'
  },
  kids: [
    {
      name: 'Samuel'
    }
  ]
}

const rules = {
  name: 'required',
  'wife.surname': 'required|string',
  kids: 'array',
  'kids.*.surname': 'required'
}

const errors = validate(data, rules)

console.log(errors)
