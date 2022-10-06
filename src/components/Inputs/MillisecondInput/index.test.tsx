import { render, screen, fireEvent } from '@testing-library/react'
import { expect, test } from 'vitest'

import { MillisecondInput } from './index'

const setup = () => {
  const actual: { value: `${number}ms` } = {
    value: '10ms',
  }

  const utils = render(
    <MillisecondInput
      data-testid="t"
      id="t"
      value={actual.value}
      onChange={(v) => (actual.value = v)}
    />
  )

  const input = screen.getByTestId('t')

  return {
    actual,
    input,
    ...utils,
  }
}

test('the value is suffixed with "ms"', () => {
  const { input, actual } = setup()
  fireEvent.change(input, { target: { value: '20' } })
  expect(actual.value).toBe('20ms')
})

test('empty string returns "0ms"', () => {
  const { input, actual } = setup()
  fireEvent.change(input, { target: { value: '' } })
  expect(actual.value).toBe('0ms')
})

test('undefined returns "0ms"', () => {
  const { input, actual } = setup()
  fireEvent.change(input, { target: { value: '' } })
  expect(actual.value).toBe('0ms')
})

test('a value not assignable to number return "0ms"', () => {
  const { input, actual } = setup()
  fireEvent.change(input, { target: { value: 'A string' } })
  expect(actual.value).toBe('0ms')
})
