import { validate } from '../src'

const data = {
  name: 'Jack',
  wife: {
    name: 'Susan'
  }
}

const rules = {
  name: 'required|string',
  'wife.age': 'required|number',
  pets: 'required|array',
  'pets.*.type': 'required|string'
}


async function start() {
  const validationResult = await validate(data, rules)

  if (!validationResult.valid) {
    console.log(validationResult.errors)
  }
}

start()
