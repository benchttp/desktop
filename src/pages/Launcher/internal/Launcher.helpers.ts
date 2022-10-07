import { MouseEventHandler } from 'react'
import { NavigateFunction } from 'react-router-dom'

export const handleStartClick = (
  navigate: NavigateFunction
): MouseEventHandler => {
  return () => {
    navigate('run')
  }
}
