import { FC } from 'react'

import {
  ConfigurationTestCase,
  isTestingDurationMetricField,
} from '@/benchttp/configuration'
import {
  MillisecondInput,
  NumberInput,
  SelectInput,
  TextInput,
} from '@/components/Inputs'

import {
  getClassName,
  handleDurationTargetChange,
  handleFieldChange,
  handleNameChange,
  handleNumberTargetChange,
  handlePredicateChange,
  isValidTestField,
  isValidTestTarget,
} from './internal/SingleTest.helpers'

interface IProps {
  className?: string | undefined
  test: ConfigurationTestCase
  enabled: boolean
  tests: ConfigurationTestCase[]
  index: number
  onChange: (tests: ConfigurationTestCase[]) => void
}

export const SingleTest: FC<IProps> = ({
  className,
  test,
  index,
  onChange,
  tests,
  enabled,
}) => {
  return (
    <div className={getClassName(className)}>
      <TextInput
        data-testid={`change-name-test-${index}`}
        id={`test-name-${index}`}
        className="mr-3"
        value={test.name}
        label="Name"
        onChange={handleNameChange(tests, index, onChange)}
        disabled={!enabled}
        invalid={test.name === ''}
        required
      />
      <TextInput
        data-testid={`change-field-test-${index}`}
        id={`test-field-${index}`}
        className="mr-3"
        value={test.field}
        label="Field"
        onChange={handleFieldChange(tests, index, onChange)}
        disabled={!enabled}
        invalid={!isValidTestField(test.field)}
        required
      />
      <SelectInput
        data-testid={`change-predicate-test-${index}`}
        id={`test-predicate-${index}`}
        className="mr-3"
        value={test.predicate}
        options={[
          { value: 'EQ', display: 'equals' },
          { value: 'NEQ', display: 'non equals' },
          { value: 'GT', display: 'greater than' },
          { value: 'GTE', display: 'greater than or equals' },
          { value: 'LT', display: 'lower than' },
          { value: 'LTE', display: 'lower than or equals' },
        ]}
        label="Predicate"
        onChange={handlePredicateChange(tests, index, onChange)}
        disabled={!enabled}
      />
      {isTestingDurationMetricField(test) ? (
        <MillisecondInput
          data-testid={`change-target-test-${index}`}
          id={`test-target-${index}`}
          value={test.target as `${number}ms`}
          label={'Target'}
          onChange={handleDurationTargetChange(tests, index, onChange)}
          disabled={!enabled}
          invalid={!isValidTestTarget(test.target, test.field)}
        />
      ) : (
        <NumberInput
          data-testid={`change-target-test-${index}`}
          id={`test-target-${index}`}
          value={test.target}
          label={'Target'}
          onChange={handleNumberTargetChange(tests, index, onChange)}
          disabled={!enabled}
          invalid={!isValidTestTarget(test.target, test.field)}
        />
      )}
    </div>
  )
}
