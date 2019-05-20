import { makeEmptyInitialValues } from './schema'

describe('utils: forms/schema', () => {
  describe('makeEmptyInitialValues', () => {
    it('should throw an exception on invalid schema', () => {
      expect(() => makeEmptyInitialValues(null)).toThrow()
      expect(() => makeEmptyInitialValues(undefined)).toThrow()
      expect(() => makeEmptyInitialValues({})).toThrow()
    })

    it('should return the schema structure with empty strings as values', () => {
      const schema = {
        username: { icon: 'fake icon' },
        email: { something: true },
      }
      const result = makeEmptyInitialValues(schema)
      expect(result).toEqual({
        username: '',
        email: '',
      })
    })

    it('should work with nested structures using "fields" property', () => {
      const schema = {
        user: {
          fields: {
            firstName: {},
            lastName: {},
          },
        },
        email: {},
      }
      expect(makeEmptyInitialValues(schema)).toEqual({
        user: {
          firstName: '',
          lastName: '',
        },
        email: '',
      })
    })

    it('should use provided default values', () => {
      const schema = {
        user: {
          fields: {
            firstName: {},
            lastName: {},
          },
        },
        email: {},
        city: {},
      }
      const values = {
        user: {
          lastName: 'Tester',
        },
        city: 'Seattle',
      }
      expect(makeEmptyInitialValues(schema, values)).toEqual({
        user: {
          firstName: '',
          lastName: 'Tester',
        },
        email: '',
        city: 'Seattle',
      })
    })
  })
})
