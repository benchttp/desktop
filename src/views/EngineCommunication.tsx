import {
  api,
  useCancelRunMutation,
  useStartRunMutation,
  useStreamRunQuery,
} from "../engine/api";
import config from "../engine/benchttp.json";
import { Button } from "../components";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";

const Run: React.FunctionComponent = () => {
  const [send] = useStartRunMutation();

  const start = () => {
    send({ data: config });
  };

  return <Button action={start}>Run</Button>;
};

const Stop: React.FunctionComponent = () => {
  const [send] = useCancelRunMutation();

  const cancel = () => {
    send();
  };

  return <Button action={cancel}>Stop</Button>;
};

const RunStreamer: React.FunctionComponent = () => {
  const { data } = useStreamRunQuery();

  if (!data || data.status === "idle") return <div>Nothing to show</div>;

  return (
    <div>
      <div>
        <h3>Latest message</h3>
        <div>{JSON.stringify(data.messages.at(-1))}</div>
      </div>

      <div>
        <h3>Progress</h3>
        <div>{data.progressData}</div>
      </div>

      <div>
        <h3>Output</h3>
        <div>{JSON.stringify(data.runData)}</div>
      </div>

      <div>
        <h3>Error</h3>
        <div>{data.error}</div>
      </div>
    </div>
  );
};

export const EngineCommunication: React.FunctionComponent = () => {
  return (
    <ApiProvider api={api}>
      <div>
        <div>
          <Run />
          <Stop />
        </div>

        <RunStreamer />
      </div>
    </ApiProvider>
  );
};
