import { describe, expect, test } from 'vitest'

import { FieldRepr } from './field'
import { parseField } from './parse'

describe('parseField', () => {
  test('empty field', () => {
    expectInvalidField('')
  })

  test('invalid root field', () => {
    expectInvalidField('abc')
  })

  test('ResponseTimes', () => {
    expectValidFields([
      'ResponseTimes.Min',
      'ResponseTimes.Max',
      'ResponseTimes.Mean',
      'ResponseTimes.Median',
      'ResponseTimes.Deciles',
      'ResponseTimes.Deciles.1',
      'ResponseTimes.Quartiles',
      'ResponseTimes.Quartiles.2',
      'ResponseTimes.StandardDeviation',
    ])
    expectInvalidFields([
      'ResponseTimes.xxx',
      'ResponseTimes.Max.xxx',
      'ResponseTimes.1',
      'ResponseTimes.Max.1',
      'ResponseTimes.Deciles.-1',
    ])
  })

  test('RequestEventTimes', () => {
    expectValidFields([
      'RequestEventTimes.DNSDone.Min',
      'RequestEventTimes.ConnectDone.Max',
      'RequestEventTimes.TLSHandshakeDone.Mean',
      'RequestEventTimes.WroteHeaders.Median',
      'RequestEventTimes.WroteRequest.Deciles',
      'RequestEventTimes.GotFirstResponseByte.Quartiles',
      'RequestEventTimes.BodyRead.StandardDeviation',
      'RequestEventTimes.PutIdleConn.StandardDeviation',
    ])
    expectInvalidFields([
      'RequestEventTimes.xxx',
      'RequestEventTimes.ConnectDone.xxx',
      'RequestEventTimes.ConnectDone.Mean.xxx',
    ])
  })

  test('StatusCodesDistribution', () => {
    expectValidFields([
      'StatusCodesDistribution.101',
      'StatusCodesDistribution.200',
      'StatusCodesDistribution.302',
      'StatusCodesDistribution.418',
      'StatusCodesDistribution.500',
    ])
    expectInvalidFields([
      'StatusCodesDistribution.xxx',
      'StatusCodesDistribution.-1',
      'StatusCodesDistribution.99',
      'StatusCodesDistribution.600',
      'StatusCodesDistribution.200.xxx',
    ])
  })
})

const expectValidField = (field: FieldRepr) => {
  const parsedField = parseField(field)

  expect(parsedField?.isValid()).toBeTruthy()
  expect(parsedField?.root.key).toEqual(getRoot(field))
  expect(parsedField?.depth).toEqual(getDepth(field))
  if (hasParent(field)) {
    expectValidField(getParent(field))
  }
}

const expectValidFields = (fields: FieldRepr[]) => {
  fields.forEach(expectValidField)
}

const expectInvalidField = (field: string) =>
  // @ts-expect-error - testing context
  expect(parseField(field)).toBeNull()

const expectInvalidFields = (fields: string[]) => {
  fields.forEach(expectInvalidField)
}

const hasParent = (field: FieldRepr) => field.split('.').length > 1

const getParent = (field: FieldRepr): FieldRepr =>
  field.split('.').slice(0, -1).join('.') as FieldRepr

const getDepth = (field: FieldRepr): number => field.split('.').length - 1

const getRoot = (field: FieldRepr) => field.split('.')[0]
