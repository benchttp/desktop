import { ChangeEventHandler } from 'react'

export const handleChangeAsMethod = (
  onChange: (value: 'GET') => void
): ChangeEventHandler<HTMLSelectElement> => {
  // Simply cast the type. We can be confident in <select> element to restrict the values.
  return (e) => onChange(e.target.value as 'GET')
}
