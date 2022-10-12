import { render, screen, fireEvent } from '@testing-library/react'
import { expect, test } from 'vitest'

import { ConfigurationTestCase } from '@/benchttp/configuration'
import { sleep } from '@/tools/utilities'

import { TestsConfiguration } from './TestsConfiguration'

const setup = () => {
  const actual: { value: ConfigurationTestCase[] } = {
    value: [],
  }

  const utils = render(
    <TestsConfiguration
      enabled={true}
      tests={actual.value}
      onChange={(v) => (actual.value = v)}
    />
  )

  const rerender = () =>
    utils.rerender(
      <TestsConfiguration
        enabled={true}
        tests={actual.value}
        onChange={(v) => (actual.value = v)}
      />
    )

  const button = {
    addTest: screen.getByTestId('add-test'),
    removeTest: (i: number) => screen.getByTestId(`remove-test-${i}`),
  }

  const input = {
    changeName: (i: number) => screen.getByTestId(`change-name-test-${i}`),
    changeField: (i: number) => screen.getByTestId(`change-field-test-${i}`),
    changePredicate: (i: number) =>
      screen.getByTestId(`change-predicate-test-${i}`),
    changeTarget: (i: number) => screen.getByTestId(`change-target-test-${i}`),
  }

  return {
    ...utils,
    actual,
    button,
    input,
    rerender,
  }
}

test('add a test (happy path)', () => {
  const { actual, button, input, rerender } = setup()
  fireEvent.click(button.addTest)
  rerender()
  fireEvent.change(input.changeName(0), {
    target: { value: 'the endpoint is fast' },
  })
  rerender()
  fireEvent.change(input.changeField(0), {
    target: { value: 'ResponseTimes.Max' },
  })
  rerender()
  fireEvent.change(input.changePredicate(0), { target: { value: 'LT' } })
  rerender()
  fireEvent.change(input.changeTarget(0), { target: { value: '100' } })
  rerender()
  expect(actual.value).toEqual([
    {
      name: 'the endpoint is fast',
      field: 'ResponseTimes.Max',
      predicate: 'LT',
      target: '100ms',
    },
  ])
  expect(input.changeName(0).getAttribute('aria-invalid')).not.toBe('true')
  expect(input.changeField(0).getAttribute('aria-invalid')).not.toBe('true')
  expect(input.changePredicate(0).getAttribute('aria-invalid')).not.toBe('true')
  expect(input.changeTarget(0).getAttribute('aria-invalid')).not.toBe('true')
})

test('remove a test', async () => {
  const { actual, button, rerender } = setup()
  fireEvent.click(button.addTest)
  rerender()
  fireEvent.click(button.removeTest(0))
  await sleep(500)
  rerender()
  expect(actual.value).toEqual([])
})

test('name is required', () => {
  const { button, input, rerender } = setup()
  fireEvent.click(button.addTest)
  rerender()
  fireEvent.change(input.changeName(0), { target: { value: '' } })
  rerender()
  expect(input.changeName(0).getAttribute('aria-invalid')).toBe('true')
})

test('field is required', () => {
  const { button, input, rerender } = setup()
  fireEvent.click(button.addTest)
  rerender()
  fireEvent.change(input.changeField(0), { target: { value: '' } })
  rerender()
  expect(input.changeField(0).getAttribute('aria-invalid')).toBe('true')
})

test('field is a valid metric field', () => {
  const { button, input, rerender } = setup()
  fireEvent.click(button.addTest)
  rerender()
  fireEvent.change(input.changeField(0), { target: { value: 'Not.A.Field' } })
  rerender()
  expect(input.changeField(0).getAttribute('aria-invalid')).toBe('true')
})

// We use a <select> element, the predicate is always defined.
test.skip('predicate is required')

// We use <NumberInput>, the target is always defined.
test.skip('target is required')

test('target equals its zero value (0 or "0ms") if omitted', () => {
  const { actual, button, input, rerender } = setup()
  fireEvent.click(button.addTest)
  rerender()
  fireEvent.change(input.changeField(0), {
    target: { value: 'ResponseTimes.Max' },
  })
  rerender()
  fireEvent.change(input.changeTarget(0), { target: { value: '' } })
  rerender()
  expect(actual.value[0].target).toBe('0ms')
  expect(input.changeTarget(0).getAttribute('aria-invalid')).toBe('false')
})

test('target is a duration when field is a duration metric field', () => {
  const { actual, button, input, rerender } = setup()
  fireEvent.click(button.addTest)
  rerender()
  fireEvent.change(input.changeField(0), {
    target: { value: 'ResponseTimes.Max' },
  })
  rerender()
  fireEvent.change(input.changeTarget(0), { target: { value: '100' } })
  rerender()
  expect(actual.value[0].target).toBe('100ms')
})

test('target is a number when field is a number metric field', () => {
  const { actual, button, input, rerender } = setup()
  fireEvent.click(button.addTest)
  rerender()
  fireEvent.change(input.changeField(0), {
    target: { value: 'StatusCodesDistribution.200' },
  })
  rerender()
  fireEvent.change(input.changeTarget(0), { target: { value: '100' } })
  rerender()
  expect(actual.value[0].target).toBe(100)
})
