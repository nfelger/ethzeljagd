import React from "react";
import { createMachine } from "xstate";
import { useMachine } from "@xstate/react";
import { Fade } from "react-awesome-reveal";
import QuestionMarkBox from "./QuestionMarkBox";
import Para from "./Para";

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
          <Para>Hallo, fabians40.eth! (get it?)</Para>
        </Fade>
      );

    case "msg2":
      return (
        <Fade delay={500}>
          <Para>Hier ist eine Box.</Para>
        </Fade>
      );

    case "msg3":
      return (
        <>
          <Para>Hier ist eine Box.</Para>
          <Fade delay={500}>
            <QuestionMarkBox />
          </Fade>
        </>
      );

    case "msg4":
      return (
        <>
          <Para>Hier ist eine Box.</Para>
          <div className="cursor-pointer" onClick={onComplete}><QuestionMarkBox/></div>
          <Fade delay={500}>
            <Para>
              Aber was ist in der Box? Klick mal drauf, vielleicht kannst du sie
              öffnen…
            </Para>
          </Fade>
        </>
      );

    default:
      return null;
  }
}
