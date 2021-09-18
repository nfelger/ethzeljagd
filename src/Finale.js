import React from "react";
import { createMachine } from "xstate";
import { useMachine } from "@xstate/react";
import ClaimableAsset from "./ClaimableAsset";
import QuestionMarkBox from "./QuestionMarkBox";
import Para from "./Para";

const asset = {
  tokenAddress: "0x88b48f654c30e99bc2e4a1559b4dcf1ad93fa656",
  tokenId:
    "58310386485557310259002237365246659266895050305048410171636348440211982647297",
}
const finaleMachine = createMachine({
  id: "finale",
  initial: "start",
  states: {
    start: {
      after: {
        2000: "showBox",
      },
    },
    showBox: {
      on: {
        ADVANCE: "revealedBox",
      },
    },
    revealedBox: {
      on: {
        ADVANCE: "claimed",
      },
    },
    claimed: {},
  },
});

export default function Finale() {
  const [state, send] = useMachine(finaleMachine);

  switch(state.value) {
    case 'start':
      return (
        <Para>Die Box gehört fast dir!</Para>
      )

    case 'showBox':
      return (
        <>
          <Para>Schnapp sie dir!</Para>
          <button onClick={() => send('ADVANCE')}><QuestionMarkBox /></button>
        </>
      )

    case 'revealedBox':
      return (
        <>
          <Para>Ein letzter Code: <code>fabians40.eth</code></Para>
          <div className="w-72 h-72">
            <ClaimableAsset
              state="claimable"
              asset={asset}
              onClaimed={() => send('ADVANCE')}
            />
          </div>
        </>
      )

    case 'claimed':
      return (
        <>
          <Para>Endlich deins!</Para>
          <Para>Finde heraus, was sich in der Box versteckt:</Para>
          <div className="w-72 h-72">
            <a href={`https://testnets.opensea.io/assets/${asset.tokenAddress}/${asset.tokenId}`}>
              <ClaimableAsset
                state="claimed"
                asset={asset}
              />
            </a>
          </div>
        </>
      )

    default:
      return null;
  }
}
