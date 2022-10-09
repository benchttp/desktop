import s from './test-result-title.module.scss'
import { IProps } from './TestResultTitle'

export const getClassNames = ({ pass }: Pick<IProps, 'pass'>): string[] => {
  const classNames: string[] = [s['test-result-title__status'], 'mr-3']

  if (!pass) {
    classNames.push(s['test-result-title__status--failed'])
  }

  return classNames
}
