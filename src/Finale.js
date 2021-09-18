import React from "react";
import { createMachine } from "xstate";
import { useMachine } from "@xstate/react";
import ClaimableAsset from "./ClaimableAsset";

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
        <p>Du hast es geschafft, alle vier Dinge zu sammeln? Du musst der Auserwählte sein!</p>
      )

    case 'showBox':
      return (
        <>
          <p>Klicke die Box, um ihren Inhalt anzuzeigen.</p>
          <button onClick={() => send('ADVANCE')}>?</button>
        </>
      )

    case 'revealedBox':
      return (
        <>
          <p>Sie gehört beinahe dir. Der Code ist <code>fabians40.eth</code></p>
          <ClaimableAsset
            state="claimable"
            asset={asset}
            onClaimed={() => send('ADVANCE')}
          />
        </>
      )

    case 'claimed':
      return (
        <>
          <p>Endlich deins!</p>
          <p>Finde heraus, was sich dahinter versteckt: <a href={`https://testnets.opensea.io/assets/${asset.tokenAddress}/${asset.tokenId}`}>HIER</a></p>
          <ClaimableAsset
            state="claimed"
            asset={asset}
          />
        </>
      )

    default:
      return null;
  }
}
