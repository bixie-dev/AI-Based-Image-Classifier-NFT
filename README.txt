
# AI-Based Image Classifier NFT

## Project Structure
- `frontend/index.html`: Basic HTML/JS UI to upload an image and display result.
- `backend/server.js`: Node.js server to call Hugging Face API and interact with Ethereum.
- `contracts/ClassifierStore.sol`: Solidity smart contract to store image hashes and labels.

## Setup Instructions
1. Deploy `ClassifierStore.sol` using Hardhat or Remix.
2. Replace contract address, private key, Hugging Face token in `server.js`.
3. Run server: `node server.js`
4. Open `index.html` in browser and test.
