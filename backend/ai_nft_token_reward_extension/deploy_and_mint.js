
const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    const RewardToken = await ethers.getContractFactory("RewardToken");
    const rewardToken = await RewardToken.deploy();
    await rewardToken.deployed();
    console.log("RewardToken deployed to:", rewardToken.address);

    const AINFT = await ethers.getContractFactory("AINFTWithReward");
    const nft = await AINFT.deploy(rewardToken.address);
    await nft.deployed();
    console.log("AINFTWithReward deployed to:", nft.address);

    // Mint NFT and reward token
    const tx = await nft.mintNFT(deployer.address, "https://example.com/metadata/1.json");
    await tx.wait();
    console.log("NFT minted and reward given");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
