import { ITestResultTitleProps } from '@/components/TestResult/internal/TestResultTitle'

import s from './test-result-title.module.scss'

export const getClassNames = ({
  pass,
}: Pick<ITestResultTitleProps, 'pass'>): string[] => {
  const classNames: string[] = [s['test-result-title__status'], 'mr-3']

  if (!pass) {
    classNames.push(s['test-result-title__status--failed'])
  }

  return classNames
}
