import React from "react";
import { Fade } from "react-awesome-reveal";

export default function Para({ children, extraClassNames, delay }) {
  const para = (
    <div className={`p-6 text-center ${extraClassNames || ""}`}>{children}</div>
  );

  if (delay) {
    return <Fade delay={delay}>{para}</Fade>;
  } else {
    return para;
  }
}
