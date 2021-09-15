import React, { useState } from 'react';
import './App.css';
import MetaMaskConnector from './MetaMaskConnector';

// TODO: change to real addr
const fabiansEth = "0xE3270777E2943b435C3d0C2A6B719564Bfd65026".toLowerCase();


function App() {
  const [address, setAddress] = useState("");

  const isFabian = address === fabiansEth;

  return (
    <div className="App">
      {address
       ? (isFabian
          ? `Willkommen, fabians.eth`
          : `Nicht Fabian. Hau ab.`)
       : <MetaMaskConnector onGetAddress={setAddress} />
      }
    </div>
  );
}

export default App;
