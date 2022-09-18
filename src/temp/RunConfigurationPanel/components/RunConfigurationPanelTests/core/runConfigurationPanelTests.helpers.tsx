import { ChangeEventHandler, MouseEventHandler } from 'react'

import { MetricField } from '@/benchttp/metrics'
import { TestPredicate } from '@/benchttp/tests'

import { IProps } from './runConfigurationPanelTests.typings'

export const handleNameChange = ({
  testIndex,
  tests,
  setTests,
}: { testIndex: number } & Pick<
  IProps,
  'tests' | 'setTests'
>): ChangeEventHandler<HTMLInputElement> => {
  return (e) => {
    const newTests = [...tests]
    newTests[testIndex].name = e.target.value
    setTests(newTests)
  }
}

export const handleFieldChange = ({
  testIndex,
  tests,
  setTests,
}: { testIndex: number } & Pick<
  IProps,
  'tests' | 'setTests'
>): ChangeEventHandler<HTMLSelectElement> => {
  return (e) => {
    const newTests = [...tests]
    newTests[testIndex].field = e.target.value as MetricField['id']
    setTests(newTests)
  }
}

export const handlePredicateChange = ({
  testIndex,
  tests,
  setTests,
}: { testIndex: number } & Pick<
  IProps,
  'tests' | 'setTests'
>): ChangeEventHandler<HTMLSelectElement> => {
  return (e) => {
    const newTests = [...tests]
    newTests[testIndex].predicate = e.target.value as TestPredicate
    setTests(newTests)
  }
}

export const handleTargetChange = ({
  testIndex,
  tests,
  setTests,
}: { testIndex: number } & Pick<
  IProps,
  'tests' | 'setTests'
>): ChangeEventHandler<HTMLInputElement> => {
  return (e) => {
    const newTests = [...tests]
    newTests[testIndex].target = e.target.value
    setTests(newTests)
  }
}

export const handleRemoveTestClick = ({
  testIndex,
  tests,
  setTests,
}: { testIndex: number } & Pick<
  IProps,
  'tests' | 'setTests'
>): MouseEventHandler => {
  return () => {
    const newTests = [...tests]

    if (tests.length === 1) {
      newTests[testIndex].name = ''
      newTests[testIndex].field = 'MEAN'
      newTests[testIndex].predicate = 'LT'
      newTests[testIndex].target = ''
      setTests(newTests)
      return
    }

    setTests(newTests.filter((_, index) => index !== testIndex))
  }
}

export const handleAddTestClick = ({
  tests,
  setTests,
}: Pick<IProps, 'tests' | 'setTests'>): MouseEventHandler => {
  return () => {
    const newTests = [...tests]
    newTests.push({ name: '', field: 'MEAN', predicate: 'LT', target: '' })
    setTests(newTests)
  }
}
