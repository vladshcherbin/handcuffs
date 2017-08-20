import validate from '../src/validation'

describe('Validation', () => {
  test('should return errors when object field is incorrect', () => {
    const data = {
      name: ''
    }
    const rules = {
      name: 'required'
    }
    const expectedResult = {
      name: ['This field is required']
    }

    expect(validate(data, rules)).toMatchObject(expectedResult)
  })

  test('should return errors when object fields are incorrect', () => {
    const data = {
      name: '',
      wife: {
        name: 'Susan'
      }
    }
    const rules = {
      name: 'required',
      'wife.name': 'required',
      'wife.pets': 'required'
    }
    const expectedResult = {
      name: ['This field is required'],
      'wife.pets': ['This field is required']
    }

    expect(validate(data, rules)).toMatchObject(expectedResult)
  })

  test('should resolve wildcards and return errors when object fields are incorrect', () => {
    const data = {
      pets: ['Rex', null, [[[], {}, { name: 'Tiger' }]]]
    }
    const rules = {
      'pets.*': 'array',
      'pets.*.*.*.name': 'required',
      'cats.*': 'required'
    }
    const expectedResult = {
      'pets.0': ['This field must be an array'],
      'pets.1': ['This field must be an array'],
      'pets.2.0.0.name': ['This field is required'],
      'pets.2.0.1.name': ['This field is required']
    }

    expect(validate(data, rules)).toMatchObject(expectedResult)
  })

  test('should return errors when array values are incorrect', () => {
    const data = ['', [1], { name: 'Rex' }]
    const rules = {
      '*': 'array',
      '*.*': 'array',
      '*.name': 'required',
      '*.*.name': 'required'
    }
    const expectedResult = {
      0: ['This field must be an array'],
      2: ['This field must be an array'],
      '1.0': ['This field must be an array'],
      '0.name': ['This field is required'],
      '1.name': ['This field is required'],
      '1.0.name': ['This field is required']
    }

    expect(validate(data, rules)).toMatchObject(expectedResult)
  })

  test('should return no errors when object fields are correct', () => {
    const data = {
      name: 'Jack',
      wife: {
        name: 'Susan'
      }
    }
    const rules = {
      name: 'required',
      'wife.name': 'required'
    }
    const expectedResult = {}

    expect(validate(data, rules)).toMatchObject(expectedResult)
  })

  test('should return no errors when array values are correct', () => {
    const data = [{ name: 'Rex' }, { name: 'Tiger' }]
    const rules = {
      '*.name': 'required'
    }
    const expectedResult = {}

    expect(validate(data, rules)).toMatchObject(expectedResult)
  })
})
