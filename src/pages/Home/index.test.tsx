import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { describe, expect, test } from 'vitest'

import { store } from '@/store'

import { Home } from './index'

describe('Home', () => {
  test('renders the App component', () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    )
    expect(screen.getByText(/Benchttp/i)).toBeDefined()
  })
})
