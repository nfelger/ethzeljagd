import React from "react";
import { createMachine } from "xstate";
import { useMachine } from "@xstate/react";
import Auth from "./Auth";
import Prelude from "./Prelude";
import ClaimFour from "./ClaimFour";
import Finale from "./Finale";

const stageMachine = createMachine({
  id: "stage",
  initial: "auth",
  states: {
    auth: {
      on: { PROGRESS: "prelude" },
    },
    prelude: {
      on: { PROGRESS: "claimFour" },
    },
    claimFour: {
      on: { PROGRESS: "finale" },
    },
    finale: {},
  },
});

export default function Game({ fabiansEth }) {
  const [state, send] = useMachine(stageMachine);

  switch (state.value) {
    case "auth":
      return (
        <Auth fabiansEth={fabiansEth} onComplete={() => send("PROGRESS")} />
      );
    case "prelude":
      return <Prelude onComplete={() => send("PROGRESS")} />;
    case "claimFour":
      return <ClaimFour onComplete={() => send("PROGRESS")} />;
    case "finale":
      return <Finale />;
    default:
      return null;
  }
}
