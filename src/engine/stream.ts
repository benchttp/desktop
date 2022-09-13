import { RunProgress, RunReport, RunError, RunConfiguration } from '@/benchttp'

export type RunStream = ProgressStream | ReportStream | ErrorStream

interface ProgressStream {
  kind: 'progress'
  data: RunProgress
}

interface ReportStream {
  kind: 'report'
  data: RunReport
}

interface ErrorStream {
  kind: 'error'
  data: string
}

interface RunStreamerOptions {
  onStream: (stream: RunStream) => void
  onError: (error: Error) => void
}

export class RunStreamer {
  #canceled = false
  #aborter = new AbortController()

  constructor(private address: string, private emit: RunStreamerOptions) {}

  /**
   * Sends a run request to the local benchttp server with the input config,
   * reads the streamed response and calls onStream with the resulting Stream
   * object. It calls onError with an Error object if the request failed.
   */
  start = (config: RunConfiguration) => {
    new ReadableStream({
      start: async (controller) => {
        this.#canceled = false
        this.#aborter = new AbortController()

        try {
          const reader = await startRunStream(
            config,
            this.address,
            this.#aborter.signal
          )

          while (!this.#canceled) {
            const { done, value } = await reader.read()
            if (done) return controller.close()
            controller.enqueue(value)
          }
        } catch (error) {
          this.emit.onError(error as Error)
        }
      },
    })
      .pipeThrough(runStreamDecoder())
      .pipeTo(runStreamWriter(this.emit.onStream))
  }

  /**
   * Cancels the current run stream, if any.
   * Returns whether the stream was canceled.
   * If the stream was already canceled and not started again yet,
   * this method does nothing.
   */
  cancel = (): boolean => {
    if (this.#canceled) return false
    this.#canceled = true
    this.#aborter.abort()
    return true
  }
}

const runStreamDecoder = () =>
  new TransformStream<Uint8Array, RunStream>({
    transform: (chunk, controller) => {
      controller.enqueue(decodeStream(chunk))
    },
  })

const runStreamWriter = (write: (s: RunStream) => void) =>
  new WritableStream({ write })

const streamUrl = (address: string) => `${address}/stream`

/**
 * Makes the HTTP request to start a run and returns a ReadableStream
 * to stream the emitted progress and report data.
 */
const startRunStream = async (
  config: RunConfiguration,
  address: string,
  signal: AbortSignal
) => {
  const url = streamUrl(address)
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(config),
    signal,
  })
  const reader = response?.body?.getReader()

  if (!reader) throw new Error(`Cannot fetch ${url}`)
  return reader
}

const decodeStream = (chunk: Uint8Array): RunStream => {
  const text = new TextDecoder().decode(chunk)
  const data = JSON.parse(text)
  return assertRunStream(data)
}

const assertRunStream = (data: unknown): RunStream => {
  if (isProgress(data)) return { kind: 'progress', data }
  if (isReport(data)) return { kind: 'report', data }
  if (isError(data)) return { kind: 'error', data: data.error }
  throw new Error('Unhandled stream value')
}

const isProgress = (v: unknown): v is RunProgress => hasKey(v, 'done')

const isReport = (v: unknown): v is RunReport => hasKey(v, 'metrics')

const isError = (v: unknown): v is RunError => hasKey(v, 'error')

const hasKey = (v: unknown, k: string) => !!v && typeof v === 'object' && k in v

export const lowerFirstChar = (s: string) => {
  if (!s) return ''
  const [firstChar, ...rest] = s
  return `${firstChar.toLowerCase()}${rest.join('')}`
}
