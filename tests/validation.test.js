import validate from '../src/validation'

describe('Validation', () => {
  test('should throw when no data provided', async () => {
    await expect(validate()).rejects.toThrow('No data for validation was provided')
  })

  test('should throw when no rules provided', async () => {
    await expect(validate({})).rejects.toThrow('No validation rules were provided')
  })

  test('should throw when validation rule does not exist', async () => {
    await expect(validate({}, { name: 'fake' })).rejects.toThrow('No validation function was defined for \'fake\' rule')
  })

  describe('Objects', () => {
    test('should validate empty object, no rules', async () => {
      await expect(validate({}, {})).resolves.toEqual({
        valid: true,
        errors: {}
      })
    })

    test('should validate single property, no rules', async () => {
      await expect(validate({ name: 'James' }, {})).resolves.toEqual({
        valid: true,
        errors: {}
      })
    })

    test('should validate multiple properties, no rules', async () => {
      await expect(validate({ name: 'James', age: 20 }, {})).resolves.toEqual({
        valid: true,
        errors: {}
      })
    })

    test('should validate single property, rules, correct data', async () => {
      await expect(validate({ name: 'James' }, { name: 'required' })).resolves.toEqual({
        valid: true,
        errors: {}
      })
    })

    test('should validate multiple properties, rules, correct data', async () => {
      const data = {
        name: 'James',
        age: 20
      }
      const rules = {
        name: 'required',
        surname: 'string',
        age: 'numeric'
      }

      await expect(validate(data, rules)).resolves.toEqual({
        valid: true,
        errors: {}
      })
    })

    test('should validate wildcard properties, rules, correct data', async () => {
      const data = {
        name: 'James',
        pets: ['Rex']
      }
      const rules = {
        '*.kids': 'required',
        'pets.*': 'string|min:2'
      }

      await expect(validate(data, rules)).resolves.toEqual({
        valid: true,
        errors: {}
      })
    })

    test('should validate single property, rules, incorrect data', async () => {
      await expect(validate({ name: '' }, { name: 'required' })).resolves.toEqual({
        valid: false,
        errors: { name: 'This field is required' }
      })
    })

    test('should validate multiple nested properties, rules, incorrect data', async () => {
      const data = {
        name: '',
        wife: { name: 'Susan' }
      }
      const rules = {
        name: 'required',
        'wife.name': 'required',
        'wife.pets.count': 'required'
      }

      await expect(validate(data, rules)).resolves.toEqual({
        valid: false,
        errors: {
          name: 'This field is required',
          'wife.pets.count': 'This field is required'
        }
      })
    })

    test('should validate wildcard properties, rules, incorrect data', async () => {
      const data = {
        name: 'Jack',
        pets: ['Rex', null, [[[], {}, { name: 'Tiger' }]]]
      }
      const rules = {
        name: 'required',
        pets: 'array',
        'pets.*': 'array',
        'pets.*.*.*.name': 'required',
        'cats.*': 'string'
      }

      await expect(validate(data, rules)).resolves.toEqual({
        valid: false,
        errors: {
          'pets.0': 'This field must be an array',
          'pets.1': 'This field must be an array',
          'pets.2.0.0.name': 'This field is required',
          'pets.2.0.1.name': 'This field is required'
        }
      })
    })
  })


  describe('Arrays', () => {
    test('should validate empty array, no rules', async () => {
      await expect(validate([], {})).resolves.toEqual({
        valid: true,
        errors: {}
      })
    })

    test('should validate single item, no rules', async () => {
      await expect(validate(['James'], {})).resolves.toEqual({
        valid: true,
        errors: {}
      })
    })

    test('should validate multiple items, no rules', async () => {
      await expect(validate(['James', 'Sam'], {})).resolves.toEqual({
        valid: true,
        errors: {}
      })
    })

    test('should validate single item, rules, correct data', async () => {
      await expect(validate(['James'], { '*': 'string' })).resolves.toEqual({
        valid: true,
        errors: {}
      })
    })

    test('should validate multiple items, rules, correct data', async () => {
      await expect(validate(['James', 'Sam'], { '*': 'string|min:3' })).resolves.toEqual({
        valid: true,
        errors: {}
      })
    })

    test('should validate object items, rules, correct data', async () => {
      const data = [
        { name: 'James', wife: { name: 'Susan' } },
        { name: 'Sam', wife: { name: 'Alexa' } }
      ]
      const rules = {
        '*.name': 'required|min:3',
        '*.wife.name': 'required'
      }

      await expect(validate(data, rules)).resolves.toEqual({
        valid: true,
        errors: {}
      })
    })

    test('should validate single item, rules, incorrect data', async () => {
      await expect(validate(['James'], { '*': 'string|min:6' })).resolves.toEqual({
        valid: false,
        errors: { 0: 'This field must be at least 6 characters' }
      })
    })

    test('should validate multiple items, rules, incorrect data', async () => {
      await expect(validate(['James', 'Sam'], { '*': 'string|min:5' })).resolves.toEqual({
        valid: false,
        errors: { 1: 'This field must be at least 5 characters' }
      })
    })

    test('should validate object items, rules, incorrect data', async () => {
      const data = [
        { name: 'James', wife: {} },
        { name: 'Sam', wife: { name: 'Alexa' } }
      ]
      const rules = {
        '*.name': 'required|min:5',
        '*.wife.name': 'required',
        '*.wife.age': 'required'
      }

      await expect(validate(data, rules)).resolves.toEqual({
        valid: false,
        errors: {
          '1.name': 'This field must be at least 5 characters',
          '0.wife.name': 'This field is required',
          '0.wife.age': 'This field is required',
          '1.wife.age': 'This field is required'
        }
      })
    })

    test('should validate complex nested items, rules, incorrect data', async () => {
      const data = ['', [1], { name: 'Rex' }]
      const rules = {
        '*': 'array',
        '*.*': 'string',
        '*.name': 'required',
        '*.*.name': 'required',
        '*.wife.name': 'required'
      }

      await expect(validate(data, rules)).resolves.toEqual({
        valid: false,
        errors: {
          0: 'This field must be an array',
          2: 'This field must be an array',
          '1.0': 'This field must be a string',
          '0.name': 'This field is required',
          '1.name': 'This field is required',
          '1.0.name': 'This field is required',
          '0.wife.name': 'This field is required',
          '1.wife.name': 'This field is required',
          '2.wife.name': 'This field is required'
        }
      })
    })
  })
})
