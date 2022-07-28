import {
  api,
  useSendMessageMutation,
  useStreamMessagesQuery,
} from "../engine/api";
import { Button } from "../components";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";

const Run: React.FunctionComponent = () => {
  const [sendMessage] = useSendMessageMutation();

  const send = () => {
    sendMessage({ event: "run", data: undefined });
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

const Pull: React.FunctionComponent = () => {
  const [sendMessage] = useSendMessageMutation();

  const send = () => {
    sendMessage({ event: "pull", data: undefined });
  };

  return <Button action={send}>Pull</Button>;
};

const MessageStreamer: React.FunctionComponent = () => {
  const { data } = useStreamMessagesQuery();

  if (!data) return <div>Nothing to show</div>;

  return (
    <div style={{ display: "flex" }}>
      <div>
        <h3>Events</h3>
        <ul>
          {data.events.map((event, i) => (
            <li key={i}>{event}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Progress</h3>
        <ul>
          {data.progress.map((progress, i) => (
            <li key={i}>{progress}</li>
          ))}
        </ul>
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
          <Pull />
        </div>

        <MessageStreamer />
      </div>
    </ApiProvider>
  );
};
