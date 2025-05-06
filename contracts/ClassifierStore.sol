
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ClassifierStore {
    struct ImageData {
        string imageHash;
        string label;
    }

    mapping(uint => ImageData) public data;
    uint public count;

    function storeClassification(string memory imageHash, string memory label) public {
        data[count] = ImageData(imageHash, label);
        count++;
    }
}
