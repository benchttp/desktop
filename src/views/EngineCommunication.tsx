import { api, useSendMessageMutation, useRunQuery } from "../engine/api";
import config from "../engine/benchttp.json";
import { Button } from "../components";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";

const Run: React.FunctionComponent = () => {
  const [sendMessage] = useSendMessageMutation();

  const send = () => {
    sendMessage({ event: "run", data: config });
  };

  return <Button action={send}>Run</Button>;
};

const Stop: React.FunctionComponent = () => {
  const [sendMessage] = useSendMessageMutation();

  const send = () => {
    sendMessage({ event: "stop", data: undefined });
  };

  return <Button action={send}>Stop</Button>;
};

const RunStreamer: React.FunctionComponent = () => {
  const { data } = useRunQuery();

  if (!data) return <div>Nothing to show</div>;

  return (
    <div>
      <div>
        <h3>Latest event</h3>
        <div>{data.events.at(-1)}</div>
      </div>

      <div>
        <h3>Progress</h3>
        <div>{data.progress}</div>
      </div>

      <div>
        <h3>Output</h3>
        <div>{JSON.stringify(data.output)}</div>
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
