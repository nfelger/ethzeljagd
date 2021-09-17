import React, { useState } from "react";
import OpenSeaAsset from "./OpenSeaAsset";
import claimAsset from "./claimAssetContract";

export default function ClaimableAsset({ state, asset, onClaimed }) {
  const [showCodePrompt, setShowCodePrompt] = useState(false);

  const handleClick = () => setShowCodePrompt(true);

  const handleCode = async (e) => {
    e.preventDefault();
    setShowCodePrompt(false);
    const secretCode = e.target.code.value;
    // TODO: add number-crunching animation / spinner / message
    const receipt = await claimAsset(asset.tokenId, secretCode);
    console.log(receipt);
    // TODO: show success animation?
    onClaimed();
    // TODO: show error message in case of error
  };

  switch (state) {
    case "locked":
      return <div className="rounded">an image of a lock</div>;
    case "claimable":
      return (
        <>
          <button onClick={handleClick}>
            blur me
            <OpenSeaAsset
              tokenAddress={asset.tokenAddress}
              tokenId={asset.tokenId}
              onClaimed={onClaimed}
            />
          </button>

          {showCodePrompt && (
            <form onSubmit={handleCode}>
              <input type="text" name="code" />
              <button type="submit">Los</button>
            </form>
          )}
        </>
      );
    case "claimed":
      return (
        <OpenSeaAsset
          tokenAddress={asset.tokenAddress}
          tokenId={asset.tokenId}
          onClaimed={onClaimed}
        />
      );
    default:
      return null;
  }
}
