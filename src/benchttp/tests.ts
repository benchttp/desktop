export type TestPredicate = 'EQ' | 'NEQ' | 'GT' | 'GTE' | 'LT' | 'LTE'

export const isTestPredicate = (v: string): v is TestPredicate =>
  v === 'EQ' ||
  v === 'NEQ' ||
  v === 'GT' ||
  v === 'GTE' ||
  v === 'LT' ||
  v === 'LTE'
