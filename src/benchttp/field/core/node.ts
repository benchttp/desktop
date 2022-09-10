import { memoize } from '@/lib/memoize'
import { Nullable } from '@/typing/nullable'

import {
  isHTTPCodeKey,
  isIndexKey,
  isRequestEventKey,
  isRootKey,
  isStatisticsKey,
  isOneOfKeys,
  RootKey,
  StatisticsKey,
  Key,
} from './key'

export class FieldNode {
  host: Nullable<FieldNode>
  key: string

  constructor({ host, key }: Pick<FieldNode, 'host' | 'key'>) {
    this.host = host
    this.key = key
  }

  get root(): FieldNode {
    return memoize(this.#findRoot)
  }

  get depth(): number {
    return memoize(this.#computeDepth)
  }

  #findRoot = () => this.#reduceHosts((_, host) => host as typeof this, this)

  #computeDepth = () => this.#reduceHosts((depth) => depth + 1, 0)

  #reduceHosts = <T>(fn: (acc: T, host: FieldNode) => T, init: T): T => {
    let accumulator: T = init
    this.#forEachHost((host) => {
      accumulator = fn(accumulator, host)
    })
    return accumulator
  }

  #forEachHost = (callback: (host: FieldNode) => void) => {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let current: FieldNode = this
    while (current.host) {
      current = current.host
      callback(current)
    }
    return current
  }

  public isValid = () =>
    this.isRoot() ||
    this.isStatistics() ||
    this.isRequestEvent() ||
    this.isIndex() ||
    this.isHTTPCode()

  private isRoot = () => isRootKey(this.key) && !this.host

  private isStatistics = () =>
    isStatisticsKey(this.key) &&
    (this.host?.is(RootKey.ResponseTimes) || this.host?.isRequestEvent())

  private isRequestEvent = () =>
    isRequestEventKey(this.key) && this.host?.is(RootKey.RequestEventTimes)

  private isIndex = () =>
    isIndexKey(this.key) &&
    this.host?.isOneOf([
      RootKey.RequestFailures,
      RootKey.RequestEventTimes,
      StatisticsKey.Quartiles,
      StatisticsKey.Deciles,
    ])

  private isHTTPCode = () =>
    isHTTPCodeKey(this.key) && this.host?.is(RootKey.StatusCodesDistribution)

  private is = (key: Key) => this.isOneOf([key])

  private isOneOf = (keys: Key[]) => isOneOfKeys(this.key, keys)
}
