// const Contract = artifacts.require('ERC1155Preset');
const ClaimAsset = artifacts.require('ClaimAsset');

const openSeaContractAddress = "0x88b48f654c30e99bc2e4a1559b4dcf1ad93fa656";
// TODO change
const fabiansEth = "0xE3270777E2943b435C3d0C2A6B719564Bfd65026".toLowerCase();

module.exports = async function (deployer) {
  // Local testing only:
  // await deployer.deploy(Contract);
  // const contract = await Contract.deployed();
  // await deployer.deploy(ClaimAsset, contract.address, "0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1");

  // Rinkeby:
  await deployer.deploy(ClaimAsset, openSeaContractAddress, fabiansEth);
};
