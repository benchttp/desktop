import { isObject, typeGuardProperty } from "../utils/types";

export type StartRunMessage = {
  procedure: "run";
  data: Record<string, any>;
};

export type CancelRunMessage = {
  procedure: "cancel";
};

export type IncomingMessage =
  | {
      event: "done";
      data: Record<string, any>;
    }
  | {
      event: "progress";
      data: string;
    }
  | {
      event: "error";
      error: string;
    };

export const isIncomingMessage = (
  message: unknown
): message is IncomingMessage => {
  const isValidEvent = typeGuardProperty(
    "event",
    (val: unknown): val is "done" | "progress" | "error" =>
      val === "done" || val === "progress" || val === "error"
  );

  return isObject(message) && isValidEvent(message);
};
