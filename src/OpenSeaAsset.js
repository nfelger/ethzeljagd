import React, { useEffect, useState } from 'react'
import { OpenSeaPort, Network } from 'opensea-js';

const provider = window.ethereum;
export const rinkeby = new OpenSeaPort(provider, {
  networkName: Network.Rinkeby
})
export const mainnet = new OpenSeaPort(provider, {
  networkName: Network.Main
})


export default function OpenSeaAsset({ tokenAddress, tokenId, network}) {
  const [asset, setAsset] = useState({});

  useEffect(() => {
    async function getAsset() {
      const asset = await network.api.getAsset({
        tokenAddress: tokenAddress,
        tokenId: tokenId,
      })
      setAsset(asset)
    }
    getAsset()
  }, [tokenAddress, tokenId, network]);

  return (
    <div>
      <p>{asset.name}</p>
      <img src={asset.imagePreviewUrl} alt={`OpenSea asset "${asset.name}"`} />
      <p>{asset.description}</p>
      {/* TODO: traits? */}
    </div>
  )
}
