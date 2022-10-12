import { MouseEventHandler } from 'react'

import { ConfigurationTestCase } from '@/benchttp/configuration'
import { isNumberMetricField } from '@/benchttp/metrics'

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

export const handleAddTest = (
  tests: ConfigurationTestCase[],
  enabled: boolean,
  onChange: (tests: ConfigurationTestCase[]) => void
): MouseEventHandler => {
  return () => {
    if (!enabled) return
    tests.push(placeholderTest())
    onChange(tests)
  }
}

export const handleRemoveTest = (
  tests: ConfigurationTestCase[],
  index: number,
  enabled: boolean,
  onChange: (tests: ConfigurationTestCase[]) => void
): MouseEventHandler => {
  return () => {
    if (!enabled) return
    onChange(tests.filter((_, i) => i !== index))
  }
}
