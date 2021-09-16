import React, { useState } from "react";
import "./App.css";
import Game from "./Game";
import MetaMaskConnector from "./MetaMaskConnector";

// TODO: change to real addr
export const fabiansEth = "0x80eA825A030bcAbc7f7c4571f4ed1da2FB49d8bf".toLowerCase();

function App() {
  const [address, setAddress] = useState("");

  const isFabian = address === fabiansEth;

  return (
    <div className="App">
      {address ? (
        isFabian ? (
          <Game />
        ) : (
          `Nicht Fabian. Hau ab.`
        )
      ) : (
        <MetaMaskConnector onGetAddress={setAddress} />
      )}
    </div>
  );
}

export default App;
