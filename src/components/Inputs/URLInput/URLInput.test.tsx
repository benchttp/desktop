import { render, screen, fireEvent } from '@testing-library/react'
import { expect, test } from 'vitest'

import { URLInput } from './URLInput'

const setup = () => {
  const actual: { value: string } = {
    value: '',
  }

  const utils = render(
    <URLInput
      data-testid="t"
      id="t"
      value={actual.value}
      onChange={(v) => (actual.value = v)}
    />
  )

  const rerender = () =>
    utils.rerender(
      <URLInput
        data-testid="t"
        id="t"
        value={actual.value}
        onChange={(v) => (actual.value = v)}
      />
    )

  const input = screen.getByTestId('t')

  return {
    ...utils,
    actual,
    input,
    rerender,
  }
}

test('an invalid url adds "aria-invalid" to the input', () => {
  const { input, actual, rerender } = setup()
  fireEvent.change(input, { target: { value: 'A string' } })
  expect(actual.value).toBe('A string')
  rerender()
  expect(input.getAttribute('aria-invalid')).toBe('true')
})

test('empty string is an invalid url', () => {
  const { input, actual, rerender } = setup()
  fireEvent.change(input, { target: { value: '' } })
  expect(actual.value).toBe('')
  rerender()
  expect(input.getAttribute('aria-invalid')).toBe('true')
})

test('a url with protocol "http:" is valid', () => {
  const { input, actual, rerender } = setup()
  fireEvent.change(input, { target: { value: 'http://test.com' } })
  expect(actual.value).toBe('http://test.com')
  rerender()
  expect(input.getAttribute('aria-invalid')).toBe('false')
})

test('a url with protocol "https:" is valid', () => {
  const { input, actual, rerender } = setup()
  fireEvent.change(input, { target: { value: 'https://test.com' } })
  expect(actual.value).toBe('https://test.com')
  rerender()
  expect(input.getAttribute('aria-invalid')).toBe('false')
})

test('a url with protocol "localhost:" is valid', () => {
  const { input, actual, rerender } = setup()
  fireEvent.change(input, { target: { value: 'localhost:1234' } })
  expect(actual.value).toBe('localhost:1234')
  rerender()
  expect(input.getAttribute('aria-invalid')).toBe('false')
})
