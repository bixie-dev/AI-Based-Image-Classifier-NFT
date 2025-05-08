
const fs = require('fs');
const crypto = require('crypto');
const { ethers } = require('ethers');

// Hash an image file
function hashImage(filePath) {
    const fileBuffer = fs.readFileSync(filePath);
    const hash = crypto.createHash('sha256');
    hash.update(fileBuffer);
    return hash.digest('hex');
}

// Example usage
(async () => {
    const imagePath = 'path/to/image.jpg';
    const label = 'Cat';

    const imageHash = hashImage(imagePath);
    console.log('Image hash:', imageHash);

    // Connect to provider and contract
    const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');
    const signer = provider.getSigner();

    const contractAddress = 'YOUR_CONTRACT_ADDRESS_HERE';
    const abi = require('./ImageClassifierStorageABI.json');
    const contract = new ethers.Contract(contractAddress, abi, signer);

    const tx = await contract.storeClassification(label, imageHash);
    console.log('Transaction hash:', tx.hash);
})();
