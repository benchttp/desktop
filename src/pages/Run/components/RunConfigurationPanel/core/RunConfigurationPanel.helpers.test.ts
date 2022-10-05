import { describe, expect, test } from 'vitest'

import { getRunConfiguration } from './RunConfigurationPanel.helpers'
import { IRunConfigurationInput } from './RunConfigurationPanel.typings'

const mockRunConfigurationInput = (
  v: Partial<IRunConfigurationInput>
): IRunConfigurationInput => ({
  method: 'GET',
  url: 'http://test.com',
  headers: [],
  body: '',
  requests: 1000,
  concurrency: 2,
  interval: '100ms',
  requestTimeout: '1000ms',
  globalTimeout: '30000ms',
  areTestsEnabled: true,
  tests: [],
  ...v,
})

describe('Parse run configuration', () => {
  describe('Parse method', () => {
    test('GET is valid', () => {
      const given = mockRunConfigurationInput({ method: 'GET' })
      const actual = getRunConfiguration(given)
      expect(actual.request.method).toEqual('GET')
    })
    test('any other string is invalid', () => {
      const given = mockRunConfigurationInput({ method: '' })
      expect(() => getRunConfiguration(given)).toThrow()
    })
  })

  describe('Parse url', () => {
    test('empty string is invalid', () => {
      const given = mockRunConfigurationInput({ url: '' })
      expect(() => getRunConfiguration(given)).toThrow()
    })
    test('any other string is valid', () => {
      const given = mockRunConfigurationInput({ url: 'https://test.com' })
      const actual = getRunConfiguration(given)
      expect(actual.request.url).toEqual('https://test.com')
    })
  })

  describe('Parse header', () => {
    test('no headers return undefined', () => {
      const given = mockRunConfigurationInput({ headers: [] })
      const actual = getRunConfiguration(given)
      expect(actual.request.header).toBe(undefined)
    })
    test('header with empty key is discarded', () => {
      const given = mockRunConfigurationInput({
        headers: [{ key: '', values: ['value'] }],
      })
      const actual = getRunConfiguration(given)
      expect(actual.request.header).toEqual(undefined)
    })
    test('header with empty value is discarded', () => {
      const given = mockRunConfigurationInput({
        headers: [
          { key: 'key', values: [] },
          { key: 'key', values: [''] },
        ],
      })
      const actual = getRunConfiguration(given)
      expect(actual.request.header).toEqual(undefined)
    })
    test('empty value of multi values header is discarded', () => {
      const given = mockRunConfigurationInput({
        headers: [{ key: 'key', values: ['value', ''] }],
      })
      const actual = getRunConfiguration(given)
      expect(actual.request.header).toEqual({ key: ['value'] })
    })
    test('header with key and value is valid', () => {
      const given = mockRunConfigurationInput({
        headers: [{ key: 'key', values: ['value'] }],
      })
      const actual = getRunConfiguration(given)
      expect(actual.request.header).toEqual({ key: ['value'] })
    })
  })

  describe('Parse body', () => {
    test('empty string return undefined', () => {
      const given = mockRunConfigurationInput({ body: '' })
      const actual = getRunConfiguration(given)
      expect(actual.request.body).toBe(undefined)
    })
    test('any other string is valid', () => {
      const given = mockRunConfigurationInput({ body: '{ name : "John Doe"}' })
      const actual = getRunConfiguration(given)
      expect(actual.request.body).toEqual({
        type: 'raw',
        content: '{ name : "John Doe"}',
      })
    })
  })

  describe('Parse requests', () => {
    test('no requests is invalid', () => {
      const given = mockRunConfigurationInput({ requests: undefined })
      expect(() => getRunConfiguration(given)).toThrow()
    })

    test('every other number is valid', () => {
      const given = mockRunConfigurationInput({ requests: 1000 })
      const actual = getRunConfiguration(given)
      expect(actual.runner.requests).toEqual(1000)
    })
  })

  describe('Parse concurrency', () => {
    test('no concurrency is invalid', () => {
      const given = mockRunConfigurationInput({ concurrency: undefined })
      expect(() => getRunConfiguration(given)).toThrow()
    })

    test('every other number is valid', () => {
      const given = mockRunConfigurationInput({ concurrency: 2 })
      const actual = getRunConfiguration(given)
      expect(actual.runner.concurrency).toEqual(2)
    })
  })

  describe('Parse interval', () => {
    test('no interval is invalid', () => {
      const given = mockRunConfigurationInput({ interval: undefined })
      expect(() => getRunConfiguration(given)).toThrow()
    })

    test('every other GoDuration is valid', () => {
      const given = mockRunConfigurationInput({ interval: '100ms' })
      const actual = getRunConfiguration(given)
      expect(actual.runner.interval).toEqual('100ms')
    })
  })

  describe('Parse requestTimeout', () => {
    test('no requestTimeout is invalid', () => {
      const given = mockRunConfigurationInput({ requestTimeout: undefined })
      expect(() => getRunConfiguration(given)).toThrow()
    })

    test('every other GoDuration is valid', () => {
      const given = mockRunConfigurationInput({ requestTimeout: '1000ms' })
      const actual = getRunConfiguration(given)
      expect(actual.runner.requestTimeout).toEqual('1000ms')
    })
  })

  describe('Parse globalTimeout', () => {
    test('no globalTimeout is invalid', () => {
      const given = mockRunConfigurationInput({ globalTimeout: undefined })
      expect(() => getRunConfiguration(given)).toThrow()
    })

    test('every other GoDuration is valid', () => {
      const given = mockRunConfigurationInput({ globalTimeout: '1000ms' })
      const actual = getRunConfiguration(given)
      expect(actual.runner.globalTimeout).toEqual('1000ms')
    })
  })

  describe('Parse tests', () => {
    test('no test return undefined', () => {
      const given = mockRunConfigurationInput({ tests: [] })
      const actual = getRunConfiguration(given)
      expect(actual.tests).toBe(undefined)
    })
    test('empty name is invalid', () => {
      const given = mockRunConfigurationInput({
        tests: [
          { name: '', field: 'RequestCount', predicate: 'EQ', target: '100' },
        ],
      })
      expect(() => getRunConfiguration(given)).toThrow()
    })
    test('empty field is invalid', () => {
      const given = mockRunConfigurationInput({
        // @ts-expect-error we are testing for this
        tests: [{ name: 'my test', field: '', predicate: 'EQ', target: '100' }],
      })
      expect(() => getRunConfiguration(given)).toThrow()
    })
    test('empty predicate is invalid', () => {
      const given = mockRunConfigurationInput({
        tests: [
          {
            name: 'my test',
            field: 'RequestCount',
            // @ts-expect-error we are testing for this
            predicate: '',
            target: '100',
          },
        ],
      })
      expect(() => getRunConfiguration(given)).toThrow()
    })
    test('empty target is invalid', () => {
      const given = mockRunConfigurationInput({
        tests: [
          {
            name: 'my test',
            field: 'ResponseTimes.Mean',
            predicate: 'EQ',
            target: '',
          },
        ],
      })
      expect(() => getRunConfiguration(given)).toThrow()
    })
    test('test with a duration field return target as GoDuration', () => {
      const given = mockRunConfigurationInput({
        tests: [
          {
            name: 'my test',
            field: 'ResponseTimes.Mean',
            predicate: 'EQ',
            target: '100',
          },
        ],
      })
      const actual = getRunConfiguration(given)
      expect(actual.tests).toEqual([
        {
          name: 'my test',
          field: 'ResponseTimes.Mean',
          predicate: 'EQ',
          target: '100ms',
        },
      ])
    })
    test('test with a number field return target as number', () => {
      const given = mockRunConfigurationInput({
        tests: [
          {
            name: 'my test',
            field: 'RequestCount',
            predicate: 'EQ',
            target: '100',
          },
        ],
      })
      const actual = getRunConfiguration(given)
      expect(actual.tests).toEqual([
        {
          name: 'my test',
          field: 'RequestCount',
          predicate: 'EQ',
          target: 100,
        },
      ])
    })
    test('test with a number field and a target not parsable as integer is invalid', () => {
      const given = mockRunConfigurationInput({
        tests: [
          {
            name: 'my test',
            field: 'RequestCount',
            predicate: 'EQ',
            target: 'string not parsable as integer',
          },
        ],
      })
      expect(() => {
        getRunConfiguration(given)
      }).toThrow()
    })
    test('test with a duration field and a target not parsable as GoDuration is invalid', () => {
      const given = mockRunConfigurationInput({
        tests: [
          {
            name: 'my test',
            field: 'ResponseTimes.Mean',
            predicate: 'EQ',
            target: 'string not parsable as GoDuration',
          },
        ],
      })
      expect(() => {
        getRunConfiguration(given)
      }).toThrow()
    })
    test('test with disabled test section should return undefined', () => {
      const given = mockRunConfigurationInput({
        areTestsEnabled: false,
        tests: [
          {
            name: 'test',
            field: 'ResponseTimes.Mean',
            predicate: 'EQ',
            target: '100ms',
          },
        ],
      })
      const actual = getRunConfiguration(given)
      expect(actual.tests).toEqual(undefined)
    })
  })
})
