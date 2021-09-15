import React from "react";

async function connectMetaMask(onGetAddress) {
  const address = (
    await window.ethereum.request({ method: "eth_requestAccounts" })
  )[0];
  onGetAddress(address);
}

export default function MetaMaskConnector({ onGetAddress }) {
  return (
    <button onClick={() => connectMetaMask(onGetAddress)}>
      Mit MetaMask verbinden
    </button>
  );
}
