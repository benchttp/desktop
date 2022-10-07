import { FC } from 'react'
import { PlusSquare, Trash } from 'react-feather'

import { isNumberMetricField } from '@/benchttp/metrics'
import { SelectInput, TextInput } from '@/components/Inputs'

import {
  FIELD_OPTIONS,
  PREDICATE_OPTIONS,
} from './internal/TestsConfiguration.constants'
import {
  handleFieldChange,
  handleNameChange,
  handlePredicateChange,
  handleTargetChange,
  handleRemoveTestClick,
  handleAddTestClick,
  getIconClassNames,
} from './internal/TestsConfiguration.helper'
import { IProps } from './internal/TestsConfiguration.typing'

export const TestsConfiguration: FC<IProps> = ({
  tests,
  setTests,
  areTestsEnabled,
}) => {
  const trashClassNames = getIconClassNames({
    className: 'mr-3',
    areTestsEnabled,
  })

  const plusClassNames = getIconClassNames({
    areTestsEnabled,
  })

  return (
    <div className="f f-direction-column f-ai-start">
      {tests.map((test, testIndex) => (
        <div
          key={`test-${testIndex}`}
          className="f f-direction-row f-ai-center"
        >
          <TextInput
            id={`test-name-${testIndex}`}
            className="mr-3"
            value={test.name}
            label="Name"
            onChange={handleNameChange({ testIndex, tests, setTests })}
            disabled={!areTestsEnabled}
          />
          <SelectInput
            id={`test-field-${testIndex}`}
            className="mr-3"
            value={test.field}
            options={FIELD_OPTIONS}
            label="Field"
            onChange={handleFieldChange({ testIndex, tests, setTests })}
            disabled={!areTestsEnabled}
          />
          <SelectInput
            id={`test-predicate-${testIndex}`}
            className="mr-3"
            value={test.predicate}
            options={PREDICATE_OPTIONS}
            label="Predicate"
            onChange={handlePredicateChange({ testIndex, tests, setTests })}
            disabled={!areTestsEnabled}
          />
          <TextInput
            id={`test-target-${testIndex}`}
            className="mr-3"
            value={test.target}
            label={isNumberMetricField(test.field) ? 'Target' : 'Target (ms)'}
            type="number"
            onChange={handleTargetChange({ testIndex, tests, setTests })}
            disabled={!areTestsEnabled}
          />
          <Trash
            className={trashClassNames.join(' ')}
            onClick={handleRemoveTestClick({
              testIndex,
              tests,
              setTests,
              areTestsEnabled,
            })}
          />
        </div>
      ))}
      <PlusSquare
        className={plusClassNames.join(' ')}
        onClick={handleAddTestClick({
          tests,
          setTests,
          areTestsEnabled,
        })}
      />
    </div>
  )
}