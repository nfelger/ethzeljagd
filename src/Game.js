import React from 'react'
import { Fade } from "react-awesome-reveal";

export default function Game() {
  const delays = [500, 1500]
  return (
    <>
      <Fade delay={delays[0]}>
        <p>Hallo, fabians40.eth (get it?)</p>
      </Fade>
      <Fade delay={delays[0] + delays[1]}>
        <p>asset goes here</p>
      </Fade>
    </>
  )
}
