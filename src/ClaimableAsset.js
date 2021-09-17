import React from "react";
// import OpenSeaAsset, { rinkeby } from "./OpenSeaAsset";

export default function ClaimableAsset({ state, asset, onClaimed }) {
  switch (state) {
    case "locked":
      return <div>an image of a lock</div>;
    case "claimable":
      return <button onClick={onClaimed}>a nft card with blurring</button>;
    case "claimed":
      return <div>a nft card</div>;
    default:
      return null;
  }
}

//  <OpenSeaAsset
// tokenAddress="0x88b48f654c30e99bc2e4a1559b4dcf1ad93fa656"
// tokenId="102743975208247464892357897570123995437330798510544416212605668025911373463553"
// network={rinkeby}
// />
