
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./RewardToken.sol";

contract AINFTWithReward is ERC721URIStorage, Ownable {
    uint256 public nextTokenId;
    RewardToken public rewardToken;
    uint256 public rewardAmount = 100 * 10 ** 18;

    event Minted(address indexed to, uint256 indexed tokenId, string tokenURI);
    event Rewarded(address indexed to, uint256 amount);

    constructor(address rewardTokenAddress) ERC721("AINFT", "AIN") {
        rewardToken = RewardToken(rewardTokenAddress);
    }

    function mintNFT(address recipient, string memory tokenURI) public onlyOwner returns (uint256) {
        uint256 tokenId = nextTokenId;
        _mint(recipient, tokenId);
        _setTokenURI(tokenId, tokenURI);
        nextTokenId++;

        rewardToken.mint(recipient, rewardAmount);

        emit Minted(recipient, tokenId, tokenURI);
        emit Rewarded(recipient, rewardAmount);

        return tokenId;
    }
}
