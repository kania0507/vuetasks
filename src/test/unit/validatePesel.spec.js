import { describe, it, expect } from 'vitest' // lub 'jest'
import { validatePesel } from '@/utils/validatePesel'

describe('validatePesel', () => {
  it('should return true for a valid PESEL', () => {
    const validPesel = '44051401359' // poprawny PESEL
    expect(validatePesel(validPesel)).toBe(true)
  })

  it('should return false for PESEL with wrong checksum', () => {
    const wrongChecksum = '44051401358'
    expect(validatePesel(wrongChecksum)).toBe(false)
  })

  it('should return false for PESEL with letters', () => {
    const invalidPesel = '44051A01359'
    expect(validatePesel(invalidPesel)).toBe(false)
  })

  it('should return false for PESEL too short', () => {
    const tooShort = '4405140135'
    expect(validatePesel(tooShort)).toBe(false)
  })

  it('should return false for PESEL too long', () => {
    const tooLong = '440514013599'
    expect(validatePesel(tooLong)).toBe(false)
  })

  it('should return false for empty input', () => {
    expect(validatePesel('')).toBe(false)
  })
})