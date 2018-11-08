import { areArraysEqual } from './collections'

describe('utils: collections', () => {
  describe('areArraysEqual', () => {
    it('should throw an error for non-arrays', () => {
      expect(() => areArraysEqual(null, null)).toThrow()
      expect(() => areArraysEqual(null, [])).toThrow()
      expect(() => areArraysEqual([], null)).toThrow()
    })

    it('should return false if arrays have different lengths', () => {
      expect(areArraysEqual([1], [1, 2])).toBe(false)
      expect(areArraysEqual([1, 3], [1])).toBe(false)
      expect(areArraysEqual([], [1])).toBe(false)
      expect(areArraysEqual([2], [])).toBe(false)
    })

    it('should return false if any items are different', () => {
      expect(areArraysEqual([1, 2, 3], [1, 3, 3])).toBe(false)
      expect(areArraysEqual([1, 3], [2, 3])).toBe(false)
    })

    it('should return true if arrays are equal', () => {
      expect(areArraysEqual([1, 2], [1, 2])).toBe(true)
      expect(areArraysEqual([1], [1])).toBe(true)
      expect(areArraysEqual([], [])).toBe(true)
    })
  })
})
