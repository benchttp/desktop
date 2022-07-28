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
    sendMessage({ message: "run" });
  };

  return <Button action={send}>Run</Button>;
};

const Stop: React.FunctionComponent = () => {
  const [sendMessage] = useSendMessageMutation();

  const send = () => {
    sendMessage({ message: "stop" });
  };

  return <Button action={send}>Stop</Button>;
};

const Pull: React.FunctionComponent = () => {
  const [sendMessage] = useSendMessageMutation();

  const send = () => {
    sendMessage({ message: "pull" });
  };

  return <Button action={send}>Pull</Button>;
};

const MessageStreamer: React.FunctionComponent = () => {
  const { data: messages } = useStreamMessagesQuery();

  if (!messages?.length) return <div>No messages</div>;

  return (
    <div>
      <div>Messages</div>
      <ul>
        {messages.map((message, i) => (
          <li key={i}>{message}</li>
        ))}
      </ul>
    </div>
  );
};

export const EngineCommunication: React.FunctionComponent = () => {
  return (
    <ApiProvider api={api}>
      <div style={{ display: "flex", height: "80vh" }}>
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
