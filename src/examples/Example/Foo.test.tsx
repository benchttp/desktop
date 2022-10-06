import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

import { Example } from './Example'

describe.skip('Run', () => {
  test('renders the Run view', () => {
    render(<Example foo={'foo'} />)
    expect(screen.getByText(/foo/i)).toBeDefined()
  })
})
