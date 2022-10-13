import { render, screen, fireEvent } from '@testing-library/react'
import { expect, test } from 'vitest'

import { sleep } from '@/tools/utilities'

import { HeadersConfiguration } from './HeadersConfiguration'
import { Headers } from './internal/HeadersConfiguration.types'

const setup = () => {
  const actual: { value: Headers } = {
    value: {},
  }

  const utils = render(
    <HeadersConfiguration
      headers={actual.value}
      onChange={(v) => (actual.value = v)}
    />
  )

  const rerender = () =>
    utils.rerender(
      <HeadersConfiguration
        headers={actual.value}
        onChange={(v) => (actual.value = v)}
      />
    )

  const button = {
    addHeader: screen.getByTestId('add-header'),
    removeHeader: (i: number) => screen.getByTestId(`remove-header-${i}`),
  }

  const input = {
    changeKey: (i: number) => screen.getByTestId(`change-key-header-${i}`),
    changeValue: (i: number) => screen.getByTestId(`change-value-header-${i}`),
  }

  return {
    ...utils,
    actual,
    button,
    input,
    rerender,
  }
}

test('add a header (happy path)', () => {
  const { actual, button, input, rerender } = setup()
  fireEvent.click(button.addHeader)
  rerender()
  fireEvent.change(input.changeKey(0), { target: { value: 'Custom-Header' } })
  rerender()
  fireEvent.change(input.changeValue(0), { target: { value: 'foo' } })
  rerender()
  expect(actual.value).toEqual({ 'Custom-Header': ['foo'] })
  expect(input.changeKey(0).getAttribute('aria-invalid')).not.toBe('true')
  expect(input.changeValue(0).getAttribute('aria-invalid')).not.toBe('true')
})

test('remove a header', async () => {
  const { actual, button, rerender } = setup()
  fireEvent.click(button.addHeader)
  rerender()
  fireEvent.click(button.removeHeader(0))
  await sleep(500)
  rerender()
  expect(actual.value).toEqual({})
})

test('key is required', () => {
  const { button, input, rerender } = setup()
  fireEvent.click(button.addHeader)
  rerender()
  fireEvent.change(input.changeKey(0), { target: { value: '' } })
  rerender()
  expect(input.changeKey(0).getAttribute('aria-invalid')).toBe('true')
})

test('value is required', () => {
  const { button, input, rerender } = setup()
  fireEvent.click(button.addHeader)
  rerender()
  fireEvent.change(input.changeValue(0), { target: { value: '' } })
  rerender()
  expect(input.changeValue(0).getAttribute('aria-invalid')).toBe('true')
})

test('value supports multiple values when separated by commas', () => {
  const { actual, button, input, rerender } = setup()
  fireEvent.click(button.addHeader)
  rerender()
  fireEvent.change(input.changeKey(0), { target: { value: 'Custom-Header' } })
  rerender()
  fireEvent.change(input.changeValue(0), { target: { value: 'foo, bar, baz' } })
  rerender()
  expect(actual.value).toEqual({ 'Custom-Header': ['foo', 'bar', 'baz'] })
})
