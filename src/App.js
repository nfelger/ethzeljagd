import React from "react";
import "./App.css";
import Game from "./Game";

// TODO: change to real addr: 0x5Ed82a25DfeEaE0c35297B605fC9c63A14caE0fd
export const fabiansEth =
  "0x80eA825A030bcAbc7f7c4571f4ed1da2FB49d8bf".toLowerCase();

function App() {
  return (
    <div className="flex flex-col items-center mt-6 mx-2 text-white text-3xl">
      <Game fabiansEth={fabiansEth} />
    </div>
  )
}

export default App;
