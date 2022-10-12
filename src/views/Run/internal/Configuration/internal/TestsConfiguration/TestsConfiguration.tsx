import { FC } from 'react'
import { PlusSquare, Trash } from 'react-feather'

import {
  ConfigurationTestCase,
  isTestingDurationMetricField,
} from '@/benchttp/configuration'
import { Button } from '@/components'
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
  isValidTestTarget,
} from './internal/TestsConfiguration.helpers'

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

  return (
    <div className="f f-direction-column f-ai-start">
      {tests.map((test, index) => (
        <div key={`test-${index}`} className="f f-ai-center mb-3">
          <SingleTest
            test={test}
            index={index}
            onChange={onChange}
            tests={tests}
            enabled={enabled}
          />
          <Trash
            data-testid={`remove-test-${index}`}
            className={trashClassNames.join(' ')}
            onClick={handleRemoveTest(tests, index, enabled, onChange)}
          />
        </div>
      ))}

      <Button
        data-testid="add-test"
        text="Add a new test"
        small
        iconEnd={PlusSquare}
        onClick={handleAddTest(tests, enabled, onChange)}
        style="outlined"
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
      {isTestingDurationMetricField(test) ? (
        <MillisecondInput
          data-testid={`change-target-test-${index}`}
          id={`test-target-${index}`}
          className="mr-3"
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
          className="mr-3"
          value={test.target}
          label={'Target'}
          onChange={handleNumberTargetChange(tests, index, onChange)}
          disabled={!enabled}
          invalid={!isValidTestTarget(test.target, test.field)}
        />
      )}
    </>
  )
}
