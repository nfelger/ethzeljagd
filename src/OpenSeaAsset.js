import React, { useEffect, useState } from "react";
import { OpenSeaPort, Network } from "opensea-js";

const provider = window.ethereum;
export const rinkeby = new OpenSeaPort(provider, {
  networkName: Network.Rinkeby,
});
export const mainnet = new OpenSeaPort(provider, {
  networkName: Network.Main,
});

export default function OpenSeaAsset({ tokenAddress, tokenId, network, secretCode }) {
  const [asset, setAsset] = useState({});
  const [showCodePrompt, setShowCodePrompt] = useState(false);

  useEffect(() => {
    async function getAsset() {
      const asset = await network.api.getAsset({
        tokenAddress: tokenAddress,
        tokenId: tokenId,
      });
      setAsset(asset);
    }
    getAsset();
  }, [tokenAddress, tokenId, network]);

  function handleClick() {
    setShowCodePrompt(true)
  }

  async function handleCode(e) {
    e.preventDefault()
    // TODO: add number-crunching animation
    const enteredCode = e.target.code.value;
    if (enteredCode === secretCode) {
      // TODO: implement contract to xfer asset
    } else {
      // TODO: show error message
    }
    setShowCodePrompt(false)
  }

  return (
    <>
      <button href="#" onClick={handleClick}>
        <h1>{asset.name}</h1>
        <img
          src={asset.imagePreviewUrl}
          alt={`OpenSea asset "${asset.name}"`}
        />
        <p>{asset.description}</p>
        {/* TODO: traits? */}
        {/* TODO: Owner: randomId | "fabians.eth" */}
      </button>
      {showCodePrompt && (
        <form onSubmit={handleCode}>
          <input type="text" name="code" />
          <button type="submit">Los</button>
        </form>
      )}
    </>
  );
}
