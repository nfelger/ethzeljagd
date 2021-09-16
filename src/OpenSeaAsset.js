import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { OpenSeaPort, Network } from "opensea-js";
import { fabiansEth } from "./App";

const provider = window.ethereum;
export const rinkeby = new OpenSeaPort(provider, {
  networkName: Network.Rinkeby,
});
const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
web3.eth.defaultChain = "rinkeby";

// prettier-ignore
const claimAssetABI = [{"inputs":[{"internalType":"uint256","name":"itemId","type":"uint256"},{"internalType":"string","name":"secret","type":"string"}],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"}];
const claimAssetAddress = "0x31D3032911888f34506a733Cbe1F2107bDa9A7C4";
const claimAssetContract = new web3.eth.Contract(
  claimAssetABI,
  claimAssetAddress
);

export default function OpenSeaAsset({ tokenAddress, tokenId, network }) {
  const [asset, setAsset] = useState({});
  const [showCodePrompt, setShowCodePrompt] = useState(false);

  useEffect(() => {
    async function getAsset() {
      const asset = await network.api.getAsset({
        tokenAddress: tokenAddress,
        tokenId: tokenId,
      });
      console.log(asset);
      setAsset(asset);
    }
    getAsset();
  }, [tokenAddress, tokenId, network]);

  function handleClick() {
    setShowCodePrompt(true);
  }

  async function handleCode(e) {
    e.preventDefault();
    const secretCode = e.target.code.value;
    // TODO: add number-crunching animation / spinner / message
    claimAssetContract.methods
      .claim(tokenId, secretCode)
      .send({ from: fabiansEth })
      .on("receipt", function (receipt) {
        // TODO: show success animation?
        console.log(receipt);
      })
      .on("error", console.error); // TODO: show error message

    setShowCodePrompt(false);
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
