import React, { useState } from 'react';
import './App.css';

window.fabiansEth = "0xE3270777E2943b435C3d0C2A6B719564Bfd65026";

async function connectMetaMask(setAddress) {
  const address = (await window.ethereum.request({ method: 'eth_requestAccounts' }))[0];
  setAddress(address);
}

function App() {
  const [address, setAddress] = useState(false);

  return (
    <div className="App">
      {address
       ? `Willkommen ${address}`
       : <button onClick={() => connectMetaMask(setAddress)}>Mit MetaMask verbinden</button>
      }
    </div>
  );
}

export default App;
