import React from "react";
import OpenSeaAsset, { rinkeby } from "./OpenSeaAsset";

export default function ClaimFour({ onComplete }) {
  // TODO: rate limiting? stagger loading? don't load locked assets?
  return (
    <div>
      <p>
        Nicht so schnell! Um die Box zu öffnen, musst du diese vier Dinge besitzen:
      </p>
      <ul>
        <li>
          <OpenSeaAsset
            tokenAddress="0x88b48f654c30e99bc2e4a1559b4dcf1ad93fa656"
            tokenId="102743975208247464892357897570123995437330798510544416212605668025911373463553"
            network={rinkeby}
          />
        </li>
        <li>
          <OpenSeaAsset
            tokenAddress="0x88b48f654c30e99bc2e4a1559b4dcf1ad93fa656"
            tokenId="102743975208247464892357897570123995437330798510544416212605668025911373463553"
            network={rinkeby}
          />
        </li>
        <li>
          <OpenSeaAsset
            tokenAddress="0x88b48f654c30e99bc2e4a1559b4dcf1ad93fa656"
            tokenId="102743975208247464892357897570123995437330798510544416212605668025911373463553"
            network={rinkeby}
          />
        </li>
        <li>
          <OpenSeaAsset
            tokenAddress="0x88b48f654c30e99bc2e4a1559b4dcf1ad93fa656"
            tokenId="102743975208247464892357897570123995437330798510544416212605668025911373463553"
            network={rinkeby}
          />
        </li>
      </ul>
    </div>
  );
}
