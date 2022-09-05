import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

import { Home } from './index'

describe('Home', () => {
  test('renders the App component', () => {
    render(<Home />)
    expect(screen.getByText(/Benchttp/i)).toBeDefined()
  })
})
