import { FC } from 'react'
import { PlusSquare, Trash } from 'react-feather'

import { isNumberMetricField } from '@/benchttp/metrics'
import { SelectInput, TextInput } from '@/components/Inputs'

import {
  FIELD_OPTIONS,
  PREDICATE_OPTIONS,
} from './core/runConfigurationPanelTests.constants'
import {
  handleFieldChange,
  handleNameChange,
  handlePredicateChange,
  handleTargetChange,
  handleRemoveTestClick,
  handleAddTestClick,
} from './core/runConfigurationPanelTests.helpers'
import { IProps } from './core/runConfigurationPanelTests.typings'

export const RunConfigurationPanelTests: FC<IProps> = ({ tests, setTests }) => {
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
          />
          <SelectInput
            id={`test-field-${testIndex}`}
            className="mr-3"
            value={test.field}
            options={FIELD_OPTIONS}
            label="Field"
            onChange={handleFieldChange({ testIndex, tests, setTests })}
          />
          <SelectInput
            id={`test-predicate-${testIndex}`}
            className="mr-3"
            value={test.predicate}
            options={PREDICATE_OPTIONS}
            label="Predicate"
            onChange={handlePredicateChange({ testIndex, tests, setTests })}
          />
          <TextInput
            id={`test-target-${testIndex}`}
            className="mr-3"
            value={test.target}
            label={isNumberMetricField(test.field) ? 'Target' : 'Target (ms)'}
            type="number"
            onChange={handleTargetChange({ testIndex, tests, setTests })}
          />
          <Trash
            className="mr-3"
            onClick={handleRemoveTestClick({ testIndex, tests, setTests })}
          />
          {testIndex === tests.length - 1 && (
            <PlusSquare onClick={handleAddTestClick({ tests, setTests })} />
          )}
        </div>
      ))}
    </div>
  )
}
