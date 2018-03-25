import { rules, validate } from '../src'

const data = {
  name: 'Jack',
  wife: {
    name: 'Susan'
  },
  age: 18
}

const dataRules = {
  name: [rules.required(), rules.string()],
  surname: [rules.string()],
  'wife.age': [rules.required(), rules.numeric()],
  pets: [rules.required(), rules.array()],
  'pets.*.type': [rules.required(), rules.string()],
  age: [rules.numeric(), rules.min(18)]
}


async function start() {
  try {
    const validationResult = await validate(data, dataRules)

    if (!validationResult.valid) {
      console.log(validationResult.errors)
    }
  } catch (e) {
    console.log('Unable to validate', e)
  }
}

start()
