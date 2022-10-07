import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

import { ExampleComponent } from './ExampleComponent'

describe.skip('Run', () => {
  test('renders the Run view', () => {
    render(<ExampleComponent foo={'foo'} />)
    expect(screen.getByText(/foo/i)).toBeDefined()
  })
})
