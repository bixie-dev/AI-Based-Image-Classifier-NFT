
const { ethers } = require("hardhat");

async function main() {
    const [admin, user1] = await ethers.getSigners();

    const NFT = await ethers.getContractFactory("AINFTWithRoles");
    const nft = await NFT.deploy();
    await nft.deployed();
    console.log("AINFTWithRoles deployed to:", nft.address);

    // Grant MINTER_ROLE to user1
    const MINTER_ROLE = await nft.MINTER_ROLE();
    await nft.grantMinterRole(user1.address);
    console.log("Granted MINTER_ROLE to:", user1.address);

    // user1 mints an NFT
    const nftUser1 = nft.connect(user1);
    const tx = await nftUser1.mint(user1.address, "https://example.com/metadata/2.json");
    await tx.wait();
    console.log("User1 minted an NFT");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
