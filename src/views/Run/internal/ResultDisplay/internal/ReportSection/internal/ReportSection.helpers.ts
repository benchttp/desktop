import { RunReport } from '@/benchttp'

export const getFailedTestCount = (
  results: RunReport['tests']['results']
): number => {
  return results.reduce<number>((acc, curr) => {
    if (!curr.pass) {
      acc = acc++
    }

    return acc
  }, 0)
}
