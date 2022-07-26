import { Topic } from "../engine/socket";
import {
  api,
  useSendMessageMutation,
  useStreamMessagesQuery,
} from "../engine/api";
import { Button } from "../components";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";

interface Props {
  topic: Topic;
}

const Run: React.FunctionComponent = () => {
  const [sendMessage] = useSendMessageMutation();

  const send = () => {
    sendMessage({ topic: "run", message: "run" });
  };

  return <Button action={send}>Run</Button>;
};

const Stop: React.FunctionComponent = () => {
  const [sendMessage] = useSendMessageMutation();

  const send = () => {
    sendMessage({ topic: "run", message: "stop" });
  };

  return <Button action={send}>Stop</Button>;
};

const Pull: React.FunctionComponent = () => {
  const [sendMessage] = useSendMessageMutation();

  const send = () => {
    sendMessage({ topic: "run", message: "pull" });
  };

  return <Button action={send}>Pull</Button>;
};

const MessageStreamer: React.FunctionComponent<Props> = ({ topic }) => {
  const { data: messages } = useStreamMessagesQuery(topic);

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
  const topic: Topic = "run";
  return (
    <ApiProvider api={api}>
      <div style={{ display: "flex", height: "80vh" }}>
        <div>
          <Run />
          <Stop />
          <Pull />
        </div>

        <MessageStreamer topic={topic} />
      </div>
    </ApiProvider>
  );
};
