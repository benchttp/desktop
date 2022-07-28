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

export const isIncomingMessageWithData = (
  message: unknown
): message is IncomingMessageWithData => {
  const isValidEvent = typeGuardProperty(
    "event",
    (val: unknown): val is "progress" | "output" =>
      val === "progress" || val === "output"
  );

  const isValidData = typeGuardProperty(
    "data",
    (val: unknown): val is string => typeof val === "string"
  );

  return isObject(message) && isValidEvent(message) && isValidData(message);
};

export type OutgoingMessage =
  | {
      event: "run";
      data: string;
    }
  | {
      event: "stop" | "pull";
    };
