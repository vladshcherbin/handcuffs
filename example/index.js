import { validate } from '../src'

const data = {
  name: 'Jack',
  wife: {
    name: 'Susan'
  },
  age: 18
}

const rules = {
  name: 'required|string',
  surname: 'string',
  'wife.age': 'required|numeric',
  pets: 'required|array',
  'pets.*.type': 'required|string',
  age: 'numeric|min:18'
}


async function start() {
  const validationResult = await validate(data, rules)

  if (!validationResult.valid) {
    console.log(validationResult.errors)
  }
}

start()
