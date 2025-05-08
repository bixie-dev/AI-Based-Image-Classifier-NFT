
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ImageClassifierStorage {
    struct Classification {
        string label;
        string imageHash;
        address uploader;
        uint256 timestamp;
    }

    mapping(uint256 => Classification) public classifications;
    uint256 public nextId;

    event ImageClassified(
        uint256 indexed id,
        address indexed uploader,
        string label,
        string imageHash,
        uint256 timestamp
    );

    function storeClassification(string memory label, string memory imageHash) public {
        classifications[nextId] = Classification({
            label: label,
            imageHash: imageHash,
            uploader: msg.sender,
            timestamp: block.timestamp
        });

        emit ImageClassified(nextId, msg.sender, label, imageHash, block.timestamp);
        nextId++;
    }

    function getClassification(uint256 id) public view returns (string memory, string memory, address, uint256) {
        Classification memory c = classifications[id];
        return (c.label, c.imageHash, c.uploader, c.timestamp);
    }
}
