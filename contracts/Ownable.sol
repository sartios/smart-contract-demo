//SPDX-License-Identifier: MIT

pragma solidity 0.8.28;

contract Owner {
    address owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }
}