module.exports = async function main (callback) {
  try {
    await web3.eth.getAccounts();

    const ERC1155Preset = artifacts.require("ERC1155Preset")
    const contract = await ERC1155Preset.deployed();
    const ClaimAsset = artifacts.require("ClaimAsset")
    const claimAsset = await ClaimAsset.deployed()

    await contract.mint(claimAsset.address, 1, 1, []);
    await contract.mint(claimAsset.address, 2, 1, []);
    await claimAsset.protect(1, "asdf");

    (await contract.balanceOf(claimAsset.address, 1)).toString()

    claimAsset.claim(1, "asdf")

    callback(0);
  } catch (error) {
    console.error(error);
    callback(1);
  }
};
