import { FC } from 'react'

import { RunReport } from '@/benchttp'
import { isDurationMetricField } from '@/benchttp/metrics'
import { Tag, Typography } from '@/components'
import { convertNsToMs } from '@/tools/converters'
import { parseMilliseconds } from '@/tools/parsers'

import { TestResult } from './components'
import { getFailedTestCount } from './ReportSection.helpers'

export interface IProps {
  report: RunReport
}

export const ReportSection: FC<IProps> = ({ report }) => {
  const failedTestCount: number = getFailedTestCount(report.tests.results)

  return (
    <div>
      <div className="f f-ai-center mb-4">
        <Typography element="h1">Status : </Typography>
        <Tag text={`Test ${report.tests.pass ? 'passed' : 'failed'}`} />
      </div>
      <Typography element="p" size="h4" className="mb-4">
        {failedTestCount}/{report.tests.results.length} tests{' '}
        {report.tests.pass ? 'passed' : 'failed'}
      </Typography>
      {report.tests.results.map((result, index) => (
        <TestResult
          key={index}
          pass={result.pass}
          name={result.input.name}
          field={result.input.field}
          predicate={result.input.predicate}
          target={
            isDurationMetricField(result.input.field)
              ? parseMilliseconds(`${convertNsToMs(result.input.target)}`)
              : `${result.input.target}`
          }
          got={
            isDurationMetricField(result.input.field)
              ? parseMilliseconds(`${convertNsToMs(result.got)}`)
              : `${result.got}`
          }
          className={index !== report.tests.results.length - 1 ? 'mb-3' : ''}
        />
      ))}
    </div>
  )
}
