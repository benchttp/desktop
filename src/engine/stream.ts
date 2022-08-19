import { RunProgress, RunReport, RunConfiguration } from 'benchttp'

const streamUrl = 'http://localhost:8080/stream'

export type RunStream = ProgressStream | ReportStream

interface ProgressStream {
  kind: 'progress'
  data: RunProgress
}

interface ReportStream {
  kind: 'report'
  data: RunReport
}

interface RunStreamerOptions {
  onStream: (stream: RunStream) => void
  onError: (error: Error) => void
}

export class RunStreamer {
  #canceled = false
  #aborter = new AbortController()

  constructor(private emit: RunStreamerOptions) {}

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
          const reader = await startRunStream(config, this.#aborter.signal)

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

/**
 * Makes the HTTP request to start a run and returns a ReadableStream
 * to stream the emitted progress and report data.
 */
const startRunStream = async (
  config: RunConfiguration,
  signal: AbortSignal
) => {
  const response = await fetch(streamUrl, {
    method: 'POST',
    body: JSON.stringify(config),
    signal,
  })
  const reader = response?.body?.getReader()

  if (!reader) throw new Error(`Cannot fetch ${streamUrl}`)
  return reader
}

/**
 * @TODO use a dedicated field from server response for identification.
 */
const decodeStream = (chunk: Uint8Array): RunStream => {
  const text = new TextDecoder().decode(chunk)
  const data = JSON.parse(text)
  return assertRunStream(data)
}

const assertRunStream = (data: unknown): RunStream => {
  if (isProgress(data)) return { kind: 'progress', data }
  if (isReport(data)) return { kind: 'report', data }
  throw new Error('Unhandled stream value')
}

const isProgress = (v: unknown): v is RunProgress => hasKey(v, 'Done')

const isReport = (v: unknown): v is RunReport => hasKey(v, 'Metrics')

const hasKey = (v: unknown, k: string) => !!v && typeof v === 'object' && k in v
