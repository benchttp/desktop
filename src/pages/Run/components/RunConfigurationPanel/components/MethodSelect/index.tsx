import { ChangeEventHandler, FC } from 'react'

import { SelectInput } from '@/components/Inputs'
import { TestingProps } from '@/testing'

interface IProps extends TestingProps {
  className?: string
  id: string
  value: string
  onChange: (value: 'GET') => void
  label?: string
}

export const MethodSelect: FC<IProps> = ({
  className,
  value,
  onChange,
  label,
}) => (
  <SelectInput
    className={className}
    id="method"
    value={value}
    onChange={handleChangeAsMethod(onChange)}
    options={[
      { value: 'GET', display: 'GET' },
      { value: 'POST', display: 'POST', disabled: true },
      { value: 'PUT', display: 'PUT', disabled: true },
      { value: 'PATCH', display: 'PATCH', disabled: true },
      { value: 'DELETE', display: 'DELETE', disabled: true },
    ]}
    label={label}
  />
)

const handleChangeAsMethod = (
  onChange: IProps['onChange']
): ChangeEventHandler<HTMLSelectElement> => {
  // Simply cast the type. We can be confident in <select> element to restrict the values.
  return (e) => onChange(e.target.value as 'GET')
}
