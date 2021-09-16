import React from "react";
import { createMachine } from "xstate";
import { useMachine } from "@xstate/react";

const authMachine = createMachine({
  id: "auth",
  initial: "unauthenticated",
  states: {
    unauthenticated: {
      on: {
        FABIAN: "fabian",
        NOT_FABIAN: "notFabian",
        FAIL: "fail",
      },
    },
    fabian: {
      entry: "complete",
    },
    notFabian: {},
    fail: {},
  },
});

async function connectMetaMask(onGetAddress) {
  const address = (
    await window.ethereum.request({ method: "eth_requestAccounts" })
  )[0];
  onGetAddress(address);
}

export default function Auth({ fabiansEth, onComplete }) {
  const [state, send] = useMachine(authMachine, {
    actions: {
      complete: onComplete,
    },
  });

  const handleGetAddress = (address) => {
    const isFabian = address === fabiansEth;
    if (isFabian) {
      send("FABIAN");
    } else {
      send("NOT_FABIAN");
    }
  };

  switch (state.value) {
    case "unauthenticated":
      return (
        <button onClick={() => connectMetaMask(handleGetAddress)}>
          Mit MetaMask verbinden
        </button>
      );

    case "fail":
      return <p>Da ist was schiefgegangen.</p>;

    case "notFabian":
      return <p>Nicht Fabian. Hau ab.</p>;

    case "fabian":
    default:
      return null;
  }
}
