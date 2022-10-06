import { render, screen, fireEvent } from '@testing-library/react'
import { expect, test } from 'vitest'

import { NumberInput } from './index'

const setup = () => {
  const actual: { value: number } = {
    value: 10,
  }

  const utils = render(
    <NumberInput
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

test('the value is converted to number', () => {
  const { input, actual } = setup()
  fireEvent.change(input, { target: { value: '20' } })
  expect(actual.value).toBe(20)
})

test('empty string returns 0', () => {
  const { input, actual } = setup()
  fireEvent.change(input, { target: { value: '' } })
  expect(actual.value).toBe(0)
})

test('undefined is noop', () => {
  const { input, actual } = setup()
  fireEvent.change(input, { target: { value: undefined } })
  expect(actual.value).toBe(10)
})

test('a value not assignable to number return 0', () => {
  const { input, actual } = setup()
  fireEvent.change(input, { target: { value: 'A string' } })
  expect(actual.value).toBe(0)
})
