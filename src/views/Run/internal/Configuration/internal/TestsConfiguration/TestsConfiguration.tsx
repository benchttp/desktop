import { FC } from 'react'
import { PlusSquare, Trash } from 'react-feather'

import { ConfigurationTestCase } from '@/benchttp/configuration'
import { Button, IconButton } from '@/components'

import { SingleTest } from './internal/components'
import s from './internal/tests-configuration.module.scss'
import {
  handleRemoveTest,
  handleAddTest,
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
  return (
    <div className="f f-direction-column f-ai-start mb-5">
      {tests.map((test, index) => (
        <div key={`test-${index}`} className="f f-ai-center mb-4">
          <SingleTest
            className={s['test-configuration__test']}
            test={test}
            index={index}
            onChange={onChange}
            tests={tests}
            enabled={enabled}
          />
          <IconButton
            className="ml-3"
            disabled={!enabled}
            icon={Trash}
            onClick={handleRemoveTest({ tests, index, onChange })}
            data-testid={`remove-test-${index}`}
          />
        </div>
      ))}
      <Button
        className={s['test-configuration__add-button']}
        data-testid="add-test"
        text="Add a new test"
        small
        iconEnd={PlusSquare}
        onClick={handleAddTest({ tests, enabled, onChange })}
        style="outlined"
        disabled={!enabled}
      />
    </div>
  )
}
