import { ChangeEventHandler } from 'react'

import { GoDuration } from '@/benchttp/common'
import { ConfigurationTestCase } from '@/benchttp/configuration'
import {
  isDurationMetricField,
  isMetricField,
  isNumberMetricField,
} from '@/benchttp/metrics'
import { parseInteger } from '@/tools/parsers'

export const getClassName = (className: string | undefined): string => {
  const classNames: string[] = ['f', 'f-ai-center']

  if (className) {
    classNames.push(className)
  }

  return classNames.join(' ')
}

export const isValidTestField = (field: string) => isMetricField(field)

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
