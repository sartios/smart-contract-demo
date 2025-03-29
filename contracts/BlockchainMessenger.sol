//SPDX-License-Identifier: MIT

pragma solidity 0.8.28;

/**
 * Store a message on the blockchain
 * Permissions:
 *      owner:  Can set the message
 * 
 *      anyone: Can read the message
 */
contract BlockchainMessenger {
    address public owner;
    string public message;
    uint public changeCounter;

    constructor() {
        owner = msg.sender;
    }

    function updateMessage(string memory _newMessage) public {
        require(msg.sender == owner, "Ownable: caller is not the owner");
        
        message = _newMessage;
        changeCounter++;
    }
}
