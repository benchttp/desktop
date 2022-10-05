import { ChangeEventHandler, MouseEventHandler } from 'react'

import { ConfigurationTestCase } from '@/benchttp/configuration'
import { TestPredicate } from '@/benchttp/tests'

import s from './runConfigurationPanelTests.module.scss'
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
    newTests[testIndex].field = e.target.value as ConfigurationTestCase['field']
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
  isTestsSectionEnabled,
}: { testIndex: number } & Pick<IProps, 'tests' | 'setTests'> & {
    isTestsSectionEnabled: boolean
  }): MouseEventHandler => {
  return () => {
    if (!isTestsSectionEnabled) {
      return
    }

    const newTests = [...tests]

    if (tests.length === 1) {
      newTests[testIndex].name = ''
      newTests[testIndex].field = 'ResponseTimes.Mean'
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
  isTestsSectionEnabled,
}: Pick<IProps, 'tests' | 'setTests'> & {
  isTestsSectionEnabled: boolean
}): MouseEventHandler => {
  return () => {
    if (!isTestsSectionEnabled) {
      return
    }

    const newTests = [...tests]

    newTests.push({
      name: '',
      field: 'ResponseTimes.Mean',
      predicate: 'LT',
      target: '',
    })
    setTests(newTests)
  }
}

export const getIconClassNames = ({
  className,
  isTestsSectionEnabled,
}: {
  className?: string
  isTestsSectionEnabled: boolean
}): string[] => {
  const classNames: string[] = []

  if (className) {
    classNames.push(className)
  }

  if (!isTestsSectionEnabled) {
    classNames.push(s['run-configuration-panel-tests__icon--disabled'])
  }

  return classNames
}
