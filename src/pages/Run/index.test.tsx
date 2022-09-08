import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

import { Run } from './index'

describe('Home', () => {
  test('renders the App component', () => {
    render(<Run />)
    expect(screen.getByText(/Benchttp/i)).toBeDefined()
  })
})
