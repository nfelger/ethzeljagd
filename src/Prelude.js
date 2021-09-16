import React from "react";
import { createMachine } from "xstate";
import { useMachine } from "@xstate/react";
import { Fade } from "react-awesome-reveal";

const preludeMachine = createMachine({
  id: "prelude",
  initial: "msg1",
  states: {
    msg1: {
      after: {
        2500: "msg2",
      },
    },
    msg2: {
      after: {
        1000: "msg3",
      },
    },
    msg3: {
      after: {
        2000: "msg4",
      },
    },
    msg4: {},
  },
});

export default function Prelude({ onComplete }) {
  const [state, send] = useMachine(preludeMachine);

  switch (state.value) {
    case "msg1":
      return (
        <Fade delay={500}>
          <p>Hallo, fabians40.eth (get it?)</p>
        </Fade>
      );

    case "msg2":
      return (
        <Fade delay={500}>
          <p>Hier ist eine Box.</p>
        </Fade>
      );

    case "msg3":
      return (
        <>
          <p>Hier ist eine Box.</p>
          <Fade delay={500}>
            <p>~ placeholder fragezeichen bild ~</p>
          </Fade>
        </>
      );

    case "msg4":
      return (
        <>
          <p>Hier ist eine Box.</p>
          <button onClick={onComplete}>
            <p>~ placeholder fragezeichen bild ~</p>
          </button>
          <Fade delay={500}>
            <p>
              Aber was ist in der Box? Klick mal drauf, vielleicht kannst du sie
              öffnen…
            </p>
          </Fade>
        </>
      );

    default:
      return null;
  }
}
