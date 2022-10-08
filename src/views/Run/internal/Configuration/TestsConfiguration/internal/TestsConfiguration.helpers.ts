import { ChangeEventHandler, MouseEventHandler } from 'react'

import { GoDuration } from '@/benchttp/common'
import { ConfigurationTestCase } from '@/benchttp/configuration'
import {
  isDurationMetricField,
  isMetricField,
  isNumberMetricField,
} from '@/benchttp/metrics'
import { parseInteger } from '@/tools'

import s from './TestsConfiguration.module.scss'

export const handleNameChange = (
  tests: ConfigurationTestCase[],
  index: number,
  onChange: (tests: ConfigurationTestCase[]) => void
): ChangeEventHandler<HTMLInputElement> => {
  return (e) => {
    const newTests = [...tests]
    newTests[index].name = e.target.value
    onChange(newTests)
  }
}

export const handleFieldChange = (
  tests: ConfigurationTestCase[],
  index: number,
  onChange: (tests: ConfigurationTestCase[]) => void
): ChangeEventHandler<HTMLInputElement> => {
  return (e) => {
    const newTests = [...tests]
    // @ts-expect-error e.target.value is expected to be any string,
    // a invalid value will set the input state to invalid.
    newTests[index].field = e.target.value
    onChange(newTests)
  }
}

export const isValidTestField = (field: string) => isMetricField(field)

export const handlePredicateChange = (
  tests: ConfigurationTestCase[],
  index: number,
  onChange: (tests: ConfigurationTestCase[]) => void
): ChangeEventHandler<HTMLSelectElement> => {
  return (e) => {
    const newTests = [...tests]
    // TODO: fix this type assertion, it's not safe at runtime.
    // @ts-expect-error e.target.value is a TestPredicate because
    // the select options are limited to TestPredicate values.
    newTests[index].predicate = e.target.value
    onChange(newTests)
  }
}

export const isValidTestTarget = (
  target: number | GoDuration,
  field: string
): boolean => {
  switch (true) {
    case isDurationMetricField(field):
      try {
        return (
          typeof target === 'string' &&
          target.endsWith('ms') &&
          Number.isInteger(parseInteger(target))
        )
      } catch {
        return false
      }
    case isNumberMetricField(field):
      return Number.isInteger(target)
    default:
      return false
  }
}

export const handleDurationTargetChange = (
  tests: ConfigurationTestCase[],
  index: number,
  onChange: (tests: ConfigurationTestCase[]) => void
): ((value: `${number}ms`) => void) => {
  return (value) => {
    const newTests = [...tests]
    newTests[index].target = value
    onChange(newTests)
  }
}

export const handleNumberTargetChange = (
  tests: ConfigurationTestCase[],
  index: number,
  onChange: (tests: ConfigurationTestCase[]) => void
): ((value: number) => void) => {
  return (value) => {
    const newTests = [...tests]
    newTests[index].target = value
    onChange(newTests)
  }
}

const placeholderTest = (): ConfigurationTestCase => ({
  name: '',
  field: 'ResponseTimes.Max',
  predicate: 'LT',
  target: '200ms',
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

export const getIconClassNames = ({
  className,
  enabled,
}: {
  className?: string
  enabled: boolean
}): string[] => {
  const classNames: string[] = []

  if (className) {
    classNames.push(className)
  }

  if (!enabled) {
    classNames.push(s['run-configuration-panel-tests__icon--disabled'])
  }

  return classNames
}
