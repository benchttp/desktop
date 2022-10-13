import { FC } from 'react'

import { RunReport } from '@/benchttp'
import { Tag, Typography } from '@/components'

import { TestResult } from './internal/components'
import {
  getFailedTestCount,
  getGot,
  getTarget,
} from './internal/ReportSection.helpers'

export interface IProps {
  className?: string
  report: RunReport
}

export const ReportSection: FC<IProps> = ({ report, className }) => {
  const failedTestCount: number = getFailedTestCount(report.tests.results)

  return (
    <div className={className}>
      <div className="f f-ai-center mb-4">
        <Typography className="mr-1" element="h1">
          Status:
        </Typography>
        <Tag
          color={report.tests.pass ? 'base-green' : 'base-red'}
          text={`Test ${report.tests.pass ? 'passed' : 'failed'}`}
        />
      </div>
      <Typography element="p" weight="medium" className="mb-4">
        {report.tests.pass ? report.tests.results.length : failedTestCount}/
        {report.tests.results.length} test
        {report.tests.results.length > 1 ? 's' : ''}{' '}
        {report.tests.pass ? 'passed' : 'failed'}
      </Typography>
      {report.tests.results.map((result, index) => (
        <TestResult
          key={index}
          pass={result.pass}
          name={result.input.name}
          field={result.input.field}
          predicate={result.input.predicate}
          target={getTarget(result.input)}
          got={getGot(result)}
          className={index !== report.tests.results.length - 1 ? 'mb-3' : ''}
        />
      ))}
    </div>
  )
}
