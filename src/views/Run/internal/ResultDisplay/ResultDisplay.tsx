import { StopCircle } from 'react-feather'

import { RunError, RunProgress, RunReport } from '@/benchttp'
import { AppError, Button, ProgressBar, Typography } from '@/components'

import { RunErrorDisplay } from '../components'
import { ReportSection } from './internal/components'

interface IProps {
  progress: RunProgress | null
  report: RunReport | null
  error: RunError | null
  appError: Error | null
  stop: () => false | void
}

export const ResultDisplay: React.FC<IProps> = ({
  progress,
  report,
  error,
  appError,
  stop,
}) => (
  <div>
    {progress && !progress.done && (
      <ProgressSection {...progress} stop={stop} />
    )}
    {report && <ReportSection report={report} />}
    {appError && <AppError className="mt-3" error={appError.message} />}
    {error && <RunErrorDisplay className="mt-3" errors={error.errors} />}
  </div>
)

const ProgressSection: React.FC<RunProgress & { stop: () => false | void }> = ({
  doneCount,
  maxCount,
  elapsed,
  timeout,
}) => (
  <section>
    <Typography element="h2" className="mt-3 mb-2">
      Recording Progress
    </Typography>
    <Button
      text="Stop run"
      onClick={() => stop()}
      style="outlined"
      iconEnd={StopCircle}
      className="mb-3"
    />
    <div>
      <ProgressBar max={maxCount} value={doneCount} />
      <Typography className="mt-2 mb-5">
        Timeout in: {((timeout - elapsed) / 1_000_000_000).toFixed(0)}s
      </Typography>
    </div>
  </section>
)
