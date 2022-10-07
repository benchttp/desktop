import { render, screen, fireEvent } from '@testing-library/react'
import { expect, test } from 'vitest'

import { HeadersConfiguration } from './HeadersConfiguration'
import { Headers } from './internal/HeadersConfiguration.typing'

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

test('when adding a header the key and value pair is saved', () => {
  const { actual, button, input, rerender } = setup()
  fireEvent.click(button.addHeader)
  rerender()
  fireEvent.change(input.changeKey(0), { target: { value: 'Custom-Header' } })
  rerender()
  fireEvent.change(input.changeValue(0), { target: { value: 'foo' } })
  rerender()
  expect(actual.value).toEqual({ 'Custom-Header': ['foo'] })
})

test('adding a header without key is invalid', () => {
  const { button, input, rerender } = setup()
  fireEvent.click(button.addHeader)
  rerender()
  fireEvent.change(input.changeKey(0), { target: { value: '' } })
  rerender()
  expect(input.changeKey(0).getAttribute('aria-invalid')).toBe('true')
})

test('adding a header without value is invalid', () => {
  const { button, input, rerender } = setup()
  fireEvent.click(button.addHeader)
  rerender()
  fireEvent.change(input.changeValue(0), { target: { value: '' } })
  rerender()
  expect(input.changeValue(0).getAttribute('aria-invalid')).toBe('true')
})

test('when removing a header the data is discarded', () => {
  const { actual, button, rerender } = setup()
  fireEvent.click(button.addHeader)
  rerender()
  fireEvent.click(button.removeHeader(0))
  rerender()
  expect(actual.value).toEqual({})
})

test('support multiple values for the same key by separating values with ","', () => {
  const { actual, button, input, rerender } = setup()
  fireEvent.click(button.addHeader)
  rerender()
  fireEvent.change(input.changeKey(0), { target: { value: 'Custom-Header' } })
  rerender()
  fireEvent.change(input.changeValue(0), { target: { value: 'foo, bar, baz' } })
  rerender()
  expect(actual.value).toEqual({ 'Custom-Header': ['foo', 'bar', 'baz'] })
})
