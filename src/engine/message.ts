import { isObject, typeGuardProperty } from "../utils/types";

export type IncomingMessage =
  | {
      event: "running" | "stopped" | "done";
    }
  | IncomingMessageWithData;

export type IncomingMessageWithData = {
  event: "progress" | "output";
  data: string;
};

export const isIncomingMessage = (
  message: unknown
): message is IncomingMessage => {
  const isValidEvent = typeGuardProperty(
    "event",
    (val: unknown): val is "running" | "stopped" | "done" =>
      val === "running" || val === "stopped" || val === "done"
  );

  return (
    (isObject(message) && isValidEvent(message)) ||
    isIncomingMessageWithData(message)
  );
};

const isIncomingMessageWithData = (
  message: unknown
): message is IncomingMessageWithData => {
  const isValidEvent = typeGuardProperty(
    "event",
    (val: unknown): val is "progress" | "output" =>
      val === "progress" || val === "output"
  );

  // TODO Validate message.data.

  return isObject(message) && isValidEvent(message);
};

// TODO Limitation on using a discriminated union.
// Property data is not undefined only for event "run".
// However, Redux Toolkit's MutationDefinition<T = OutgoingMessage> does not
// support such discriminated union type when defining mutation.query method.
// There might be a work around, I don't know one for now.
export type OutgoingMessage = {
  event: "run" | "stop" | "pull";
  data: string | undefined;
};
