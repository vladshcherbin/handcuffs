import { rules } from '../src/rules'
import validate from '../src/validation'

describe('Validation', () => {
  test('should throw when no data provided', async () => {
    await expect(validate()).rejects.toThrow('No data for validation was provided')
  })

  test('should throw when no rules provided', async () => {
    await expect(validate({})).rejects.toThrow('No validation rules were provided')
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
      await expect(validate({ name: 'James' }, { name: [rules.required()] })).resolves.toEqual({
        valid: true,
        errors: {}
      })
    })

    test('should validate multiple properties, rules, correct data', async () => {
      const data = {
        name: 'James',
        age: 20
      }
      const dataRules = {
        name: [rules.required()],
        surname: [rules.string()],
        age: [rules.numeric(), rules.min(20)]
      }

      await expect(validate(data, dataRules)).resolves.toEqual({
        valid: true,
        errors: {}
      })
    })

    test('should validate wildcard properties, rules, correct data', async () => {
      const data = {
        name: 'James',
        pets: ['Rex']
      }
      const dataRules = {
        '*.kids': [rules.required()],
        'pets.*': [rules.string(), rules.min(2)]
      }

      await expect(validate(data, dataRules)).resolves.toEqual({
        valid: true,
        errors: {}
      })
    })

    test('should validate single property, rules, incorrect data', async () => {
      await expect(validate({ name: '' }, { name: [rules.required()] })).resolves.toEqual({
        valid: false,
        errors: { name: 'This field is required' }
      })
    })

    test('should validate multiple nested properties, rules, incorrect data', async () => {
      const data = {
        name: '',
        wife: { name: 'Susan' }
      }
      const dataRules = {
        name: [rules.required()],
        'wife.name': [rules.required()],
        'wife.pets.count': [rules.required()]
      }

      await expect(validate(data, dataRules)).resolves.toEqual({
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
      const dataRules = {
        name: [rules.required()],
        pets: [rules.array()],
        'pets.*': [rules.array()],
        'pets.*.*.*.name': [rules.required()],
        'cats.*': [rules.string()]
      }

      await expect(validate(data, dataRules)).resolves.toEqual({
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
      await expect(validate(['James'], { '*': [rules.string()] })).resolves.toEqual({
        valid: true,
        errors: {}
      })
    })

    test('should validate multiple items, rules, correct data', async () => {
      await expect(validate(['James', 'Sam'], { '*': [rules.string(), rules.min(3)] })).resolves.toEqual({
        valid: true,
        errors: {}
      })
    })

    test('should validate object items, rules, correct data', async () => {
      const data = [
        { name: 'James', wife: { name: 'Susan' } },
        { name: 'Sam', wife: { name: 'Alexa' } }
      ]
      const dataRules = {
        '*.name': [rules.string(), rules.min(3)],
        '*.wife.name': [rules.string()]
      }

      await expect(validate(data, dataRules)).resolves.toEqual({
        valid: true,
        errors: {}
      })
    })

    test('should validate single item, rules, incorrect data', async () => {
      await expect(validate(['James'], { '*': [rules.string(), rules.min(6)] })).resolves.toEqual({
        valid: false,
        errors: { 0: 'This field must be at least 6 characters' }
      })
    })

    test('should validate multiple items, rules, incorrect data', async () => {
      await expect(validate(['James', 'Sam'], { '*': [rules.string(), rules.min(5)] })).resolves.toEqual({
        valid: false,
        errors: { 1: 'This field must be at least 5 characters' }
      })
    })

    test('should validate object items, rules, incorrect data', async () => {
      const data = [
        { name: 'James', wife: {} },
        { name: 'Sam', wife: { name: 'Alexa' } }
      ]
      const dataRules = {
        '*.name': [rules.required(), rules.min(5)],
        '*.wife.name': [rules.required()],
        '*.wife.age': [rules.required()]
      }

      await expect(validate(data, dataRules)).resolves.toEqual({
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
      const dataRules = {
        '*': [rules.array()],
        '*.*': [rules.string()],
        '*.name': [rules.required()],
        '*.*.name': [rules.required()],
        '*.wife.name': [rules.required()]
      }

      await expect(validate(data, dataRules)).resolves.toEqual({
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
