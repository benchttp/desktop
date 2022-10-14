export const nanosecondsToMilliseconds = (ns: number): number => ns / 1_000_000

export const nanosecondsToSeconds = (ns: number): number => ns / 1_000_000_000

export const withThreshold = (threshold: number) => (n: number) =>
  n < threshold ? threshold : n
