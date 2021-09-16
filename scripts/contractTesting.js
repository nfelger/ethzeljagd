module.exports = async function main (callback) {
  try {
    await web3.eth.getAccounts();

    const ClaimAsset = artifacts.require("ClaimAsset")
    const claimAsset = await ClaimAsset.deployed()

    // local testing:
    const ERC1155Preset = artifacts.require("ERC1155Preset")
    const contract = await ERC1155Preset.deployed();
    const tokenId = 1;
    await contract.mint(claimAsset.address, 1, 1, []);
    await contract.mint(claimAsset.address, 2, 1, []);
    (await contract.balanceOf(claimAsset.address, tokenId)).toString()

    // rinkeby;
    const abi = [{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}];
    const contract = (await new web3.eth.Contract(abi, "0x88b48f654c30e99bc2e4a1559b4dcf1ad93fa656"));
    const tokenId = '102743975208247464892357897570123995437330798510544416212605668025911373463553';
    // contract.methods.balanceOf(claimAsset.address, tokenId).send({from: "0xE3270777E2943b435C3d0C2A6B719564Bfd65026"}).then...?

    // all:

    await claimAsset.protect(tokenId, "asdf");
    await claimAsset.claim(tokenId, "asdf", {from: "0x80eA825A030bcAbc7f7c4571f4ed1da2FB49d8bf"})

    callback(0);
  } catch (error) {
    console.error(error);
    callback(1);
  }
};
