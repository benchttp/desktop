import React, { useContext, useMemo } from "react";
import { Button } from "../components";
import { SocketContext } from "../engine";

export const POC: React.FunctionComponent = () => {
  const { state, action } = useContext(SocketContext);

  const openConnection = (to: "run" | "status") => () => {
    action(`${to}:open`);
  };

  const closeConnection = (to: "run" | "status") => () => {
    action(`${to}:close`);
  };

  const startRun = () => {
    action("run:run");
  };

  const pullResults = () => {
    action("run:pull");
  };

  const isClosed = useMemo(
    (): boolean =>
      state.run.readyState() === null ||
      state.run.readyState() === "closing" ||
      state.run.readyState() === "closed",
    [state]
  );

  return (
    <>
      <Button action={openConnection("run")}>
        Connect to socket <code>run</code>
      </Button>

      <Button action={closeConnection("run")}>
        Disconnect from socket <code>run</code>
      </Button>

      <pre>{state.run.readyState()}</pre>

      <Button action={startRun} disabled={isClosed}>
        Start run
      </Button>

      <Button action={pullResults} disabled={isClosed}>
        Pull results
      </Button>

      <ul>
        {state.run.messages.map((m, i) => (
          <li key={i}>{m}</li>
        ))}
      </ul>

      <br />

      <Button action={openConnection("status")}>
        Connect to socket <code>status</code>
      </Button>

      <Button action={closeConnection("status")}>
        Disconnect from socket <code>status</code>
      </Button>

      <pre>{state.status.readyState()}</pre>
    </>
  );
};
