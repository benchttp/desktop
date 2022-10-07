import { FC } from 'react'
import { PlusSquare, Trash } from 'react-feather'

import {
  ConfigurationTestCase,
  isTestingNumberMetricField,
} from '@/benchttp/configuration'
import {
  MillisecondInput,
  NumberInput,
  SelectInput,
  TextInput,
} from '@/components/Inputs'

import {
  handleFieldChange,
  handleNameChange,
  handlePredicateChange,
  handleDurationTargetChange,
  handleNumberTargetChange,
  handleRemoveTest,
  handleAddTest,
  getIconClassNames,
  isValidTestField,
} from './internal/TestsConfiguration.helper'

interface IProps {
  tests: ConfigurationTestCase[]
  onChange: (tests: ConfigurationTestCase[]) => void
  enabled: boolean
}

export const TestsConfiguration: FC<IProps> = ({
  tests,
  onChange,
  enabled,
}) => {
  const trashClassNames = getIconClassNames({
    className: 'mr-3',
    enabled,
  })

  const plusClassNames = getIconClassNames({
    enabled,
  })

  return (
    <div className="f f-direction-column f-ai-start">
      {tests.map((test, index) => (
        <div key={`test-${index}`} className="f f-direction-row f-ai-center">
          <SingleTest
            test={test}
            index={index}
            onChange={onChange}
            tests={tests}
            enabled={enabled}
          />
          <Trash
            className={trashClassNames.join(' ')}
            onClick={handleRemoveTest(tests, index, enabled, onChange)}
          />
        </div>
      ))}
      <PlusSquare
        className={plusClassNames.join(' ')}
        onClick={handleAddTest(tests, enabled, onChange)}
      />
    </div>
  )
}

interface IPropsSingleTest {
  test: ConfigurationTestCase
  enabled: boolean
  tests: ConfigurationTestCase[]
  index: number
  onChange: (tests: ConfigurationTestCase[]) => void
}

const SingleTest: FC<IPropsSingleTest> = ({
  test,
  index,
  onChange,
  tests,
  enabled,
}) => {
  return (
    <>
      <TextInput
        id={`test-name-${index}`}
        className="mr-3"
        value={test.name}
        label="Name"
        onChange={handleNameChange(tests, index, onChange)}
        disabled={!enabled}
      />
      <TextInput
        id={`test-field-${index}`}
        className="mr-3"
        value={test.field}
        label="Field"
        onChange={handleFieldChange(tests, index, onChange)}
        disabled={!enabled}
        invalid={!isValidTestField(test.field)}
      />
      <SelectInput
        id={`test-predicate-${index}`}
        className="mr-3"
        value={test.predicate}
        options={[
          { value: 'EQ', display: 'Equals' },
          { value: 'NEQ', display: 'Non equals' },
          { value: 'GT', display: 'Greater than' },
          { value: 'GTE', display: 'Greater than or equals' },
          { value: 'LT', display: 'Lower than' },
          { value: 'LTE', display: 'Lower than or equals' },
        ]}
        label="Predicate"
        onChange={handlePredicateChange(tests, index, onChange)}
        disabled={!enabled}
      />
      {isTestingNumberMetricField(test) ? (
        <NumberInput
          id={`test-target-${index}`}
          className="mr-3"
          value={test.target}
          label={'Target'}
          onChange={handleNumberTargetChange(tests, index, onChange)}
          disabled={!enabled}
        />
      ) : (
        <MillisecondInput
          id={`test-target-${index}`}
          className="mr-3"
          value={test.target as `${number}ms`}
          label={'Target'}
          onChange={handleDurationTargetChange(tests, index, onChange)}
          disabled={!enabled}
        />
      )}
    </>
  )
}
