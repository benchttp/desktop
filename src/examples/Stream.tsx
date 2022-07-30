import { useStreamRunQuery } from 'engine/api'

export const Stream: React.FunctionComponent = () => {
  const { data } = useStreamRunQuery()

  if (!data || data.status === 'idle') return <div>Nothing to show</div>

  return (
    <div>
      <div>
        <h3>Status</h3>
        <div>{data.status}</div>
      </div>

      <div>
        <h3>Progress</h3>
        <div>{data.progress}</div>
      </div>

      <div>
        <h3>Output</h3>
        <div>{JSON.stringify(data.result)}</div>
      </div>

      <div>
        <h3>Error</h3>
        <div>{data.error}</div>
      </div>
    </div>
  )
}
