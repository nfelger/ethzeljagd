import React from "react";
import { createMachine } from "xstate";
import { useMachine } from "@xstate/react";
import "./App.css";
import Auth from "./Auth";
import Prelude from "./Prelude";
import ClaimFour from "./ClaimFour";
import Finale from "./Finale";

// TODO: change to real addr: 0x5Ed82a25DfeEaE0c35297B605fC9c63A14caE0fd
export const fabiansEth =
  "0x80eA825A030bcAbc7f7c4571f4ed1da2FB49d8bf".toLowerCase();

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

function App() {
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

export default App;
