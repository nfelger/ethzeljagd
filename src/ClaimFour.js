import React from "react";
import { createMachine, assign } from "xstate";
import { useMachine } from "@xstate/react";
import ClaimableAsset from "./ClaimableAsset";

// TODO asset ids
const assets = [
  {
    tokenAddress: "0x88b48f654c30e99bc2e4a1559b4dcf1ad93fa656",
    tokenId:
      "102743975208247464892357897570123995437330798510544416212605668025911373463553",
    hint: "30 Mark",
  },
  {
    tokenAddress: "0x88b48f654c30e99bc2e4a1559b4dcf1ad93fa656",
    tokenId:
      "102743975208247464892357897570123995437330798510544416212605668025911373463553",
    hint: "zweihändiger Elfen-Kampfhammer",
  },
  {
    tokenAddress: "0x88b48f654c30e99bc2e4a1559b4dcf1ad93fa656",
    tokenId:
      "102743975208247464892357897570123995437330798510544416212605668025911373463553",
    hint: "Raidri",
  },
  {
    tokenAddress: "0x88b48f654c30e99bc2e4a1559b4dcf1ad93fa656",
    tokenId:
      "102743975208247464892357897570123995437330798510544416212605668025911373463553",
    hint: "MASSIVE",
  },
];

const gameMachine = createMachine({
  id: "game",
  initial: "claimFour",
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
      entry: assign({ message: "noch 3" }),
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
      entry: assign({ message: "noch 2" }),
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
      entry: assign({ message: "noch 1" }),
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
      <p onClick={() => send("CLAIMED")}>{state.context.message}</p>
      <ul className="flex flex-row gap-4">
        {assets.map((asset, index) => (
          // TODO: set tokenid as key (once they're different)
          <li>
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
