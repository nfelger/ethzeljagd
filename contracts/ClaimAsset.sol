pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import '@openzeppelin/contracts/token/ERC1155/IERC1155.sol';
import '@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol';
import '@openzeppelin/contracts/token/ERC1155/presets/ERC1155PresetMinterPauser.sol';

// contract ERC1155Preset is ERC1155PresetMinterPauser {
//     constructor() ERC1155PresetMinterPauser("https://token-cdn-domain/{id}.json") {}
// }

contract ClaimAsset is ERC1155Holder, Ownable {
    IERC1155 private assetContract;
    address private allowedRecipient;
    mapping(uint256 => string) private secrets;

    constructor(IERC1155 _assetContract, address _allowedRecipient) {
        assetContract = _assetContract;
        allowedRecipient = _allowedRecipient;
    }

    function setContract(IERC1155 _assetContract) public onlyOwner {
        assetContract = _assetContract;
    }

    function setRecipient(address _allowedRecipient) public onlyOwner {
        allowedRecipient = _allowedRecipient;
    }

    function protect(uint256 itemId, string memory secret) public onlyOwner {
        secrets[itemId] = secret;
    }

    function claim(uint256 itemId, string memory secret) external {
        uint256 _amount = 1;
        uint256 _balance = assetContract.balanceOf(address(this), itemId);
        require(_amount <= _balance, "Must have balance!");
        require(msg.sender == allowedRecipient, "Must go to designated recipient!");
        require(keccak256(bytes(secrets[itemId])) != keccak256(""), "Unprotected item cannot be claimed!");
        require(keccak256(bytes(secret)) == keccak256(bytes(secrets[itemId])), "Must know secret!");
        assetContract.safeTransferFrom(address(this), msg.sender, itemId, _amount, "");
    }
}
