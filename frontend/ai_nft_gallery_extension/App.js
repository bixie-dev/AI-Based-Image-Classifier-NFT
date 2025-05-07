
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import './App.css';

const contractAddress = "YOUR_CONTRACT_ADDRESS_HERE";
const abi = require("./AINFTABI.json");

function App() {
    const [nfts, setNfts] = useState([]);

    useEffect(() => {
        async function fetchNFTs() {
            const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
            const contract = new ethers.Contract(contractAddress, abi, provider);
            const total = await contract.nextTokenId();
            const items = [];

            for (let i = 0; i < total; i++) {
                const uri = await contract.tokenURI(i);
                const owner = await contract.ownerOf(i);
                const metadata = await fetch(uri).then(res => res.json());
                items.push({ tokenId: i, owner, ...metadata });
            }

            setNfts(items);
        }

        fetchNFTs();
    }, []);

    return (
        <div className="gallery">
            {nfts.map(nft => (
                <div key={nft.tokenId} className="nft-card">
                    <img src={nft.image} alt={nft.name} />
                    <h3>{nft.name}</h3>
                    <p>{nft.description}</p>
                    <small>Owner: {nft.owner}</small>
                </div>
            ))}
        </div>
    );
}

export default App;
