import { RunReport } from '@/benchttp'
import { isDurationMetricField } from '@/benchttp/metrics'
import { RunTestCase } from '@/benchttp/run'
import { nanosecondsToMilliseconds } from '@/tools/converters'
import { parseMilliseconds } from '@/tools/parsers'

export const getFailedTestCount = (
  results: RunReport['tests']['results']
): number => {
  return results.reduce<number>((acc, curr) => {
    if (!curr.pass) {
      acc = acc += 1
    }

    return acc
  }, 0)
}

export const getTarget = (input: RunTestCase): string => {
  return isDurationMetricField(input.field)
    ? parseMilliseconds(`${nanosecondsToMilliseconds(input.target)}`)
    : `${input.target}`
}

export const getGot = (result: {
  pass: boolean
  got: number
  input: RunTestCase
}) => {
  return isDurationMetricField(result.input.field)
    ? parseMilliseconds(`${nanosecondsToMilliseconds(result.got)}`)
    : `${result.got}`
}
