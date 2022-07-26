import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'

import { Run } from './Run'

describe('Run', () => {
  test('starts at the Configuration view', () => {
    render(
      <MemoryRouter initialEntries={[initialRouteLocation]}>
        <Run />
      </MemoryRouter>
    )
    expect(screen.getByText(/Configuration/i)).toBeDefined()
  })
})

// Relative to Run, thus right under '/run'
// which is the first part of the route.
const initialRouteLocation = '/config'
