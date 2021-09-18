import React from "react";
import { createMachine, assign } from "xstate";
import { useMachine } from "@xstate/react";
import ClaimableAsset from "./ClaimableAsset";

// TODO asset ids
const assets = [
  {
    tokenAddress: "0x88b48f654c30e99bc2e4a1559b4dcf1ad93fa656",
    tokenId:
      "58310386485557310259002237365246659266895050305048410171636348441311494275073",
  },
  {
    tokenAddress: "0x88b48f654c30e99bc2e4a1559b4dcf1ad93fa656",
    tokenId:
      "58310386485557310259002237365246659266895050305048410171636348436913447763969",
  },
  {
    tokenAddress: "0x88b48f654c30e99bc2e4a1559b4dcf1ad93fa656",
    tokenId:
      "58310386485557310259002237365246659266895050305048410171636348438012959391745",
  },
  {
    tokenAddress: "0x88b48f654c30e99bc2e4a1559b4dcf1ad93fa656",
    tokenId:
      "58310386485557310259002237365246659266895050305048410171636348439112471019521",
  },
];

const gameMachine = createMachine({
  id: "game",
  initial: "start",
  context: {
    message:
      "Nicht so schnell! Um die Box zu öffnen, musst du diese vier Dinge besitzen…",
    assetStates: {
      1: "claimable",
      2: "locked",
      3: "locked",
      4: "locked",
    },
  },
  states: {
    start: {
      after: {
        5000: "claimFour",
      },
    },
    claimFour: {
      on: {
        CLAIMED: {
          target: "claimThree",
          actions: assign({
            assetStates: (context) => {
              const prevStates = context.assetStates;
              return { ...prevStates, 1: "claimed", 2: "claimable" };
            },
          }),
        },
      },
      entry: assign({
        message: "Finde die Person, die den Code kennt. Hint: 30 Mark",
      }),
    },
    claimThree: {
      on: {
        CLAIMED: {
          target: "claimTwo",
          actions: assign({
            assetStates: (context) => {
              const prevStates = context.assetStates;
              return { ...prevStates, 2: "claimed", 3: "claimable" };
            },
          }),
        },
      },
      entry: assign({ message: "noch 3 - zweihändiger Elfen-Kampfhammer" }),
    },
    claimTwo: {
      on: {
        CLAIMED: {
          target: "claimOne",
          actions: assign({
            assetStates: (context) => {
              const prevStates = context.assetStates;
              return { ...prevStates, 3: "claimed", 4: "claimable" };
            },
          }),
        },
      },
      entry: assign({ message: "noch 2 - Raidri" }),
    },
    claimOne: {
      on: {
        CLAIMED: {
          target: "done",
          actions: assign({
            assetStates: (context) => {
              const prevStates = context.assetStates;
              return { ...prevStates, 4: "claimed" };
            },
          }),
        },
      },
      entry: assign({
        message: "noch 1 - Eine letzte MASSIVE Herausforderung.",
      }),
    },
    done: {
      entry: "complete",
    },
  },
});

export default function ClaimFour({ onComplete }) {
  const [state, send] = useMachine(gameMachine, {
    actions: {
      complete: onComplete,
    },
  });

  const handleClaimed = () => send("CLAIMED");

  return (
    <div>
      <button onClick={handleClaimed}>SKIP</button>
      <p>{state.context.message}</p>
      <ul className="flex flex-row gap-4">
        {assets.map((asset, index) => (
          <li key={asset.tokenId}>
            <ClaimableAsset
              state={state.context.assetStates[index + 1]}
              asset={asset}
              onClaimed={handleClaimed}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
