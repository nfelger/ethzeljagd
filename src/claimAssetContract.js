import Web3 from "web3";
import { fabiansEth } from "./App";

const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
web3.eth.defaultChain = "rinkeby";

// prettier-ignore
const claimAssetABI = [{"inputs":[{"internalType":"uint256","name":"itemId","type":"uint256"},{"internalType":"string","name":"secret","type":"string"}],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"}];
const claimAssetAddress = "0x31D3032911888f34506a733Cbe1F2107bDa9A7C4";
const claimAssetContract = new web3.eth.Contract(
  claimAssetABI,
  claimAssetAddress
);

async function claimAsset(tokenId, secretCode) {
  return new Promise((resolve, reject) => {
    claimAssetContract.methods
      .claim(tokenId, secretCode)
      .send({ from: fabiansEth })
      .on("receipt", function (receipt) {
        resolve(receipt);
      })
      .on("error", (err) => {
        reject(err);
      });
  });
}

export default claimAsset;
