import React, { useEffect, useState } from "react";
import { OpenSeaPort, Network } from "opensea-js";
import ethereum from "./assets/ethereum.png";

const provider = window.ethereum;
export const seaport = new OpenSeaPort(provider, {
  networkName: Network.Rinkeby,
});

export default function OpenSeaAsset({
  tokenAddress,
  tokenId,
  claimInProgress = false,
  claimed = false,
}) {
  const [nft, setNft] = useState(null);

  useEffect(() => {
    async function getAsset() {
      const asset = await seaport.api.getAsset({
        tokenAddress: tokenAddress,
        tokenId: tokenId,
      });
      console.log(asset);
      setNft(asset);
    }
    getAsset();
  }, [tokenAddress, tokenId]);

  const loader = (
    <div className="absolute top-0 left-0 flex flex-col justify-center items-center animate-pulse h-full w-full">
      <img
        src={ethereum}
        height="50"
        alt="ethereum logo"
        className="h-1/2 rounded-full bg-gray-100 p-4"
      />
    </div>
  );
  return (
    <>
      <section className="relative rounded-lg border-black border-2 bg-gray-100 p-4 text-black h-full">
        {nft ? (
          <>
            <div
              className={`flex flex-col items-center justify-between h-full ${
                claimed ? "" : "filter blur-sm"
              }`}
            >
              <h1>{nft.name}</h1>
              <img
                src={nft.imageUrl}
                height="164"
                alt={`OpenSea asset "${nft.name}"`}
              />
            </div>
            {claimInProgress && loader}
          </>
        ) : (
          loader
        )}
      </section>
    </>
  );
}
