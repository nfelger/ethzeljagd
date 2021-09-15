import React from "react";
import OpenSeaAsset, { rinkeby } from "./OpenSeaAsset";
import { Fade } from "react-awesome-reveal";

export default function Game() {
  const delays = [500, 1500];
  return (
    <>
      <Fade delay={delays[0]}>
        <p>Hallo, fabians40.eth (get it?)</p>
      </Fade>
      <Fade delay={delays[0] + delays[1]}>
        <OpenSeaAsset
          tokenAddress="0x88b48f654c30e99bc2e4a1559b4dcf1ad93fa656"
          tokenId="102743975208247464892357897570123995437330798510544416212605668025911373463553"
          network={rinkeby}
          secretCode="a" // TODO: replace with real code
        />
      </Fade>
    </>
  );
}
