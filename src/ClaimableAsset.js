import React, { useState } from "react";
import OpenSeaAsset from "./OpenSeaAsset";
import claimAsset from "./claimAssetContract";
import lock from "./assets/lock.png";
import lockOpen from "./assets/lock-open.png";

export default function ClaimableAsset({ state, asset, onClaimed }) {
  const [showCodePrompt, setShowCodePrompt] = useState(false);
  const [claimInProgress, setClaimInProgress] = useState(false);

  const handleClick = () => setShowCodePrompt(true);

  const handleCode = async (e) => {
    e.preventDefault();
    setShowCodePrompt(false);
    const secretCode = e.target.code.value;
    setClaimInProgress(true);
    try {
      const receipt = await claimAsset(asset.tokenId, secretCode);
      console.log(receipt);
      setClaimInProgress(false);
      onClaimed();
    } catch (e) {
      alert(`Fehler: ${JSON.stringify(e)}`);
      setClaimInProgress(false);
    }
  };

  switch (state) {
    case "locked":
      return (
        <div className="rounded-lg border-black border-2 bg-gray-100 p-4 text-black h-full flex flex-col justify-center">
          <img height="164" src={lock} alt="lock" />
        </div>
      );
    case "claimable":
      if (showCodePrompt || claimInProgress) {
        return (
          <div className="relative h-full">
            <OpenSeaAsset
              tokenAddress={asset.tokenAddress}
              tokenId={asset.tokenId}
              onClaimed={onClaimed}
              claimInProgress={claimInProgress}
            />
            {showCodePrompt &&
              <div className="absolute inset-y-1/4 mx-4 p-2 text-black text-base bg-gray-300 border-gray-500 border-2 rounded" style={{height: "fit-content"}}>
                <form onSubmit={handleCode}>
                  <label htmlFor="code" className="my-1">
                    Code?
                    <input type="text" name="code" className="w-full text-xl my-1"/>
                  </label>
                  <button type="submit" className="border-gray-500 border-2 my-1 p-1 rounded">Los</button>
                </form>
              </div>
            }
          </div>
        );
      } else {
        return (
          <button onClick={handleClick} className="h-full">
            <div className="rounded-lg border-black border-2 bg-gray-100 p-4 text-black h-full flex flex-col justify-center">
              <img height="164" src={lockOpen} alt="open lock" />
            </div>
          </button>
        );
      }
    case "claimed":
      return (
        <OpenSeaAsset
          tokenAddress={asset.tokenAddress}
          tokenId={asset.tokenId}
          claimed
        />
      );
    default:
      return null;
  }
}
