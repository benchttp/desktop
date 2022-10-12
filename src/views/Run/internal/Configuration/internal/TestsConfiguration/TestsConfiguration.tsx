import { FC } from 'react'
import { PlusSquare, Trash } from 'react-feather'

import { ConfigurationTestCase } from '@/benchttp/configuration'
import { Button } from '@/components'

import { SingleTest } from './internal/components'
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
            test={test}
            index={index}
            onChange={onChange}
            tests={tests}
            enabled={enabled}
          />
          <div>
            <Trash
              size={20}
              data-testid={`remove-test-${index}`}
              onClick={handleRemoveTest(tests, index, enabled, onChange)}
            />
          </div>
        </div>
      ))}
      <Button
        data-testid="add-test"
        text="Add a new test"
        small
        iconEnd={PlusSquare}
        onClick={handleAddTest(tests, enabled, onChange)}
        style="outlined"
        disabled={!enabled}
      />
    </div>
  )
}
