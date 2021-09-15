import React, { useState } from 'react';
import './App.css';
import MetaMaskConnector from './MetaMaskConnector';

window.fabiansEth = "0xE3270777E2943b435C3d0C2A6B719564Bfd65026";


function App() {
  const [address, setAddress] = useState(false);

  return (
    <div className="App">
      {address
       ? `Willkommen ${address}`
       : <MetaMaskConnector onGetAddress={setAddress} />
      }
    </div>
  );
}

export default App;
