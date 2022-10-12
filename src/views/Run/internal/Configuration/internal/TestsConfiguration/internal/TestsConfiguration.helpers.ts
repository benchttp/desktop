import { MouseEventHandler } from 'react'

import { ConfigurationTestCase } from '@/benchttp/configuration'
import { isNumberMetricField } from '@/benchttp/metrics'
import { sleep } from '@/tools/utilities'

const placeholderTest = (): ConfigurationTestCase => ({
  name: '',
  field: 'ResponseTimes.Max',
  predicate: 'LT',
  target: '0ms',
})

const t = placeholderTest()

if (isNumberMetricField(t.field)) {
  t.target = 200
} else {
  t.target = '200ms'
}

export const handleAddTest = ({
  tests,
  enabled,
  onChange,
}: {
  tests: ConfigurationTestCase[]
  enabled: boolean
  onChange: (tests: ConfigurationTestCase[]) => void
}): MouseEventHandler => {
  return () => {
    if (!enabled) return
    tests.push(placeholderTest())
    onChange(tests)
  }
}

export const handleRemoveTest = ({
  tests,
  index,
  onChange,
}: {
  tests: ConfigurationTestCase[]
  index: number
  onChange: (tests: ConfigurationTestCase[]) => void
}): MouseEventHandler => {
  return async () => {
    await sleep(500)

    onChange(tests.filter((_, i) => i !== index))
  }
}
