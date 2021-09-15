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
          tokenAddress="0x16baf0de678e52367adc69fd067e5edd1d33e3bf"
          tokenId="6542"
          network={rinkeby}
        />
      </Fade>
    </>
  );
}
