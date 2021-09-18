import React from "react";
import { createMachine, assign } from "xstate";
import { useMachine } from "@xstate/react";
import ClaimableAsset from "./ClaimableAsset";
import Para from "./Para";

const assets = [
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
  {
    tokenAddress: "0x88b48f654c30e99bc2e4a1559b4dcf1ad93fa656",
    tokenId:
      "58310386485557310259002237365246659266895050305048410171636348441311494275073",
  },
];

const gameMachine = createMachine({
  id: "game",
  initial: "start",
  context: {
    message:
      "Nicht so schnell! Um die Box zu öffnen, musst du erst vier Tokens sammeln…",
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
        message: "Finde die Person, die den ersten Code kennt. Hint: 30 Mark",
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
      entry: assign({
        message:
          "Den nächsten Code hat der Besitzer eines zweihändigen Elfen-Kampfhammers.",
      }),
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
      entry: assign({ message: "Raidriiiiiiiiiiiiiiii!" }),
    },
    claimOne: {
      on: {
        CLAIMED: {
          target: "nearlyDone",
          actions: assign({
            assetStates: (context) => {
              const prevStates = context.assetStates;
              return { ...prevStates, 4: "claimed" };
            },
          }),
        },
      },
      entry: assign({
        message: "Noch eine letzte MASSIVE Herausforderung…",
      }),
    },
    nearlyDone: {
      after: {
        500: "done",
      },
      entry: assign({
        message: "Jetzt hast du alles, was du brauchst!",
      }),
    },
    done: {},
  },
});

export default function ClaimFour({ onComplete }) {
  const [state, send] = useMachine(gameMachine);

  const handleClaimed = () => send("CLAIMED");

  return (
    <div>
      <Para>{state.context.message}</Para>
      <ul className="flex flex-row gap-4 items-stretch">
        {assets.map((asset, index) => (
          <li key={asset.tokenId} className="flex-1">
            <ClaimableAsset
              state={state.context.assetStates[index + 1]}
              asset={asset}
              onClaimed={handleClaimed}
            />
          </li>
        ))}
      </ul>
      {state.value === "done" && (
        <button
          class="block mx-auto mt-6 bg-gray-500 hover:bg-gray-400 hover:text-black px-9 py-3 text-center rounded-full"
          onClick={onComplete}
        >
          Weiter
        </button>
      )}
    </div>
  );
}
