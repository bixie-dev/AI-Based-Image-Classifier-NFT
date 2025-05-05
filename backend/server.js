
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const axios = require('axios');
const { ethers } = require('ethers');
const cors = require('cors');
const upload = multer({ dest: 'uploads/' });

const app = express();
app.use(cors());

const contractJson = require('../artifacts/ClassifierStore.json');
const CONTRACT_ADDRESS = '0xYourContractAddress';
const PROVIDER_URL = 'https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID';
const PRIVATE_KEY = '0xYourPrivateKey';

const provider = new ethers.providers.JsonRpcProvider(PROVIDER_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, contractJson.abi, wallet);

app.post('/classify', upload.single('image'), async (req, res) => {
  const image = fs.readFileSync(req.file.path);
  const response = await axios.post(
    'https://api-inference.huggingface.co/models/google/vit-base-patch16-224',
    image,
    {
      headers: {
        Authorization: 'Bearer YOUR_HUGGINGFACE_TOKEN',
        'Content-Type': 'application/octet-stream',
      },
    }
  );
  const label = response.data[0].label;
  const tx = await contract.storeClassification(req.file.filename, label);
  await tx.wait();
  res.json({ label, tx: tx.hash });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
