import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

import App from './App'

describe('App', () => {
  test('renders the App component', () => {
    render(App())
    expect(screen.getByText(/Benchttp/i)).toBeDefined()
  })
})
