import React, { useEffect, useState } from "react";
import { OpenSeaPort, Network } from "opensea-js";

const provider = window.ethereum;
export const seaport = new OpenSeaPort(provider, {
  networkName: Network.Rinkeby,
});

export default function OpenSeaAsset({ tokenAddress, tokenId }) {
  const [nft, setNft] = useState({});

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

  return (
    <>
      <section>
        <h1>{nft.name}</h1>
        <img src={nft.imageUrl} alt={`OpenSea asset "${nft.name}"`} />
        <p>{nft.description}</p>
        {/* TODO: traits? */}
        {/* TODO: Owner: randomId | "fabians.eth" */}
      </section>
    </>
  );
}
